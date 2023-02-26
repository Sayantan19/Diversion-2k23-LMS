// //Import the required modules from the face-api.js:
// const faceapi = require('face-api.js');
// const canvas = require('canvas');
// const fs = require('fs');
// const path = require('path');

// //Load the face detection and recognition models:
// const MODEL_URL = path.join(__dirname, '/models');

// const loadModels = async () => {
//     await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
//     await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
//     await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
// };

// loadModels();

// //Capture the image from the camera:
// const { createCanvas, Image } = canvas;

// const video = document.getElementById('video');

// const captureFrame = () => {
//     const canvas = createCanvas(video.videoWidth, video.videoHeight);
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
//     return canvas.toDataURL('image/jpeg');
// };

// //Detect if a face is visible in front of the camera:
// async function detectFace(){
//     const img = await canvas.loadImage(captureFrame());
//     const detections = await faceapi.detectAllFaces(img, new faceapi.SsdMobilenetv1Options());

//     if (detections.length > 0) {
//         console.log('Face detected!');
//     } else {
//         console.log('No face detected!');
//     }
// };

// module.exports = detectFace;