const express = require("express")
const { addParticipantToClass, deleteParticipantfromClass, updateParticipant } = require("../controllers/participantController")
const router = express.Router();

router.post("/", addParticipantToClass);
router.delete("/", deleteParticipantfromClass);
router.post("/", updateParticipant);

module.exports = router;