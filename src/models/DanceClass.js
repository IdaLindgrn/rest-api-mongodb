const mongoose = require("mongoose");

const DanceClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    danceStyle: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    classDurationInMinutes: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    classCoach: {
        type: Array,
        required: true,
    },
    activeClass: {
        type: Boolean,
        required: true,
    },
    participant: [{
        type: mongoose.Schema.Types.ObjectId, ref: "participant"
    }],

})

module.exports = mongoose.model("DanceClass", DanceClassSchema);