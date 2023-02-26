
const fs = require('fs');
const path = require("path");

const SetQuestion = (req, res) => {
    if (res) {
        const request = req.body;
        const response = 'Received';
        fs.readFile('../../Data/question.json', 'utf8', (err, data) => {
            if (err) throw err;
            const fileData = JSON.parse(data);
            console.log(typeof (fileData));
            fileData['Question_settings'] = request;
            fs.writeFile('../../Data/question.json', JSON.stringify(fileData, null, 4), (err) => {
                if (err) throw err;
            });
        });
        res.send(response);
    }
    else
        console.log(req.status);
}

const UploadQuestion = (req, res) => {
    if (res) {
        const request = req.body;
        // console.log(req.body)
        const response = "JSON received";
        fs.readFile('../../Data/question.json', 'utf8', (err, data) => {
            if (err) throw err;
            const fileData = JSON.parse(data);
            console.log('FileData:',fileData)
            console.log(request)
            fileData['quizData'] = request;

            fs.writeFile('../../Data/question.json', JSON.stringify(fileData, null, 4), (err) => {
                if (err) throw err;
            });
        });
        res.send(response);

    }
    else
        console.log(req.status);

}


module.exports = { SetQuestion, UploadQuestion }