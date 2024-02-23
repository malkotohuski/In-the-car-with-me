const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');
const nodemailer = require('nodemailer');
const axios = require('axios');

// Enable CORS, bodyParser and other middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(cors());

// Function to generate a random confirmation code
function generateConfirmationCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Handle user registration
server.post('/register', (req, res) => {
    const { username, useremail, userpassword, fName, lName, userImage, routes } = req.body;

    console.log('Registration Request:', { username, useremail, userpassword, fName, lName, userImage, routes });

    // Validation (you can add more checks as needed)
    if (!username || !useremail || !userpassword) {
        return res.status(400).json({ error: 'Invalid input. Please provide all required fields.' });
    }

    // Check if a user with the same email or name already exists
    const existingUserByEmail = router.db.get('users').find({ email: useremail }).value();
    const existingUserByName = router.db.get('users').find({ username }).value();

    console.log('Existing User by Email:', existingUserByEmail);
    console.log('Existing User by Name:', existingUserByName);

    if (existingUserByEmail || existingUserByName) {
        console.error('User with the same email or name already exists');
        return res.status(400).json({ error: 'User with the same email or name already exists.' });
    }

    // Simulate user creation (you may want to hash the password in a real scenario)
    const confirmationCode = generateConfirmationCode();
    const user = {
        id: Date.now(),
        username,
        email: useremail,
        password: userpassword,
        fName,
        lName,
        userImage,
        confirmationCode,
        routes: []
    };

    router.db.get('users').push(user).write();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'malkotohuski@gmail.com', // replace with your Gmail address
            pass: 'ymnayjeocfmplvwb', // replace with your Gmail password
        },
    });

    const mailOptions = {
        from: 'malkotohuski@gmail.com', // replace with your Gmail address
        to: useremail,
        subject: 'Account Confirmation',
        text: `Your confirmation code is: ${confirmationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email confirmation error:', error);
            return res.status(500).json({ error: 'Failed to send confirmation email.' });
        } else {
            console.log('Email confirmation sent:', info.response);
            return res.status(201).json({ user, confirmationCode });
        }
    });
});

server.post('/create-route', (req, res) => {
    const { route } = req.body;

    // Add the new route to the "routes" array
    const newRoute = { ...route, id: Date.now() };
    router.db.get('routes').push(newRoute).write();

    return res.status(201).json({ message: 'Route created successfully.', route: newRoute });
});



// Verification endpoint
server.post('/verify-confirmation-code', (req, res) => {
    const { email, confirmationCode } = req.body;
    console.log('Verification Request:', { email, confirmationCode });

    // Retrieve the user by email
    const user = router.db.get('users').find({ email }).value();
    console.log('User:', user);

    const providedCode = parseInt(confirmationCode);

    if (!user || !user.confirmationCode || user.confirmationCode !== providedCode) {
        console.error('Invalid confirmation code');
        return res.status(400).json({ error: 'Invalid confirmation code.' });
    }

    // Clear the confirmation code after successful verification
    router.db.get('users').find({ email }).assign({ confirmationCode: null }).write();
    console.log('Verification successful');

    return res.status(200).json({ message: 'Confirmation code verified.' });
});

// New endpoint to send a request to the "imala" server
server.post('/send-request-to-email', async (req, res) => {
    const { email, text } = req.body;

    console.log('Send Request to Email:', { email, text });

    try {
        // Retrieve the user by email
        const user = router.db.get('users').find({ email }).value();

        if (!user) {
            console.error('User not found with email:', email);
            return res.status(404).json({ error: 'User not found.' });
        }

        // Create a transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'malkotohuski@gmail.com', // replace with your Gmail address
                pass: 'ymnayjeocfmplvwb', // replace with your Gmail password
            },
        });

        // Send the email to the user's email address
        const emailOptions = {
            from: 'malkotohuski@gmail.com', // replace with your Gmail address
            to: user.email,
            subject: 'Your Subject',
            text: `Hello ${user.username},\n\n${text}`,
        };

        transporter.sendMail(emailOptions, (error, info) => {
            if (error) {
                console.error('Email sending error:', error);
                return res.status(500).json({ error: 'Failed to send email.' });
            } else {
                console.log('Email sent successfully:', info.response);
                return res.status(200).json({ message: 'Email sent successfully.' });
            }
        });

    } catch (error) {
        // Handle errors appropriately
        console.error('Email Server Error:', error);
        return res.status(500).json({ error: 'Failed to send request to Email server.' });
    }
});

// New endpoint to handle route approval
// Updated endpoint to handle route request approval or rejection
server.post('/send-request-to-user', (req, res) => {
    const { requestingUser } = req.body;

    // Check if requestingUser is defined
    if (!requestingUser) {
        console.error('Requesting user is undefined');
        return res.status(400).json({ error: 'Invalid request. Requesting user is undefined.' });
    }

    // Check if the routeId is defined in requestingUser
    if (!requestingUser.routeId) {
        console.error('Route ID is undefined in requestingUser');
        return res.status(400).json({ error: 'Invalid request. Route ID is undefined in requestingUser.' });
    }

    // Check if the route exists
    const route = router.db.get('routes').find({ id: requestingUser.routeId }).value();

    if (!route) {
        console.error('Route not found');
        return res.status(404).json({ error: 'Route not found.' });
    }

    // Add the request to the "requests" array
    const newRequest = {
        id: Date.now(),
        requestingUser,
    };

    // Push the new request to the "requests" array
    router.db.get('requests').push(newRequest).write();

    return res.status(200).json({ message: 'Route request processed successfully.' });
});

// New endpoint to get all requests
server.get('/get-requests', (req, res) => {
    const requests = router.db.get('requests').value();

    return res.status(200).json(requests);
});

// Handle user login
server.post('/login', (req, res) => {
    const { useremail, userpassword } = req.body;

    // Find the user by email and password (you might want to hash passwords in a real scenario)
    const user = router.db.get('users').find({ email: useremail, password: userpassword }).value();
    console.log('sss', user);
    if (user) {
        // Successful login
        return res.status(200).json({ user });
    } else {
        // Login failed
        return res.status(401).json({ error: 'Invalid email or password' });
    }
});

// Use default router
server.use(router);

const port = 3000;
server.listen(port, () => {
    console.log(`JSON Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});