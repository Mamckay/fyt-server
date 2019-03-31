'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Stat = require('../models/stats');
const router = express.Router();

/* JWT Auth */
const jwtAuth = passport.authenticate('jwt', { session: false });


router.get('/', jwtAuth, (req, res, next) => {
    Stat.find({ userId: req.user.id })
        .then(result => {
            res.json(result);
        })
})

router.put('/', jwtAuth, (req, res, next) => {
    Stat.find({ userId: req.user.id })
        .then(result => {
            console.log(result[0].goals);
            Stat.findOneAndUpdate({ userId: req.user.id }, { goals: result[0].goals + 1 }, { new: true })
                .then(result => {
                    res.sendStatus(200);
                })
        })
})

module.exports = router;