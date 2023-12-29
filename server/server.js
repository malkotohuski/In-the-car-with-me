// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

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

    // Add the new user to the "users" collection
    router.db.get('users').push(newUser).write();

    return res.status(201).json(newUser);
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
