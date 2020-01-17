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

// basic get route, make sure handlebars works
app.get('/', (req, res) => {
    const burgeregrubs = [{
        id: 1,
        name: 'Freddie\'s Hawaiian Volcano Burger',
        devoured: false
    }, {
        id: 2,
        name: 'Big Bacon Burger',
        devoured: false
    }, {
        id: 3,
        name: 'Falcon Punch Burger',
        devoured: true
    }]
    res.render('index', { burgeregrubs });
});

// Start server and begin listening for requests
app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});