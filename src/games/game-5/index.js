import { createButton } from '../../components/button';
import './styles.css';

export function createGame5() {
  const section__element = document.createElement('section')

  section__element.innerHTML = `
    <div id="game-5">
      <div class="header">
        <h2 id="title">Perguntas</h2>
      </div>

      <div id="main"></div>
    </div>
  `

  const main__element = section__element.querySelector('#main')
  main__element.appendChild(createButton({ text: 'Começar', handleClick: handleStart }))

  return section__element
}

function handleStart() {
  const progress__element = document.createElement('span')
  progress__element.id = 'progress'

  progress__element.innerText = `1/${questions.length}`

  const question__element = document.createElement('h3')
  question__element.id = 'question'
  
  const options__element = document.createElement('ol')
  options__element.id = 'options'
  
  const question = questions[Math.floor(Math.random() * 4)]
    
  question__element.innerText = question.question

  options__element.append(...Array.from(createOptions(question.answers)))
  
  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(progress__element, question__element, options__element)
}

function createOptions(answers) {
  const correctAnswer = answers.splice(answers.find(answer => answer.correct === true), 1)
  const shuffledArray = randomArray(answers, 2)
  const correctAnswerPosition = Math.floor(Math.random() * 3)

  shuffledArray.splice(correctAnswerPosition, 0, ...correctAnswer)

  return shuffledArray.map((answer) => createOption(answer)) 
}

function createOption(answer) {
  const { option, correct } = answer

  const li__element = document.createElement('li')
  const button__element = document.createElement('button')

  button__element.innerText = option
  button__element.className = 'option'
  button__element.addEventListener('click', () => correct ? console.log('ACERTOU') : console.log('ERROU'))

  li__element.append(button__element)

  return li__element
}

function randomArray(array, quantity) {
  let shuffledArray = []
  let length = array.length
  let index
  
  while (quantity) {
    index = Math.floor(Math.random() * length--);

    shuffledArray.push(array.splice(index, 1)[0]);

    quantity--
  }

  return shuffledArray
}

const questions = [
  {
    question: "Em que ano foi lançado o Age of Empires II?",
    answers: [
      { option: "1996", correct: false },
      { option: "1997", correct: false },
      { option: "1998", correct: false },
      { option: "1999", correct: true },
      { option: "2000", correct: false },
    ]
  }, {
    question: "Que quem a história do tutorial?",
    answers: [
      { option: "William Wallace", correct: true },
      { option: "Joana D'Arc", correct: false },
      { option: "Gengis Khan", correct: false },
      { option: "Saladino", correct: false },
      { option: "Barbarossa", correct: false },
    ],
  },{
    question: "Qual edifício a relíquia é guarnecida?",
    answers: [
      { option: "Castelo", correct: false },
      { option: "Monastério", correct: true },
      { option: "Universidade", correct: false },
      { option: "Centro da Cidade", correct: false },
      { option: "Maravilha", correct: false },
    ],
  },{
    question: "O que é gerado pela relíquia guarnecida?",
    answers: [
      { option: "Ouro", correct: true },
      { option: "Comida", correct: false },
      { option: "Madeira", correct: false },
      { option: "Pedra", correct: false },
      { option: "Pontos", correct: false },
    ],
  question: "Qual é o edifico que produz aldeãos?",
    answers: [
      { option: "Casa", correct: false },
      { option: "Mercado", correct: false },
      { option: "Universidade", correct: false },
      { option: "Centro da Cidade", correct: true },
      { option: "Monastério", correct: false },
    ],
  }
]





// export function createGame5() {
//   const section__element = document.createElement('section')
  
//   section__element.innerHTML = `
//     <div class="container">
//       <div class="content">
//         <button id="start">Começar</button>
//         <div class="titulo">
//           <h2>Perguntas Finais</h2>
//         </div>
        
//         <body>
//           <div class="conteudo-jogo">
//             <section class="questionario">
//               <div class="conteudo">
//                 <span class="progresso"></span>
//                 <span class="pergunta"></span>
//                 <div class="respostas"></div>
//               </div>

//               <div class="fim">
//                 <span></span>
//               </div>
//             </section>
//           </div>
//         </body>
//       </div>
//     </div>
//   `

//   section__element.querySelector('button').onclick = () => handlePlay()

//   return section__element
// }

// function handlePlay() {


//   const questions = [
//     { 
//       "question": "Qual o principal Pokémon do Ash?",
//       "answers": [
//         { "option": "Pikachu", "correct": true },
//         { "option": "Bulbassauro", "correct": false },
//         { "option": "Squirtle", "correct": false },
//       ]
//     },
//     { 
//       "question": "Qual é o nome da equipe de vilões mais famosa da série Pokémon?",
//       "answers": [
//         { "option": "Equipe Rocket", "correct": true },
//         { "option": "Equipe Aqua", "correct": false },
//         { "option": "Equipe Magma", "correct": false },
//       ]
//     }
//   ]

//   const questionElement = document.querySelector('.pergunta')
//   const answerElement = document.querySelector('.respostas')
//   const progressElement = document.querySelector('.progresso')
//   const finalText = document.querySelector('.fim span')
//   const content = document.querySelector('.conteudo')
//   const finalContent = document.querySelector('.fim')

//   content.style.display = 'flex'
//   finalContent.style.display = 'none'

//   let currentIndex = 0
//   let hits = 0

//   function loadQuestion() {
//     progressElement.innerHTML = `${currentIndex + 1}/${questions.length}`
//     const currentQuestion = questions[currentIndex]
//     questionElement.innerHTML = currentQuestion.question

//     answerElement.innerHTML = ''


//     for (let i = 0; i < currentQuestion.answers.length; i++) {
//       const answer = currentQuestion.answers[i]
//       const button = document.createElement('button')

//       button.classList.add('botao-resposta')
//       button.innerText = answer.option
//       button.onclick = function () {

//         if (answer.correct) {
//           hits++
//         }

//         currentIndex++

//         if (currentIndex < questions.length) {
//           loadQuestion()
//         } else {
//           endGame()
//         }
//       }

//       answerElement.appendChild(button)
//     }
//   }

//   function endGame() {
//     finalText.innerHTML = `Você acertou ${hits} de ${questions.length}`
//     content.style.display = 'none'
//     finalContent.style.display = 'flex'
//   }

//   loadQuestion()
// }