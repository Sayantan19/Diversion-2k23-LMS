// import * as p5 from 'p5'
import "p5/lib/addons/p5.dom";
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as faceapi from 'face-api.js';
import { accessCurrentUser } from "../../actions/authActions";
import axios from "axios";


const MODEL_URL = '/models'

export default function sketch(p) {
    let errorcount = 0;
    let cheatInstance = []
    let capture = null;
    let cocossdModel = null;

    let cocoDrawings = [];
    let faceDrawings = [];


    function showCocoSSDResults(results) {
        cocoDrawings = results;
    }

    function showFaceDetectionData(data) {
        faceDrawings = data;
    }

    p.setup = async function () {

        await faceapi.loadTinyFaceDetectorModel(MODEL_URL);

        p.createCanvas(0, 0);
        const constraints = {
            video: {
                mandatory: {
                    minWidth: 0,
                    minHeight: 0
                },
                optional: [{ maxFrameRate: 30 }]
            },
            audio: false
        };

        capture = p.createCapture(constraints, () => {
        });


        capture.id("video_element");
        capture.size(0, 0);
        capture.hide();

        cocoSsd.load().then((model) => {
            try {
                cocossdModel = model;
            } catch (e) {
                console.log(e);
            }

        }).catch((e) => {
            console.log("Error occured : ", e);
        });

    };

    p.draw = async () => {
        if (!capture) {
            return;
        }
        p.background(255);
        p.image(capture, 0, 0);
        p.fill(0, 0, 0, 0);

        if (cocoDrawings.length > 0) {
            if (cocoDrawings.length === 1) {
                cocoDrawings.map((drawing) => {
                    if (drawing) {
                        p.textSize(20);
                        p.strokeWeight(1);
                        const textX = drawing.bbox[0] + drawing.bbox[2];
                        const textY = drawing.bbox[1] + drawing.bbox[3];

                        const confidenetext = "Confidence: " + drawing.score.toFixed(1);
                        const textWidth = p.textWidth(confidenetext);

                        const itemTextWidth = p.textWidth(drawing.class);
                        p.text(drawing.class, textX - itemTextWidth - 10, textY - 50);

                        p.text(confidenetext, textX - textWidth - 10, textY - 10);
                        p.strokeWeight(4);
                        p.stroke('rgb(0%,100%,0%)');
                        if (errorcount !== 0) {
                            cheatInstance.push(errorcount)
                            const cheat = document.getElementById('cheat')
                            cheat.innerHTML = `<span>Times cheated: ${cheatInstance.length - 1}<span>`
                            if (cheatInstance.length - 1 >= 5) {
                                alert("You have been disqualified");
                                localStorage.removeItem('saved_timer');
                                const token = accessCurrentUser();
                                // console.log(token);
                                const data = {
                                    'id': token.id,
                                    'name': token.name,
                                    'score': 0,
                                    'time': 0,
                                }

                                // console.log(data);
                                axios.post('/api/results/result', data)
                                    .then(function (response) {
                                        if (response.status !== 200) {
                                            console.log('Error', response.status);
                                        }
                                        else if (response.data === 'Fraud Case') {
                                            alert('Congratulations on wasting your time giving the exam again!');
                                            window.location.href = '/summary';
                                        }
                                        else {
                                            console.log(response);
                                            console.log('Success');
                                            window.location.href = '/summary';
                                        }
                                    }).catch(console.log("Fraud case"));
                            }
                        }
                        // console.log('Times Cheated:', cheatInstance.length - 1)
                        errorcount = 0;
                        p.rect(drawing.bbox[0], drawing.bbox[1], drawing.bbox[2], drawing.bbox[3]);
                    }
                })
            }
            else {
                // no face detected, print message
                p.textSize(30);
                p.fill(255, 0, 0);
                p.text("Multiple faces detected", 50, 50);
                errorcount++;
            }
        }
        else {
            // no face detected, print message
            p.textSize(30);
            p.fill(255, 0, 0);
            p.text("No face detected", 50, 50);
            errorcount++;
        };

        console.log(errorcount)
        faceDrawings.map((drawing) => {
            if (drawing) {
                p.strokeWeight(4);
                p.stroke('rgb(0%,0%,100%)');
                p.rect(drawing.detection.box._x, drawing.detection.box._y, drawing.detection.box._width, drawing.detection.box._height);
            }
        });
        faceapi.detectAllFaces(capture.id()).withAgeAndGender().withFaceExpressions().then((data) => {
            showFaceDetectionData(data);
        });

        if (capture.loadedmetadata) {
            if (cocossdModel) {
                cocossdModel
                    .detect(document.getElementById("video_element"))
                    .then(showCocoSSDResults)
                    .catch((e) => {
                        console.log("Exception : ", e);
                    });
            }
        }
    }
};