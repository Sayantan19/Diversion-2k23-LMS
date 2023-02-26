import axios from "axios"

export default function Questionnaire() {
    const button = document.getElementById('nextbut')
    const info_set = document.getElementById('info')
    const questiontime = document.getElementById('time_for_each_question')
    const quizquestion = document.getElementById('no_of_questions_in_quiz')
    button.addEventListener('click', () => {
        const data = {
            questiontime: questiontime.value,
            quizquestions: quizquestion.value
        }
        console.log(data);
        axios.post('/api/questions/question', data)
            .then(function (response) {
                response.json().then(function (data) {
                    console.log(data);
                })
            }).catch(res => { console.log(res.status) })
        // console.log(i)
        callQuestionPage()
    })

    function callQuestionPage() {
        info_set.innerHTML = `
    <form action = "/api/questions/question_upload" method = "post" enctype="multipart/form-data">  
        <input type="file" name="file" id="tag"/>  
        <input type = "submit" value="Upload" id="submit-but">  
    </form>
    `;
        const button2 = document.getElementById('end')
        button2.addEventListener('click', () => {
            info_set.innerHTML = `
        <div className="container" id="end">
            <p id="exitMessage"><h2>Questions successfully entered!</h2></p>
            <button className="btn btn-outline-dark" id="endButton" onclick="window.location.assign('/teacher/login')">Go to menu</button>
        </div>
        `
        })
    }
}