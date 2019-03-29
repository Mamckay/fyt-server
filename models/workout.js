
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workout: { type: mongoose.Schema.Types.Mixed, required: true }
})

workoutSchema.set('timestamps', true);
workoutSchema.index({ userId: 1, goal: 1 }, { unique: true });
workoutSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, result) => {
        delete result._id;
        delete result.__v;
    }
});

module.exports = mongoose.model('Workout', workoutSchema);