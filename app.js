// Import the Express module
import express from 'express';


// Instantiate an Express application
const app = express();


// Serve static files from the 'public' directory
app.use(express.static('public'));


// Define the port number where our server will listen
const PORT = 3000;
const info = [];

app.use(express.urlencoded({extended:true}));

// Create a "default" route for our website's home page
app.get('/', (req, res) => {
  


  // Send our home page as a response to the client
  res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.post('/submit-form', (req, res) => {
  info.push(req.body);
  console.log(req.body)
  res.send(`<h1>Form Submitted Successfully, ${req.body.fname}</h1>
    <p>Thank you for your submission.</p>
    <a href="/">Go back to the form</a>
  `)
})
app.get('/admin/orders', (req, res) =>{
  res.send(info)
});


// Tell the server to listen on our specified port
app.listen(PORT, () => {
  console.log(`Server is running at     
  http://localhost:${PORT}`);
});


