import React from 'react'
import './Questionnaire.css'
import Questionnaire from './Questionnaire.js'
export default function Questions() {
    return (
        <>
            <div className="container form-group" style={{ background: 'white', borderRadius: '3px', marginTop: '5em', padding: '1em' }} id='info'>
                <div className="forms">
                    <label htmlFor="time_for_each_question" className="form-label">
                        <h3><b>Specify the time to be given for each question (in seconds)</b><span style={{ color: 'red', fontSize: '15px' }}>*Required</span></h3>
                    </label>
                    <input type="text" className="form-control" name="time_for_each_question" id="time_for_each_question"
                        placeholder="" required={true} />
                </div>
                <hr />
                <div className="forms">
                    <label htmlFor="no_of_questions_in_quiz" className="form-label">
                        <h3><b>Specify the number of questions in the quiz</b> <span style={{ color: 'red', fontSize: '15px' }}>*Required</span></h3>
                    </label>
                    <input type="text" className="form-control" id="no_of_questions_in_quiz" name="no_of_questions_in_quiz"
                        placeholder="" required={true} />
                </div>
                <hr />
                <button className="btn btn-outline-dark forms" id="nextbut" onClick={Questionnaire}>Next</button>
            </div>
        </>
    )
}
