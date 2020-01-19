const express = require('express');
const router = express.Router();

// Import Burgeregrub model (../models/burgeregrub.model.js);
const burgeregrub = require('../models/burgeregrub.model');

// Create all the routes
router.get('/', (req, res) => {
    try {

        burgeregrub.all((data) => {
            res.render('index', { burgeregrubs: data });
        });
    } catch {
        res.status(500).end();
    }
});

router.get('/add', (req, res) => {
    try {

        res.render('add-burger');
    } catch {
        res.status(500).end();
    }
});

router.post('/api/burgers', (req, res) => {
    try {

        burgeregrub.create(req.body, (result) => {
            // Send back the id of the new burgeregrub
            // res.json({ id: result.insertId });
            res.redirect("/");
        });
    } catch {
        res.status(500).end();
    }
});

router.put('/api/burgeregrub/:id', (req, res) => {
    try {
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
    } catch {
        res.status(500).end();
    }
});

router.delete('/api/burgeregrub/:id', (req, res) => {
    try {
        const condition = "id = " + req.params.id;
        burgeregrub.delete(condition, (result) => {
            if (result.affectedRows == 0) {
                // no rows changed, 404
                res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
    } catch {
        res.status(500).end();
    }
});

module.exports = router;