const Participant = require("../models/Participant");
const DanceClass = require("../models/DanceClass");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const mongoose = require("mongoose");

exports.createParticipant = async (req, res, next) => {
    const participantName = req.body.name
    const participantEmail = req.body.email
    const participantPayment = req.body.paymentStatus
    const participantRole = req.body.role

    try {

        if (!participantName || !participantEmail || !participantRole) throw new NotFoundError("You must provide a name, email and role");

        if (participantRole !== "follower" && participantRole !== "leader") throw new NotFoundError("You must choose between the 'follower' and 'leader' role");



        const newParticipant = await Participant.create({
            name: participantName,
            email: participantEmail,
            paymentStatus: participantPayment,
            role: participantRole,
        })

        return res.setHeader("Location", `http://localhost:${process.env.PORT}/api/v1/danceclasses/${newParticipant._id}`).status(201).json(newParticipant);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}

exports.updateParticipant = async (req, res, next) => {
    const participantId = req.params.id
    const { email, paymentStatus } = req.body;

    try {
        if (!email && !paymentStatus) throw new NotFoundError("Your most provide an email or payment to update");

        const updateParticipant = await Participant.findById(participantId)

        if (!updateParticipant) throw new NotFoundError(`A user with participant id: ${participantId}, does not exist`);

        if (email) updateParticipant.email = email;
        if (paymentStatus) updateParticipant.paymentStatus = paymentStatus;

        const updatedParticipant = await updateParticipant.save();

        return res.json(updatedParticipant);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}