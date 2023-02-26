const User = require("../models/User");
const Result = require('../models/Result');

const ResultSend =  (req, res) => {

    if (res) {
        console.log(req.body)
        // res.sendStatus(200);
        const id = req.id;
        // Find user by email
        User.findOne({ id }).then(user => {
            console.log(user);
            const name = user.name;
            const email = user.email;
            Result.findOne({ email }).then(result => {
                if (result) {
                    console.log('Fraud Case')
                    res.send('Fraud Case');
                }
                else {
                    console.log("I'm here");
                    const newResult = new Result({
                        name: name,
                        email: email,
                        score: req.body.score,
                        time: req.body.time
                    })
                    newResult.save()
                        .then(result => res.json(result))
                        .catch(err => console.log(err));
                }
            })
        })
    }
    else
        console.log(req.status)
}

const Display =  (req, res) => {
    if (res) {
        console.log(req.body)
        const id = req.id;
        Result.findOne({ id })
            .then(result => {
                console.log(typeof (result))
                const data = JSON.stringify(result)
                res.send(data)
            })
    }
    else
        res.send('Not Found')
}

const DisplayAll =  (req, res) => {
    if (res) {
        Result.find()
            .then(result => {
                console.log((result))
                const data = JSON.stringify(result)
                res.send(result)
            })
    }
    else
        res.send('Not Found')
}

module.exports = {ResultSend,Display,DisplayAll}