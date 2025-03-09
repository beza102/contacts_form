// Import modules
import express from 'express';
import { validateForm } from './services/validation.js';
import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

// Database connection pool
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Function to get a database connection
async function connect() {
  try {
    const conn = await pool.getConnection();
    console.log('Connected to the database');
    return conn;
  } catch (err) {
    console.error(`Error connecting to the database: ${err.message}`);
    return null; // Return null to handle failure gracefully
  }
};

// Instantiate an Express application
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set the view engine
app.set('view engine', 'ejs');

// Serve static files from 'public'
app.use(express.static('public'));

// Define the port
const PORT = 3000;

// Home Page Route
app.get('/', (req, res) => {
  res.render('home');
});

// Admin Route - Fetch contacts from DB
app.get('/admin', async (req, res) => {
  let conn;
  try {
    conn = await connect();
    if (!conn) throw new Error("Database connection unavailable");

    const contacts = await conn.query(`SELECT * FROM contacts;`);
    res.render('summary', { contacts });
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).send("Error retrieving contact data. Please try again later.");
  } finally {
    if (conn) conn.release(); // Ensure connection is released
  }
});

// Form Submission Route
app.post('/thankyou', async (req, res) => {
  // Create a new contact object
  const contact = {
    fname: req.body.fname,
    lname: req.body.lname,
    title: req.body.title,
    company: req.body.company,
    linkedin: req.body.linkedin,
    email: req.body.email,
    place: req.body.place,
  };

  // Validate the form
  const result = validateForm(contact);
  if (!result.isValid) {
    console.log(result.errors);
    return res.render('home', { errors: result.errors, contact });
  }

  let conn;
  try {
    conn = await connect();
    if (!conn) throw new Error("Database connection unavailable");

    await conn.query(
      `INSERT IGNORE INTO contacts (fname, lname, title, company, linkedin, email, place, timestamp) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [contact.fname, contact.lname, contact.title, contact.company, contact.linkedin, contact.email, contact.place, contact.timestamp]
    );

    res.render('thankyou', { contact });
  } catch (err) {
    console.error("Error inserting contact:", err);
    res.status(500).send("Error submitting your contact information. Please try again.");
  } finally {
    if (conn) conn.release();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});