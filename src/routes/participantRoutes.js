const express = require("express")
const { createParticipant, updateParticipant } = require("../controllers/participantController")
const router = express.Router();

router.post("/", createParticipant);
router.put("/:id", updateParticipant);

module.exports = router;