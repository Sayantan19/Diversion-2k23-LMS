const User = require("../models/User");
const Result = require('../models/Result');
const mongoose = require('mongoose');

const ResultSend = (req, res) => {

    if (res) {
        console.log('\n');
        // res.sendStatus(200);
        const id = req.body.id;
        const query = { _id: id };
        // Find user by email
        User.findOne(query)
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
                                .catch(err => { console.log(err); res.send(err.message) });
                        }
                    })
            })
            .catch(response =>
                console.log(response))
    }
    else
        console.log(req.status)
}

const Display = (req, res) => {
    if (res) {
        const id = req.body.id;
        const query = { _id: id }
        User.findOne(query)
            .then(user => {
                const e = user.email;
                const query1 = {email: e}
                Result.findOne(query1)
                    .then(result => {
                        const data = JSON.stringify(result)
                        res.send(data)
                    })
                    .catch(response =>{console.log(response)})
            })
    }
    else
        res.send('Not Found')
}

module.exports = { ResultSend, Display }