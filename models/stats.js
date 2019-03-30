
const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    weight: { type: Number, required: true },
    distance: { type: Number, required: true },
    reps: { type: Number, required: true },
    time: { type: Number, required: true },
    goals: { type: Number, required: true },
    workouts: { type: Number, required: true }
})

statSchema.set('timestamps', true);
statSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, result) => {
        delete result._id;
        delete result.__v;
    }
});

module.exports = mongoose.model('Stat', statSchema);