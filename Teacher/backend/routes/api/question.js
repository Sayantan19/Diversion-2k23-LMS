const express = require("express");
const fs = require('fs');
const router = express.Router();
const path = require('path');

const {SetQuestion, UploadQuestion} = require('../../controllers/questionController.js')

router.post('/question', SetQuestion)

router.post('/question_upload', UploadQuestion)


module.exports = router;
