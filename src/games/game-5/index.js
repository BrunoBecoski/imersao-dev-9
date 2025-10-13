import { createButton } from '../../components/button';
import './styles.css';

const difficulties = {
  standard: {
    rounds: 3,
    options: 2,
  },
  moderate: {
    rounds: 5,
    options: 3,
  },
  hard: {
    rounds: 7,
    options: 5,
  },
  custom: {
    rounds: 5,
    options: 3,
  }
}

export function createGame5() {
  const section__element = document.createElement('section')

  section__element.innerHTML = `
    <div id="game-5">
      <div class="header">
        <h2 id="title">Selecione a dificuldade</h2>
      </div>

      <div id="main"></div>
    </div>
  `

  const main__element = section__element.querySelector('#main')
  main__element.appendChild(createSelectDifficult())

  return section__element
}

function createSelectDifficult() {
  let difficult = 'moderate'
  
  const container__element = document.createElement('div')
  container__element.className = 'select-difficult'

  const inputsAndLabels__element = document.createElement('div')
  inputsAndLabels__element.className = 'inputs-labels'

  const ranges__element = document.createElement('div')
  ranges__element.id = 'ranges'

  inputsAndLabels__element.append(
    createInputRadio('radio-1', 'Padrão', 'standard', difficult, selectDifficult),
    createInputRadio('radio-2', 'Moderado', 'moderate', difficult, selectDifficult),
    createInputRadio('radio-3', 'Difícil', 'hard', difficult, selectDifficult),
    createInputRadio('radio-4', 'Customizar', 'custom', difficult, selectDifficult),
  )

  container__element.append(
    inputsAndLabels__element,
    ranges__element,
    createButton({ text: 'Começar', handleClick: () => handleStart(difficult) }),
  )

  return container__element

  function selectDifficult(value) {
    difficulties.custom.rounds = 5
    difficulties.custom.options = 3

    if (difficult === value) {
      return
    }

    difficult = value
    
    if (difficult == 'custom') {
      ranges__element.append(
        createInputRange('rounds', 'Perguntas', 10),
        createInputRange('options', 'Opções', 5),
      )
    } else {
      ranges__element.innerHTML = ''
    }
  }
}

async function handleStart(difficult) {
  const { rounds } = difficulties[difficult]

  const title__element = document.getElementById('title')
  title__element.innerText = `Pergunta 1/${rounds}`

  const questionsSelected = selectQuestions(difficult)

  for (let index = 0; index < rounds; index++) {
    const { response, options__element, correctAnswerPosition } = await createQuestion(questionsSelected, index, difficult)

    await showOptionResponse(response, options__element, correctAnswerPosition)

    questionsSelected[index].response = Number(response)
  }

  showResult(questionsSelected, difficult)
}

function showOptionResponse(response, options__element, correctAnswerPosition) {
  const button__element = options__element.querySelectorAll('button')[response]

  button__element.dataset.correct = Number(response) === Number(correctAnswerPosition)

  return new Promise(resolve => setTimeout(resolve, 500));
}

function showResult(questionsSelected, difficult) {
  const { rounds } = difficulties[difficult]

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
  const showResponseButton__element = createButton({ text: 'Ver respostas', handleClick: () => handleShowResponse(questionsSelected, difficult)})
  const startButton__element = createButton({ text: 'Jogar novamente', handleClick: () => {
    title__element.innerText = 'Selecione a dificuldade'
    main__element.innerHTML = ''
    main__element.appendChild(createSelectDifficult())
  } })

  span__element.innerText = `Você acertou ${correctAnswers} de ${rounds}`

  div__element.className = 'result'
  div__element.append(span__element, showResponseButton__element, startButton__element)

  const title__element = document.getElementById('title')
  title__element.innerText = 'Resultado'

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.appendChild(div__element)
}

async function handleShowResponse(questionsSelected, difficult) {
  const { rounds } = difficulties[difficult]

  let index = 0

  const title__element = document.getElementById('title')

  title__element.innerText = `Pergunta 1/${rounds}`

  const backButton__element = createButton({ text: 'Voltar', handleClick: () => {
    if (index > 0) {
      index--
      document.getElementById('question').innerText = questionsSelected[index].question
      document.getElementById('title').innerText = `Pergunta ${index + 1}/${rounds}`
      document.getElementById('options').innerHTML = ``
      document.getElementById('options').append(
        ...Array.from(createOptionsResponse(questionsSelected[index]))
      )
     }
    }})

  const nextButton__element = createButton({ text: 'Próximo', handleClick: () => {
    if (index < (rounds - 1)) {
      index++
      document.getElementById('question').innerText = questionsSelected[index].question
      document.getElementById('title').innerText = `Pergunta ${index + 1}/${rounds}`
      document.getElementById('options').innerHTML = ``
      document.getElementById('options').append(
        ...Array.from(createOptionsResponse(questionsSelected[index]))
      )
    }
  }})

  const questionAndOptions__element = createQuestionResponse(questionsSelected[index])

  const header__element = document.createElement('div')
  header__element.className = 'response-header'
  header__element.append(backButton__element,createButton({ text: 'Ver resultado', handleClick: () => showResult(questionsSelected, difficult) }), nextButton__element)

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(header__element, questionAndOptions__element)
}

