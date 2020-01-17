const express = require('express');
const router = express.Router();

// Import Burgeregrub model (../models/burgeregrub.model.js);
const burgeregrub = require('../models/burgeregrub.model');

// Create all the routes
router.get('/', (req, res) => {
    // basic get route, make sure handlebars works
    // app.get('/', (req, res) => {
    const burgeregrubs = [{
        id: 1,
        name: 'Scoob\'s Hawaiian Volcano Burger',
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
    // res.render('index', { burgeregrubs });
    // });
    burgeregrub.all((data) => {
        res.render('index', { burgeregrubs: data });
    });
});

router.post('/api/burgeregrubs', (req, res) => {
    burgeregrub.create([
        "name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], (result) => {
        // Send back the id of the new burgeregrub
        res.json({ id: result.insertId });
    });
});

router.put('/api/burgeregrub/:id', (req, res) => {
    const conditionCol = 'id = ' + req.params.id;

    burgeregrub.update({
        devoured: req.body.devoured
    }, conditionCol, (result) => {
        // if no rows changed, 404
        if (result.changedRows = 0) {
            res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete('/api/burgeregrub/:id', (req, res) => {
    const burgeregrubId = req.params.id;

    burgeregrub.delete(burgeregrubId, (result) => {
        if (result.affectedRows == 0) {
            // no rows changed, 404
            res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;