const Participant = require("../models/Participant");
const DanceClass = require("../models/DanceClass");
const { NotFoundError, BadRequestError } = require ("../utils/errors");
const mongoose = require("mongoose");

exports.addParticipantToClass  = async (req, res, next) => {
    const participantId = req.params.participantId;
    const classId = req.params.classId;
    const danceClass = await DanceClass.findById(classId)

    try {

        if (!danceClass) throw new NotFoundError("This dance class does not exist!")

        const participant = await Participant.findById(participantId);
        if (!participant) throw new NotFoundError("This participant does not exist!")

      } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
      }
}

exports.deleteParticipantfromClass  = async (req, res, next) => {
    const participantId = req.params.participantId;
    const classId = req.params.classId;

    try {

    if(!participantId || !classId) {
        return res.status(500).json({
            message: "That participant does not exist in this class!",
        });
    }

    const deleteParticipant = await Participant.findById(participantId);

    if(!deleteParticipant) throw new NotFoundError(`A user with participant id: ${participantId}, does not exist`);
    await deleteParticipant.delete();

    return res.json(deleteParticipant);

} catch (error) {
    console.error(error);
    return res.status(500).json({
        message: error.message,
    });
  }


}

exports.updateParticipant = async (req, res, next) => {
    const participantId = req.params.participantId
    const { email, paymentStatus } = req.body;

    try {

        if(!email || !paymentStatus) throw new NotFoundError("Your most provide an email or payment to update");

        const updateParticipant = await Participant.findById(participantId)

        if(!updateParticipant) throw new NotFoundError(`A user with participant id: ${participantId}, does not exist`);

        if(email) updateParticipant.email = email;
        if(paymentStatus) updateParticipant.paymentStatus = paymentStatus;
        const updatedParticipant = await updateParticipant.save();

        return res.json(updatedParticipant);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
      }
}