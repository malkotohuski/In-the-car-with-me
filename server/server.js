
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');
const nodemailer = require('nodemailer');

// Enable CORS, bodyParser and other middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(cors());

// Handle user registration
server.post('/register', (req, res) => {
    const { username, useremail, userpassword } = req.body;

    // Validation (you can add more checks as needed)
    if (!username || !useremail || !userpassword) {
        return res.status(400).json({ error: 'Invalid input. Please provide username, email, and password.' });
    }

    // Check if a user with the same email or name already exists
    const existingUserByEmail = router.db.get('users').find({ email: useremail }).value();
    const existingUserByName = router.db.get('users').find({ username }).value();

    if (existingUserByEmail || existingUserByName) {
        return res.status(400).json({ error: 'User with the same email or name already exists.' });
    }

    // Simulate user creation (you may want to hash the password in a real scenario)
    const newUser = {
        id: Date.now(),
        username,
        email: useremail,
        password: userpassword
    };

    // Generate a random confirmation code (you may use a library for this)
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);

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
            return res.status(201).json({ newUser, confirmationCode });
            // Include confirmation code in the response (for testing purposes)

        }
    });
});

// Handle user login
server.post('/login', (req, res) => {
    const { useremail, userpassword } = req.body;

    // Find the user by email and password (you might want to hash passwords in a real scenario)
    const user = router.db.get('users').find({ email: useremail, password: userpassword }).value();

    if (user) {
        // Successful login
        return res.status(200).json({ message: 'Login successful' });
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
