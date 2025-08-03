import { createButton } from '../../components/button';
import './styles.css';

const numberRounds = 5
const numberOptions = 3

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

async function handleStart() {
  const questionsArray = JSON.parse(QUESTIONS_JSON)
  let questionsSelected = []

  for (let index = 0; index < numberRounds; index++) {
    questionsSelected.push(questionsArray.splice(Math.floor(Math.random() * questionsArray.length), 1)[0])    
    const {response, options__element, correctAnswerPosition } = await createQuestion(questionsSelected)

    await showOptionResponse(response, options__element, correctAnswerPosition)

    questionsSelected[index].response = Number(response)
  }

  showResult(questionsSelected)
}

function showOptionResponse(response, options__element, correctAnswerPosition) {
  const button__element = options__element.querySelectorAll('button')[response]

  button__element.dataset.correct = Number(response) === Number(correctAnswerPosition)

  return new Promise(resolve => setTimeout(resolve, 500));
}

function showResult(questionsSelected) {
  const initialValue = 0

  const correctAnswers = questionsSelected.reduce(( accumulator, question) => {
    const { response, answers } = question

    const correct = answers.findIndex(answer => answer.correct == true)
    
    if (response === correct) {
      accumulator++
    } 

    return accumulator
  }, initialValue)

  const div__element = document.createElement('div')
  const span__element = document.createElement('span')

  div__element.className = 'result'
  span__element.innerText = `Você acertou ${correctAnswers} de ${numberRounds}`
  div__element.appendChild(span__element)

  const title__element = document.getElementById('title')
  title__element.innerText = 'Resultado'

  const showResponseButton__element = createButton({ text: 'Ver respostas', handleClick: () => handleShowResponse(questionsSelected)})
  const startButton__element = createButton({ text: 'Recomeçar', handleClick: handleStart })

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(div__element, showResponseButton__element, startButton__element)
}

async function handleShowResponse(questionsSelected) {
  let index = 0

  const title__element = document.getElementById('title')

  title__element.innerText = 'Respostas'

  const div__element = document.createElement('div')
  div__element.className = 'response'

  const question__element = document.createElement('h3')
  question__element.id = 'question'
  question__element.innerText = questionsSelected[index].question

  const progress__element = document.createElement('span')
  progress__element.id = 'progress'
  progress__element.innerText = `${index + 1}/${numberRounds}`
  const options__element = document.createElement('ol')
  options__element.id = 'options'

  options__element.append(
    ...Array.from(questionsSelected[index].answers.map((answer, i) => {
      const button__element = document.createElement('button')
      button__element.className = 'option'
      button__element.innerText = answer.option
      button__element.dataset.correct = i === questionsSelected[index].response

      return button__element
    }))
  )
  

  const backButton__element = createButton({ text: 'Voltar', handleClick: () => {
    if (index > 0) {
      index--
      document.getElementById('question').innerText = questionsSelected[index].question
      document.getElementById('progress').innerText = `${index + 1}/${numberRounds}`

      document.getElementById('options').innerHTML = ``
      document.getElementById('options').append(
        ...Array.from(questionsSelected[index].answers.map((answer, i) => {
          const button__element = document.createElement('button')
          button__element.className = 'option'
          button__element.innerText = answer.option
          button__element.dataset.correct = i === questionsSelected[index].response
          
          return button__element
        }))
      )
     }
    }})

  const nextButton__element = createButton({ text: 'Próximo', handleClick: () => {
    if (index < (numberRounds - 1)) {
      index++
      document.getElementById('question').innerText = questionsSelected[index].question
      document.getElementById('progress').innerText = `${index + 1}/${numberRounds}`
    }
    
    document.getElementById('options').innerHTML = ``
    document.getElementById('options').append(
    ...Array.from(questionsSelected[index].answers.map((answer, i) => {
      const button__element = document.createElement('button')
      button__element.className = 'option'
      button__element.innerText = answer.option
      button__element.dataset.correct = i === questionsSelected[index].response

      return button__element
    }))
  )
  }})
  
  div__element.append(backButton__element, question__element, options__element, nextButton__element)

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(progress__element, div__element, options__element)
}

async function createQuestion(questionsSelected) {
  const currentQuestion = questionsSelected[questionsSelected.length - 1]

  const progress__element = document.createElement('span')
  progress__element.id = 'progress'

  progress__element.innerText = `${questionsSelected.length}/${numberRounds}`

  const question__element = document.createElement('h3')
  question__element.id = 'question'

  question__element.innerText = currentQuestion.question

  const { answers, options__element, correctAnswerPosition } = createOptions(currentQuestion.answers)

  currentQuestion.answers = answers

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(progress__element, question__element, options__element)

  return new Promise(resolver => {
    [...options__element.querySelectorAll('button')].map(button =>
      button.addEventListener('click', (event) => {
        resolver({ response: event.target.id, options__element, correctAnswerPosition })
      })
    )
  })
}

