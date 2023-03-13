import React, { useState } from 'react';
import './Rules.css'

export default function Rules() {
    const [checked, setChecked] = useState(true);
    const handleChange = () => {
        var checkBox = document.getElementById("accept");
        var button = document.getElementById("submit-button");
        setChecked(!checked);
        if (checked === true) {
            button.innerHTML = `<a class="btn btn-outline-dark mb-1" id="start" href='/quiz' style="display: block" role="button">Start Quiz!!!</a>`
            checkBox.style.backgroundColor = "black";
        }
        else {
            document.getElementById('start').style.display = "none";
            checkBox.style.backgroundColor = "white";
        }
    };
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center container" id="main-wrapper" style={{ height: '100vh' }}>
                <div className='container bg-light' style={{borderRadius:'5px', boxShadow:'0px 0px 15px 10px #c6c6c66e'}}>
                    <header className="header">
                        <h1>RULES FOR LAB VIVA</h1>
                    </header>
                    <ol className="list-group list-group-numbered">
                        <li className="list-group-item" id="rule-list">This is an MCQ round, each team will be given 30 questions to be
                            answered in 30 mins.
                        </li>
                        <li className="list-group-item" id="rule-list">Questions will be asked from all domains related to Tech.</li>
                        <li className="list-group-item" id="rule-list">4 points will be awarded for each correct answer.</li>
                        <li className="list-group-item" id="rule-list">1 point to be deducted for each incorrect answer.</li>
                        <li className="list-group-item" id="rule-list">Ranking will be done based on the total points obtained and the time
                            taken to finish
                            the questions</li>
                        <li className="list-group-item" id="rule-list">In case of tie break, the time taken to submit the quiz will be
                            considered as the
                            deciding factor.</li>
                        <li className="list-group-item" id="rule-list">Use of unfair means will be strictly dealt with.</li>
                        <li className="list-group-item" id="rule-list"> Anyone caught cheating, accessing the internet or use any other means
                            which can
                            damage the spirit of the event will result in immediate disqualification of that team.</li>
                        <li className="list-group-item" id="rule-list">Please be careful while answering. Answers attempted won't be saved and
                            once you proceed to the next question, you will not be allowed to go back.</li>
                    </ol>
                    <div className="input-group mb-3" id="Rule-agree">
                        <input id="accept" className="form-check-input ms-4 mt-2 me-2" type="checkbox" checked={!checked}
                            aria-label="Checkbox for following text input" onChange={handleChange} />
                        <p className="mt-1" id="line"><b />I have read all the rules carefully and agree to abide by them </p>
                        <div className="container" id="submit-button"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