function createQuestionResponse(questionSelected) {
  const question__element = document.createElement('h3')
  question__element.id = 'question'
  question__element.innerText = questionSelected.question
  
  const options__element = document.createElement('ol')
  options__element.id = 'options'
  options__element.append(...Array.from(createOptionsResponse(questionSelected)))

  const questionAndOptions__element = document.createElement('div')
  questionAndOptions__element.className = 'question-options'
  questionAndOptions__element.append(question__element, options__element)

  return questionAndOptions__element 
}

async function createQuestion(questionsSelected, index, difficult) {
  const { rounds } = difficulties[difficult]

  const currentQuestion = questionsSelected[index]

  const question__element = document.createElement('h3')
  question__element.id = 'question'
  question__element.innerText = currentQuestion.question

  const { answers, options__element, correctAnswerPosition } = createOptions(currentQuestion.answers)

  currentQuestion.answers = answers

  const title__element = document.getElementById('title')
  title__element.innerText = `Pergunta ${index + 1}/${rounds}`

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(question__element, options__element)

  return new Promise(resolver => {
    [...options__element.querySelectorAll('button')].map(button =>
      button.addEventListener('click', (event) => {
        resolver({ response: event.target.id, options__element, correctAnswerPosition })
      })
    )
  })
}

function createOptionsResponse(questionSelected) {
  return questionSelected.answers.map((answer, index) => createOption(answer, index, questionSelected.response))
}

function createOptions(answers) {
  const options__element = document.createElement('ol')
  options__element.id = 'options'
  options__element.append(...Array.from(answers.map((answer, index) => createOption(answer, index)) ))

  return {
    answers,
    options__element,
    correctAnswerPosition: answers.findIndex((answer) => answer.correct === true),
  } 
}

function createOption(answer, index, response) {
  const { option, correct } = answer

  const li__element = document.createElement('li')
  const button__element = document.createElement('button')

  button__element.className = 'option'
  button__element.innerText = option
  button__element.id = index

  if (response != undefined) {
    button__element.dataset.correct = correct
    button__element.dataset.response = index === response
    button__element.disabled = true
  }

  li__element.append(button__element)

  return li__element
}

function selectQuestions(difficult) {
  const { rounds, options } = difficulties[difficult]

  const questionsArray = JSON.parse(QUESTIONS_JSON)

  const randomQuestions = randomArray(questionsArray, rounds)

  const randomQuestionsAndAnswers = randomQuestions.map((questionAndAnswers) => {
    const { question, answers } = questionAndAnswers

    const correctAnswer = answers.splice(answers.findIndex(answer => answer.correct == true), 1)[0]
    const correctAnswerPosition = Math.floor(Math.random() * options)
    const randomAnswers = randomArray(answers, options - 1)

    randomAnswers.splice(correctAnswerPosition, 0, correctAnswer)

    return {
      question,
      answers: randomAnswers,
    }
  })
  
  return randomQuestionsAndAnswers
}

function createInputRadio(id, label, value, difficult, selectDifficult) {
  const input__element = document.createElement('input')
  const label__element = document.createElement('label')
  const div__element = document.createElement('div')

  input__element.type = 'radio'
  input__element.id = id
  input__element.name = 'difficult'
  input__element.checked = difficult === value
  input__element.addEventListener('click', () => selectDifficult(value))

  label__element.htmlFor = id
  label__element.innerText = label

  div__element.append(input__element, label__element)

  return div__element
}

function createInputRange(id, label, max) {
  const averageValue = Math.ceil(max / 2)
  
  const label__element = document.createElement('label')
  const span__element = document.createElement('span')
  const input__element = document.createElement('input')
  const div__element = document.createElement('div')
  
  label__element.htmlFor = id
  label__element.innerText = label

  span__element.id = 'value'
  span__element.innerText = averageValue

  input__element.id = id
  input__element.type = "range"
  input__element.min = 1
  input__element.max = max
  input__element.value = averageValue
  input__element.step = 1

  input__element.addEventListener('input', (event) => {
    const value = event.target.value
    
    span__element.innerText = value
    difficulties.custom[id] = value
  })

  div__element.className = 'input-range'
  div__element.append(
    label__element,
    span__element,
    input__element,
  )

  return div__element
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
      { "option": "Espiões", "correct": true },
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