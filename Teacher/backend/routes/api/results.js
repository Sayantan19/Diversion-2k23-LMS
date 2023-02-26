const express = require("express");
const router = express.Router();

const {Display, ResultSend, DisplayAll} = require('../../controllers/resultController')

// @route POST api/results/result
// @desc posts results of quiz
// @access Public
router.post("/result", ResultSend);

// @route POST api/results/display
// @desc displays results of quiz
// @access Public
router.post("/display", Display);

router.get('/scores', DisplayAll);

module.exports = router