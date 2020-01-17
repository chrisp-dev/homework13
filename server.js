const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const bars = require('express-handlebars');

// serve static content for the app from "public"
app.use(express.static('public'));

// Parse req.body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set View Engine to Handlebars
app.engine('handlebars', bars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routes
const routes = require('./controllers/burgeregrub.controller');
app.use(routes);


// Start server and begin listening for requests
app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});