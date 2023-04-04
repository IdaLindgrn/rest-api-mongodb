const express = require("express")
const { getAllActiveClasses, getAllClasses, addParticipantToClass, removeParticipantfromClass } = require("../controllers/classController")
const router = express.Router();

router.get("/activeClass", getAllActiveClasses);
router.get("/", getAllClasses);
router.post("/:id", addParticipantToClass);
router.put("/:id", removeParticipantfromClass);

module.exports = router;