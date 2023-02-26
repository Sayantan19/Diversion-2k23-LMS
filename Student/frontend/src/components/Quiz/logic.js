import axios from 'axios';
import { accessCurrentUser } from '../../actions/authActions';
import data from './question.json'

export default function logic() {

    // axios.post('/api/users/proctor')
    //     .then(function (response) {
    //         if (response.status !== 200) {
    //             console.log('Error', response.status);
    //         }
    //         else {
    //             console.log(response);
    //             console.log('Success');
    //         }
    //     })
    //     .catch(console.log('Gondogol'));

    function SubmitResult() {
        const token = accessCurrentUser();
        // console.log(token);
        const data = {
            'id': token.id,
            'name': token.name,
            'score': correctscore,
            'time': (timerValue - totalSeconds),
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

    //To set the number of questions
    const NoOfQuestions = Number(data.Question_settings.quizquestions)
    //To set the time
    const timerValue = NoOfQuestions * Number(data.Question_settings.questiontime);
    var totalSeconds;
    //Initializing the time at the beginning of the quiz
    let time = localStorage.getItem('saved_timer');
    if (time == null) {
        const saved_timer = new Date().getTime() + (timerValue * 1000);
        localStorage.setItem('saved_timer', saved_timer);
        time = saved_timer;
    }

    //To update the time
    const timerID = setInterval(timeUpdate, 1000);
    //This is the function which updates the time
    function timeUpdate() {
        const now = new Date().getTime();
        const difference = time - now;

        totalSeconds = Math.floor(difference / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        document.getElementById("timer").innerText = 'Time Left: ' + minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds);
        //Changes if the time ends
        if (totalSeconds <= 0) {
            alert("TIME'S UP!!!");
            clearInterval(timerID);
            localStorage.removeItem('saved_timer');
            calculateMarks();
            // closeNav();

            SubmitResult()
        }
    }

    // //The question set is stored in 'quizData'
    const quizData = data.quizData;
    // const quiz = document.getElementById('quiz')
    //Various elements of the question to be displayed in the page.
    const answerEls = document.querySelectorAll('.answer')
    const questionEl = document.getElementById('question')
    const a_text = document.getElementById('a_text')
    const b_text = document.getElementById('b_text')
    const c_text = document.getElementById('c_text')
    const d_text = document.getElementById('d_text')

    //Button for various purposes
    const submitBtn = document.getElementById('submit')
    const resetBtn = document.getElementById('reset')
    const nextBtn = document.getElementById('next')
    const prevBtn = document.getElementById('prev')
    // const [prevState, setPrevState] =  = 


    //Variables for manipulation and navigation of the questions
    let visited = new Array(quizData.length).fill(0)
    let selector = new Array(NoOfQuestions).fill(0)
    let answerList = new Array(NoOfQuestions).fill('n')
    let correctIncorrect = new Array(NoOfQuestions).fill(0)
    let currentQuiz = 0
    let correctscore = 0
    var count = 0;

    //This function selects the questions from a pool of n number of questions stored in the .json file
    QuestionSelector()
    function QuestionSelector() {
        let i = 0
        while (i < NoOfQuestions) {
            let x = Math.floor(Math.random() * quizData.length);
            if (visited[x] === 0) {
                selector[i] = x;
                visited[x] = 1;
                i++;
            }
        }
        console.log(selector)
    }

    //Used to display the questions on the screen
    loadQuiz()
    function loadQuiz() {
        if (count === 0) {
            document.getElementById('prev').setAttribute("disabled", "");
            document.getElementById('prev').removeAttribute("enabled", "");
        }
        else if (count > 0) {
            document.getElementById('prev').setAttribute("enabled", "");
            document.getElementById('prev').removeAttribute("disabled", "");
        }
        if (answerList[count] === 'n')
            deselectAnswers()
        else
            document.getElementById(answerList[count]).checked = true;
        currentQuiz = selector[count];

        document.getElementById("qno").innerHTML = (count + 1);
        const currentQuizData = quizData[currentQuiz]
        questionEl.innerText = currentQuizData.question
        a_text.innerText = currentQuizData.a
        b_text.innerText = currentQuizData.b
        c_text.innerText = currentQuizData.c
        d_text.innerText = currentQuizData.d
    }

    //function to deselect all the options.
    function deselectAnswers() {
        answerEls.forEach(answerEl => answerEl.checked = false)
    }

    //This is used to select the option that the user clicks
    function getSelected() {
        let answer
        let flag = 0
        answerEls.forEach(answerEl => {
            if (answerEl.checked) {
                answer = answerEl.id
                flag = 1
            }
        })
        if (flag === 1)
            return answer
        else
            return 'n'
    }


    //For looping through the questions
    function updateQ() {
        if (count < NoOfQuestions) {
            loadQuiz()
        }
    }

    //This function adds the functionality to the submit button
    submitBtn.addEventListener('click', onSubmit)
    function onSubmit() {
        console.log(answerList)
        if (window.confirm("Do you want to Submit the quiz?") === true) {
            calculateMarks()
            clearInterval(timerID);
            localStorage.removeItem('saved_timer');
            // closeNav();
            SubmitResult()
        }
    }

    //Adds functionality to the next button
    nextBtn.addEventListener('click', onNext)
    function onNext() {
        answerList[count] = getSelected()
        if (count === NoOfQuestions - 1)
            count = 0;
        else
            count++;
        updateQ()
        console.log(answerList)
    }

    //Adds functionality to the previous button
    prevBtn.addEventListener('click', onPrev)
    function onPrev() {
        answerList[count] = getSelected()
        count--;
        updateQ()
        console.log(answerList)
    }

    //Adds functionality to the reset button
    resetBtn.addEventListener('click', onReset)
    function onReset() {
        deselectAnswers()
    }

    //For calculating the marks obtained by the user
    function calculateMarks() {
        for (let i = 0; i < answerList.length; i++) {
            if (answerList[i] === quizData[selector[i]].correct) {
                correctIncorrect[i] = 4;
                correctscore += 4;
            }
            else if (answerList[i] === 'n') {
                correctIncorrect[i] = 0;
                correctscore += 0;
            }
            else {
                correctIncorrect[i] = -1;
                correctscore--;
            }
        }
    }
    console.log("Backend goes here");
}