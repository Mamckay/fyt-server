'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const Workout = require('../models/workout')
const Stat = require('../models/stats');
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
    const { Category, Exercise, Reps, Weight, Distance, Time } = req.body;
    if (Category) {
        newWorkout.Category = Category;
    }
    if (Exercise) {
        newWorkout.Exercise = Exercise;
    }
    if (Reps) {
        newWorkout.Reps = Reps;
    }
    if (Weight) {
        newWorkout.Weight = Weight;
    }
    if (Distance) {
        newWorkout.Distance = Distance;
    }
    if (Time) {
        newWorkout.Time = Time;
    }

    Workout.create({ userId: req.user.id, workout: newWorkout })
        .then(response => {
            Stat.find({ userId: req.user.id })
                .then(result => {
                    const updateStats = {};
                    const tempStats = Object.keys(newWorkout);
                    let tempNumbers = JSON.stringify(Object.values(result));
                    tempNumbers = JSON.parse(tempNumbers);
                    tempStats.map((singleStat, index) => {
                        if (singleStat === 'Reps' || singleStat === 'Time' || singleStat === 'Distance' || singleStat === 'Weight') {
                            const lowerStat = singleStat.toLowerCase();
                            updateStats[lowerStat] = Number(tempNumbers[0][lowerStat]) + Number(newWorkout[singleStat]);
                        }
                    })
                    return updateStats;
                })
                .then(dataSet => {
                    Stat.findOneAndUpdate({ userId: req.user.id }, dataSet, { new: true })
                        .then(response => {
                            console.log(response);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })

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
