const User = require("../models/User");
const Result = require('../models/Result');
const mongoose = require('mongoose');

const ResultSend = (req, res) => {

    if (res) {
        console.log('\n');
        // res.sendStatus(200);
        const id = req.body.id;
        var objectId = mongoose.Types.ObjectId(id);
        console.log(objectId, '\n');
        // Find user by email
        User.findOne(objectId)
            .then(user => {
                console.log(user);
                const name = user.name;
                const email = user.email;
                Result.findOne({ email })
                    .then(result => {
                        if (result) {
                            console.log('Fraud Case');
                            res.send('Fraud case');
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
                                .catch(err => { console.log(err); res.send(err.message)});
                            }
                    })
            })
            .catch(response =>
                console.log('error'))
            }
    else
        console.log(req.status)
}

const Display = (req, res) => {
    if (res) {
        console.log(req.body)
        const id = req.body.id;
        var objectId = mongoose.Types.ObjectId(id);
        Result.findOne(objectId)
            .then(result => {
                console.log(result)
                const data = JSON.stringify(result)
                res.send(data)
            })
    }
    else
        res.send('Not Found')
}

module.exports = { ResultSend, Display }