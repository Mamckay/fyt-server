'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const Workout = require('../models/workout')
/* JWT Auth */
const jwtAuth = passport.authenticate('jwt', { session: false });

/* Get all  */
router.get('/', jwtAuth, (req, res, next) => {
    Workout.find()
        .sort({ createdAt: 'desc' })
        .then(workouts => {
            res.json(workouts);
        })
        .catch(err => {
            next(err);
        });
});


router.get('/user/all', jwtAuth, (req, res, next) => {
    Workout.find({ userId: req.user.id })
        .sort({ createdAt: 'desc' })
        .then(workouts => {
            res.json(workouts);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/user/endurance', jwtAuth, (req, res, next) => {
    Workout.find({ userId: req.user.id })
        .sort({ createdAt: 'desc' })
        .then(workouts => {
            const thing = workouts.map(workout => {
                if (workout.workout.Category === 'endurance') {
                    return workout;
                }
            })
            res.json(thing);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/user/strength', jwtAuth, (req, res, next) => {
    Workout.find({ userId: req.user.id })
        .sort({ createdAt: 'desc' })
        .then(workouts => {
            const thing = workouts.map(workout => {
                if (workout.workout.Category === 'strength') {
                    return workout;
                }
            })
            res.json(thing);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/user/balance', jwtAuth, (req, res, next) => {
    Workout.find({ userId: req.user.id })
        .sort({ createdAt: 'desc' })
        .then(workouts => {
            const thing = workouts.map(workout => {
                if (workout.workout.Category === 'balance') {
                    return workout;
                }
            })
            res.json(thing);
        })
        .catch(err => {
            next(err);
        });
});

router.post('/', jwtAuth, (req, res, next) => {
    const newWorkout = {};
    const { workoutBody } = req.body;
    if (workoutBody.Category) {
        newWorkout.Category = workoutBody.Category;
    }
    if (workoutBody.Exercise) {
        newWorkout.Exercise = workoutBody.Exercise;
    }
    if (workoutBody.Reps) {
        newWorkout.Reps = workoutBody.Reps;
    }
    if (workoutBody.Weight) {
        newWorkout.Weight = workoutBody.Weight;
    }
    if (workoutBody.Distance) {
        newWorkout.Distance = workoutBody.Distance;
    }
    if (workoutBody.Time) {
        newWorkout.Time = workoutBody.Time;
    }

    Workout.create({ userId: req.user.id, workout: newWorkout })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            next(err);
        });
});

router.delete('/', jwtAuth, (req, res, next) => {
    const { workoutBody } = req.body;
    const removeWorkout = {
        userId: req.user.Id,
        workout: workoutBody
    }
    Workout.deleteOne(removeWorkout)
        .then(response => {
            res.json(response);
        })
        .catch(err => console.log(err))
})

module.exports = router;
