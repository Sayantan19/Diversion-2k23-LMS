const express = require("express");
const fs = require('fs');
const router = express.Router();
const path = require('path');

// const proctor = require('../../controllers/proctorController.js')

router.get('/models', (req, res) => {

    const folderPath = './weights';
    const fileExtension = '.json'; // Only load files with a .json extension

    const files = fs.readdir(folderPath)
        .filter(file => file.endsWith(fileExtension))
        .map(file => {
            const filePath = path.join(folderPath, file);
            const fileContent = fs.readFile(filePath, 'utf-8');
            return JSON.parse(fileContent);
        });


})

module.exports = router;