function createOptions(answers) {
  const correctAnswer = answers.splice(answers.findIndex(answer => answer.correct == true), 1)[0]
  answers = randomArray(answers, 2)
  const correctAnswerPosition = Math.floor(Math.random() * 3)

  answers.splice(correctAnswerPosition, 0, correctAnswer)

  const options__element = document.createElement('ol')
  options__element.id = 'options'
  options__element.append(...Array.from(answers.map((answer, index) => createOption(answer, index)) ))

  return {
    answers,
    options__element,
    correctAnswerPosition,
  } 
}

function createOption(answer, index) {
  const { option } = answer

  const li__element = document.createElement('li')
  const button__element = document.createElement('button')

  button__element.innerText = option
  button__element.id = index
  button__element.className = 'option'

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

const QUESTIONS_JSON = `[
  {
    "question": "Em que ano foi lançado o Age of Empires II?",
    "answers": [
      { "option": "1996", "correct": false },
      { "option": "1997", "correct": false },
      { "option": "1998", "correct": false },
      { "option": "1999", "correct": true },
      { "option": "2000", "correct": false }
    ]
  }, {
    "question": "Que quem a história do tutorial?",
    "answers": [
      { "option": "William Wallace", "correct": true },
      { "option": "Joana D'Arc", "correct": false },
      { "option": "Gengis Khan", "correct": false },
      { "option": "Saladino", "correct": false },
      { "option": "Barbarossa", "correct": false }
    ]
  },{
    "question": "Qual edifício a relíquia é guarnecida?",
    "answers": [
      { "option": "Castelo", "correct": false },
      { "option": "Monastério", "correct": true },
      { "option": "Universidade", "correct": false },
      { "option": "Centro da Cidade", "correct": false },
      { "option": "Maravilha", "correct": false }
    ]
  },{
    "question": "O que é gerado pela relíquia guarnecida?",
    "answers": [
      { "option": "Ouro", "correct": true },
      { "option": "Comida", "correct": false },
      { "option": "Madeira", "correct": false },
      { "option": "Pedra", "correct": false },
      { "option": "Pontos", "correct": false }
    ]
  }, {
  "question": "Qual é o edifico que produz aldeãos?",
    "answers": [
      { "option": "Casa", "correct": false },
      { "option": "Mercado", "correct": false },
      { "option": "Universidade", "correct": false },
      { "option": "Centro da Cidade", "correct": true },
      { "option": "Monastério", "correct": false }
    ]
  }, {
  "question": "Qual é o edifico que produz a Unidade Única?",
    "answers": [
      { "option": "Campo de Arqueiros", "correct": false },
      { "option": "Quartel", "correct": false },
      { "option": "Estábulo", "correct": false },
      { "option": "Oficina de Cerco", "correct": false },
      { "option": "Castelo", "correct": true }
    ]
  }, {
  "question": "Qual a pesquisa que revela todas as unidades e construções inimigas?",
    "answers": [
      { "option": "Espiões/Traição", "correct": true },
      { "option": "Conscrição", "correct": false },
      { "option": "Iluminação", "correct": false },
      { "option": "Patrulha da Cidade", "correct": false },
      { "option": "Finanças", "correct": false }
    ]
  }, {
  "question": "Qual a edifico pesquisa as tecnologias que aprimorem a armadura e o ataque das unidades?",
    "answers": [
      { "option": "Quartel", "correct": false },
      { "option": "Castelo", "correct": false },
      { "option": "Estábulo", "correct": false },
      { "option": "Ferraria", "correct": true },
      { "option": "Universidade", "correct": false }
    ]
  }, {
  "question": "Qual a edifico que precisa ser construído na terra e na aguá?",
    "answers": [
      { "option": "Moinho", "correct": false },
      { "option": "Doca", "correct": true },
      { "option": "Centro da Cidade", "correct": false },
      { "option": "Fazenda", "correct": false },
      { "option": "Ferraria", "correct": false }
    ]
  }, {
  "question": "Qual a pesquisa faz as unidades treinarem mais rápido?",
    "answers": [
      { "option": "Sapadores", "correct": false },
      { "option": "Tear", "correct": false },
      { "option": "Linhagens", "correct": false },
      { "option": "Escudeiros", "correct": false },
      { "option": "Conscrição", "correct": true }
    ]
  }
]`





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