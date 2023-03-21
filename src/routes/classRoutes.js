const express = require("express")
const { getAllActiveClasses, getAllClasses } = require("../controllers/classController")
const router = express.Router();

router.get("/activeClass", getAllActiveClasses);
router.get("/", getAllClasses);

module.exports = router;