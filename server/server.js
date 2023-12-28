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
server.post('/users', (req, res) => {
    const { username, useremail, userpassword } = req.body;

    // Validation (you can add more checks as needed)
    if (!username || !useremail || !userpassword) {
        return res.status(400).json({ error: 'Invalid input. Please provide username, email, and password.' });
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

// Use default router
server.use(router);

const port = 3000;
server.listen(port, () => {
    console.log(`JSON Server is running on http://localhost:${port}`);
});
