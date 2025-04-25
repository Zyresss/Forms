const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

// Use APP_PORT for Express server, not DB's PORT
const port = process.env.APP_PORT || 3000;
const webAddress = `http://localhost:${port}`;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/favicon.ico', (request, response) => {
    response.status(Number(process.env.SERVER_STATUS_NO_CONTENT) || 204).end();
});

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT || 3306, // Keep this for DB
});

// Connect to DB and handle errors
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at ${webAddress}`);
});
