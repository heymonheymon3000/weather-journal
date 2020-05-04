// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require dependencies
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

// listening callback
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

// GET route returns projectData
app.get('/all', function (request, response) {
    response.send(projectData);
});

// POST route adds data to projectData
app.post('/add', function (request, response) {
    newEntry = {
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse
    };

    projectData.unshift(newEntry);
});