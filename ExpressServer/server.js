const express = require('express');
const app = express();

/* http://localhost:8080/demo?name=Ashish */
app.get('/demo1', (req, res) => {
    // Extract the 'name' query parameter from the request
    const name = req.query.name;

    // Create a JSON response object containing the query parameters
    const responseObject = { query: req.query };
    console.log(req.query);

    // Send the JSON response
    res.json(responseObject);
});


/* http://localhost:8080/demo2?name=Ashish&age=21&subject=Social */
app.get('/demo2', (req, res) => {
  // Extract the query parameters from the request
  const { name, age, subject } = req.query;
  console.log("req query: ", req.query);

  // Create a JSON response object containing the query parameters
  const responseObject = { name, age, subject };

  // Send the JSON response
  res.json(responseObject);
}); 

/* http://localhost:8080/demo3/Ashish/21/Social */ 
app.get('/demo3/:name/:age/:subject', (req, res) => {
  // Extract the parameters from the request
  const { name, age, subject } = req.params;
  console.log("req params: ",req.params);

  // Create a JSON response object containing the parameters
  const responseObject = { name, age, subject };

  // Send the JSON response
  res.json(responseObject);
});

// Start the server on port 8080
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});