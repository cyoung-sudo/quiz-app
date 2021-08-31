const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btns')
const scoreElement = document.getElementById('score')
const headerElement = document.getElementById('header')

let shuffledQuestions, currentQuestionIndex
let score = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
	currentQuestionIndex++
	setNextQuestion()
})

function startGame() {
	// Hide elements
	startButton.classList.add('hide')
	headerElement.classList.add('hide')
	// Reset and show current score
	score = 0
	scoreElement.innerText = "Score: " + score + "/" + questions.length
	scoreElement.classList.remove('hide')
	// Reset and shuffle questions
	currentQuestionIndex = 0
	shuffledQuestions = questions.sort(() => Math.random() - 0.5)
	// Show questions
	questionContainerElement.classList.remove('hide')
	setNextQuestion()
}

function setNextQuestion() {
	resetState()
	showQuestion(shuffledQuestions[currentQuestionIndex])
}

function resetState() {
	// Hide "next" button
	nextButton.classList.add('hide')
	// Reset body background color
	document.body.classList.add('neutral')
	document.body.classList.remove('correct')
	document.body.classList.remove('wrong')
	// Remove all previous answers
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	}
}

function showQuestion(question) {
	// Update question
	questionElement.innerText = question.question
	// Create button for each answer
	question.answers.forEach(answer => {
		const button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('btn')
		if(answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
	})
}

function selectAnswer(e) {
	const selectedButton = e.target
	const correct = selectedButton.dataset.correct
	// Update score if correct
	if(correct) {
		score++;
		scoreElement.innerText = "Score: " + score + "/" + questions.length
	}
	// Update body background color
	document.body.classList.remove('neutral')
	setStatusClass(document.body, correct)
	// Update button background colors
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})
	// Show "next" or "restart" button
	if(shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide')
	} else {
		startButton.innerText = 'Restart'
		startButton.classList.remove('hide')
	}
}

// Set background color of element
function setStatusClass(element, correct) {
	if(correct) {
		element.classList.add('correct')
	} else {
		element.classList.add('wrong')
	}
}

// Questions array
const questions = [
	{
		question: 'Which isn\'t a programming language?',
		answers: [
			{ text: 'Java', correct: false },
			{ text: 'Type', correct: true },
			{ text: 'Ruby', correct: false },
			{ text: 'Python', correct: false }
		]
	},
	{
		question: 'A sequence of steps that must be taken to perform a task is called a(n)...',
		answers: [
			{ text: 'Algorithm', correct: true },
			{ text: 'Loop', correct: false },
			{ text: 'Paragraph', correct: false },
			{ text: 'Protocol', correct: false }
		]
	},
	{
		question: 'An object can have...',
		answers: [
			{ text: 'Definition', correct: false },
			{ text: 'Logic', correct: false },
			{ text: 'Code', correct: false },
			{ text: 'Properties', correct: true }
		]
	},
	{
		question: 'The only language a computer can understand is...',
		answers: [
			{ text: 'Tech Language', correct: false },
			{ text: 'Coding Language', correct: false },
			{ text: 'English', correct: false },
			{ text: 'Machine Language', correct: true }
		]
	},
	{
		question: 'Machine Language instrutions are written in...',
		answers: [
			{ text: 'Logic', correct: false },
			{ text: 'C++', correct: false },
			{ text: 'Binary', correct: true },
			{ text: 'Trinary', correct: false }
		]
	},
	{
		question: 'Which of the following is a comparison operator?',
		answers: [
			{ text: '>', correct: true },
			{ text: '@', correct: false },
			{ text: '*', correct: false },
			{ text: '^', correct: false }
		]
	},
	{
		question: '8 % 3 = __?',
		answers: [
			{ text: '5', correct: false },
			{ text: '3', correct: false },
			{ text: '2', correct: true },
			{ text: '8', correct: false }
		]
	},
	{
		question: 'Resolving errors in a program is known as...',
		answers: [
			{ text: 'Discussing', correct: false },
			{ text: 'Brainstorming', correct: false },
			{ text: 'Problem Solving', correct: false },
			{ text: 'Debugging', correct: true }
		]
	},
	{
		question: 'Which of the following isn\'t a high-level programming language?',
		answers: [
			{ text: 'Javascript', correct: false },
			{ text: 'Java', correct: false },
			{ text: 'Ruby', correct: false },
			{ text: 'Machine Language', correct: true }
		]
	},
	{
		question: 'OOP stands for...',
		answers: [
			{ text: 'Object Oriented Programming', correct: true },
			{ text: 'Only Objects Programming', correct: false },
			{ text: 'Overall Oriented Programming', correct: false },
			{ text: 'Object Oriented Path', correct: false }
		]
	}

]