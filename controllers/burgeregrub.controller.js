const express = require('express');
const router = express.Router();

// Import Burgeregrub model (../models/burgeregrub.model.js);
const burgeregrub = require('../models/burgeregrub.model');

// Create all the routes
router.get('/', (req, res) => {
    burgeregrub.all((data) => {
        res.render('index', { burgeregrubs: data });
    });
});

router.get('/add', (req, res) => {
    res.render('add-burger');
});

router.post('/api/burgers', (req, res) => {
    burgeregrub.create(req.body, (result) => {
        // Send back the id of the new burgeregrub
        // res.json({ id: result.insertId });
        console.log(result);
        res.redirect("/");
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