// Import the Express module
import express from 'express';


// Instantiate an Express application
const app = express();

//Middleware to parse form data
app.use(express.urlencoded({extended:true}));

//set the view engin for our application
app.set('view engine', 'ejs');


// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define the port number where our server will listen
const PORT = 3000;

// Store form submissions in memory
const forms = [];

// Create a "default" route for our website's home page
app.get('/', (req, res) => {
  
  // Send our home page as a response to the client
  res.render('home');
});

//Define an admin route
app.get('/admin', (req, res) =>{
  res.render('summary', {contacts: forms })
});


// Handle form submission
app.post('/submit-form', (req, res) => {
  // Backend validation: Ensure first name, last name, and email are present
  if (!req.body.fname || !req.body.lname || !req.body.email) {
      return res.send('Invalid Input'); // Simple validation response
  }

  // Create a new contact object
  const contact = {
      fname: req.body.fname,
      lname: req.body.lname,
      title: req.body.title,
      company: req.body.company,
      linkedin: req.body.linkedin,
      email: req.body.email,
      method: req.body.method,
      timestamp: new Date().toLocaleString(), // Add timestamp
  };


//Add the form to our array
forms.push(contact);
console.log(forms);


// Send our thank you page
res.render('thankyou', { contact });


})

// Tell the server to listen on our specified port
app.listen(PORT, () => {
  console.log(`Server is running at     
  http://localhost:${PORT}`);
});


