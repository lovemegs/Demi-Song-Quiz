const quizArray = [
    {
        id: 1,
        question: "What song starts with the line 'You've got a face for a smile you know'?",
        answer: "World of Chances",
        options: [
            "Everything You're Not",
            "World of Chances",
            "Mistake",
            "Everytime You Lie"
        ]
    },
    {
        id: 2,
        question: "Which album features the song 'Lightweight'?",
        answer: "Unbroken",
        options: [
            "Here We Go Again",
            "Demi",
            "Unbroken",
            "Tell Me You Love Me"
        ]
    },
    {
        id: 3,
        question: "Who collaborated on the song 'Together'?",
        answer: "Jason Derulo",
        options: [
            "Jason Derulo",
            "Dev",
            "Lil Wayne",
            "Sam Smith"
        ]
    },
    {
        id: 4,
        question: "What song does the following line belong to: 'New beginnings can be lonely, thank God I got me to hold me'?",
        answer: "The Art Of Starting Over",
        options: [
            "Happy Ending",
            "Help Me",
            "Anyone",
            "The Art Of Starting Over"
        ]
    },
    {
        id: 5,
        question: "Which album features the song 'Trainwreck'?",
        answer: "Don't Forget",
        options: [
            "Unbroken",
            "Demi",
            "Don't Forget",
            "Here We Go Again"
        ]
    },
    {
        id: 6,
        question: "Which song begins with the line 'Petal on the vine, too young to drink wine'?",
        answer: "29",
        options: [
            "Wasted",
            "Lonely People",
            "California Sober",
            "29"
        ]
    },
    {
        id: 7,
        question: "What music video features Demi Lovato in all white watching herself beat herself up?",
        answer: "I Love Me",
        options: [
            "I Love Me",
            "Unbroken",
            "Confident",
            "Tell Me You Love Me"
        ]
    },
    {
        id: 8,
        question: "What single is about Demi Lovato losing her sobriety?",
        answer: "Sober",
        options: [
            "Wasted",
            "Anyone",
            "Sober",
            "Dancing With The Devil"
        ]
    },
    {
        id: 9,
        question: "What Year was the Holy Fvck album released?",
        answer: "2022",
        options: [
            "2021",
            "2023",
            "2020",
            "2022"
        ]
    },
    {
        id: 10,
        question: "How many studio albums does Demi Lovato have, including her remix album?",
        answer: "9",
        options: [
            "10",
            "6",
            "9",
            "8"
        ]
    },
]
// References
const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quizContainer');
const rulesContainer = document.querySelector('.rules-container');
const cancelButton = document.querySelector('.cancel-btn');
const continueButton = document.querySelector('.continue-btn');
const nextButton = document.querySelector('.next-btn');
const questionElement = document.querySelector('.question');
const answerButtons = document.querySelector('.answerButtons');
const scoreContainer = document.querySelector('.scoreContainer');
const scoreElement = document.querySelector('.score');
const resetButton = document.querySelector('.resetButton');

let currentQuestionIndex = 0;
let score = 0;

// randomly sorts the array
const randomQuestion = quizArray.sort(() => 0.5 - Math.random());

// Makes the start button function and shows the quiz info
const showQuizInfo = () => {
    startButton.addEventListener('click', () => {
        startButton.classList.add('hide');
        rulesContainer.classList.remove('hide');
    })
}
// Makes the continue button function and starts the quiz
const startQuiz = () => {
    continueButton.addEventListener('click', () => {
        rulesContainer.classList.add('hide');
        quizContainer.classList.remove('hide');
        getQuestions();
    })
}
// Makes the cancel button function and shows the start screen again
const cancelQuiz = () => {
    cancelButton.addEventListener('click', () => {
        rulesContainer.classList.add('hide');
        startButton.classList.remove('hide');
    })
}

// Function to get the questions and options
const getQuestions = () => {
    resetState();
    // gets the first question
    let currentQuestion = randomQuestion[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;

    // creates an h2 element and assigns the first question to it and displays to the webpage
    let question = document.createElement('h2');
    question.innerHTML = questionNumber + '. ' + currentQuestion.question;
    questionElement.appendChild(question);

    // Gets each option from the array and puts it in it's own button element and displays to the webpage
    for(let i = 0; i < currentQuestion.options.length; i++) {
        let optionButton = document.createElement('button');
        optionButton.innerHTML = currentQuestion.options[i];
        optionButton.classList.add('btn');
        answerButtons.appendChild(optionButton);
       
        // Makes the option buttons clickable and calls the checkAnswer function
        optionButton.addEventListener('click', checkAnswer);
    }
}

// Resets the question and options
const resetState = () => {
    while (questionElement.firstChild) {
        questionElement.removeChild(questionElement.firstChild);
    }
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// gets the next question when button is clicked
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < quizArray.length - 1) {
        currentQuestionIndex++;
        getQuestions();
        nextButton.classList.add('hide');
    } else {
        showScore();
    }
})

// Checks if the answer is correct or wrong and adds to the score if correct
const checkAnswer = (e) => {
    const userSelectedAnswer = e.target;
    // console.log(userSelectedAnswer)
    const correctAnswer = quizArray[currentQuestionIndex].answer;
    let options = document.querySelectorAll('.btn');
    console.log(correctAnswer);
    if (userSelectedAnswer.textContent === correctAnswer) {
        // userSelectedAnswer.classList.add('correct');
        score++;
    } else {
        userSelectedAnswer.classList.add('wrong');
    }
    // Loops through the option buttons and disables them once an answer is clicked
    options.forEach(option => {
        option.disabled = true;
        // Shows the correct answer if wrong answer was selected
        if (option.textContent === correctAnswer) {
            option.classList.add('correct');
        }
    })
    // Shows next button after answer is selected
    nextButton.classList.remove('hide');
}

// Shows Score screen and hides quiz and next button
const showScore = () => {
    quizContainer.classList.add('hide');
    nextButton.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerHTML = `${score} out of ${quizArray.length}`;
    // Reloads the page back to start screen
    resetButton.addEventListener('click', () => {
        window.location.reload();
    })
}

// Calls functions
showQuizInfo();
startQuiz();
cancelQuiz();