
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    goal: { type: mongoose.Schema.Types.Mixed, required: true }
})

goalSchema.set('timestamps', true);
goalSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, result) => {
        delete result._id;
        delete result.__v;
    }
});

module.exports = mongoose.model('Goal', goalSchema);