const DanceClass = require("../models/DanceClass");
const Participant = require("../models/Participant")
const { NotFoundError, BadRequestError } = require("../utils/errors");

exports.getAllActiveClasses = async (req, res, next) => {

    const activeClasses = await DanceClass.find({ activeClass: true })
    const totalActiveClasses = await DanceClass.find({ activeClass: true }).countDocuments();

    try {
        if (!activeClasses) { throw new NotFoundError("There are no active dance classes available for the moment 💔") }


        for (let i = 0; i < activeClasses.length; i++) {
            const c = activeClasses[i];

            for (let j = 0; j < c.participant.length; j++) {
                let part = await Participant.findById(c.participant[j]);

                c.participants.push(part);
            }
        }

        return res.json({
            data: activeClasses,
            meta: {
                count: activeClasses.length,
                total: totalActiveClasses
            },

        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}

exports.getAllClasses = async (req, res, next) => {

    const classes = await DanceClass.find()
    const totalClasses = await DanceClass.countDocuments();

    try {
        if (!classes) { throw new NotFoundError("Could not find any dance classes 💔"); }

        for (let i = 0; i < classes.length; i++) {
            const c = classes[i];

            for (let j = 0; j < c.participant.length; j++) {
                let part = await Participant.findById(c.participant[j]);

                c.participants.push(part);
            }
        }

        return res.json({
            data: classes,
            meta: {
                count: classes.length,
                total: totalClasses
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}

exports.addParticipantToClass = async (req, res, next) => {
    const classId = req.params.id
    const participantId = req.body._id


    const danceClass = await DanceClass.findById(classId)
    if (!danceClass) throw new NotFoundError("This dance class does not exist!")
    if (danceClass.participant.length >= 20) throw new BadRequestError("Sorry this dance class is full!")
    const participantToAdd = await Participant.findById(participantId)

    let numbeeOfLeaders = 0;
    let numberOfFollowers = 0;

    for (let j = 0; j < danceClass.participant.length; j++) {
        let part = await Participant.findById(danceClass.participant[j]);

        if (part.role === "follower") {
            numberOfFollowers++;
        }
        else {
            numbeeOfLeaders++;
        }
    }

    if ((participantToAdd.role === "follower" && numberOfFollowers < 10) || ((participantToAdd.role === "leader" && numbeeOfLeaders < 10))) {
        danceClass.participant.push(participantToAdd._id);
        for (let j = 0; j < danceClass.participant.length; j++) {
            let part = await Participant.findById(danceClass.participant[j]);

            danceClass.participants.push(part);
        }

        const updatedClass = await danceClass.save();

        return res.json(updatedClass);
    }

    throw new BadRequestError("There are to many " + participantToAdd.role + " in this dance class.");
}

exports.removeParticipantfromClass = async (req, res, next) => {
    const participantId = req.body.id;
    console.log(participantId);
    const classId = req.params.id;
    console.log(classId);


    try {

        if (!participantId || !classId) {
            throw new BadRequestError(
                "You must provide a participantId and a classId"
            );
        }

        const removeParticipant = await Participant.findById(participantId);
        if (!removeParticipant) throw new NotFoundError(`A user with participant id: ${participantId}, does not exist`);

        const danceClass = await DanceClass.findById(classId);
        if (!danceClass) throw new NotFoundError(`A dance class with  id: ${classId}, does not exist`);


        let index = danceClass.participant.findIndex(p => p === participantId);
        if (index >= 0) {
            danceClass.participant.splice(index, 1);
        }

        const updatedClass = await danceClass.save()

        for (let j = 0; j < danceClass.participant.length; j++) {
            let part = await Participant.findById(danceClass.participant[j]);

            danceClass.participants.push(part);
        }

        return res.json(updatedClass);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}

