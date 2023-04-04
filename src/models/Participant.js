const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    paymentStatus: {
        type: String,
        default: "pending",
    },
    role: {
        type: String,
        required: true,
        enum: ['leader', 'follower'],
    }

})

module.exports = mongoose.model("Participant", ParticipantSchema);