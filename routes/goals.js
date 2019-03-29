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
                if (goal.goal.Category === 'endurance') {
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
                if (goal.goal.Category === 'strength') {
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
                if (goal.goal.Category === 'balance') {
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
    const newGoal = {};
    const { goalBody } = req.body;
    if (goalBody.Category) {
        newGoal.Category = goalBody.Category;
    }
    if (goalBody.Exercise) {
        newGoal.Exercise = goalBody.Exercise;
    }
    if (goalBody.Reps) {
        newGoal.Reps = goalBody.Reps;
    }
    if (goalBody.Weight) {
        newGoal.Weight = goalBody.Weight;
    }
    if (goalBody.Distance) {
        newGoal.Distance = goalBody.Distance;
    }
    if (goalBody.Time) {
        newGoal.Time = goalBody.Time;
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
