const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    paymentStatus : {
        type: String,
        required: true,
    },
    class : {
        type: String,
        required: true,
    },
    role : {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model("Participant", ParticipantSchema);