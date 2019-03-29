'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Goal = require('../models/goal');
const router = express.Router();

/* JWT Auth */
const jwtAuth = passport.authenticate('jwt', { session: false });

/* Get all  */
router.get('/', jwtAuth, (req, res, next) => {
    Goal.find()
        .sort({ createdAt: 'desc' })
        .then(goals => {
            res.json(goals);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/user/all', jwtAuth, (req, res, next) => {
    Goal.find({ userId: req.user.id })
        .sort({ createdAt: 'desc' })
        .then(goals => {
            res.json(goals);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/user/endurance', jwtAuth, (req, res, next) => {
    Goal.find({ userId: req.user.id })
        .sort({ createdAt: 'desc' })
        .then(goals => {
            const thing = goals.map(goal => {
                if (goal.goal.Category === 'Endurance') {
                    return goal;
                }
            })
            res.json(thing);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/user/strength', jwtAuth, (req, res, next) => {
    Goal.find({ userId: req.user.id })
        .sort({ createdAt: 'desc' })
        .then(goals => {
            const thing = goals.map(goal => {
                if (goal.goal.Category === 'Strength') {
                    return goal;
                }
            })
            res.json(thing);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/user/balance', jwtAuth, (req, res, next) => {
    Goal.find({ userId: req.user.id })
        .sort({ createdAt: 'desc' })
        .then(goals => {
            const thing = goals.map(goal => {
                if (goal.goal.Category === 'Balance') {
                    return goal;
                }
            })
            res.json(thing);
        })
        .catch(err => {
            next(err);
        });
});

router.post('/', jwtAuth, (req, res, next) => {
    console.log(req.body);
    const newGoal = {};
    const { Category, Exercise, Reps, Distance, Time, Weight } = req.body;
    if (Category) {
        newGoal.Category = Category;
    }
    if (Exercise) {
        newGoal.Exercise = Exercise;
    }
    if (Reps) {
        newGoal.Reps = Reps;
    }
    if (Weight) {
        newGoal.Weight = Weight;
    }
    if (Distance) {
        newGoal.Distance = Distance;
    }
    if (Time) {
        newGoal.Time = Time;
    }

    Goal.create({ userId: req.user.id, goal: newGoal })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            next(err);
        });
});

router.delete('/', jwtAuth, (req, res, next) => {
    const { goalBody } = req.body;
    const removeGoal = {
        userId: req.user.id,
        goal: goalBody
    }
    Goal.deleteOne(removeGoal)
        .then(response => {
            res.json(response);
        })
        .catch(err => console.log(err))
})

module.exports = router;
