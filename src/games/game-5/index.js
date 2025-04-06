import './styles.css';

export function createGame5() {
  const section__element = document.createElement('section')
  
  section__element.innerHTML = `
    <div class="container">
      <div class="content">
        <button id="start">Começar</button>
        <div class="titulo">
          <h2>Perguntas Finais</h2>
        </div>
        
        <body>
          <div class="conteudo-jogo">
            <section class="questionario">
              <div class="conteudo">
                <span class="progresso"></span>
                <span class="pergunta"></span>
                <div class="respostas"></div>
              </div>

              <div class="fim">
                <span></span>
              </div>
            </section>
          </div>
        </body>
      </div>
    </div>
  `

  section__element.querySelector('button').onclick = () => handlePlay()

  return section__element
}

function handlePlay() {


  const questions = [
    { 
      "question": "Qual o principal Pokémon do Ash?",
      "answers": [
        { "option": "Pikachu", "correct": true },
        { "option": "Bulbassauro", "correct": false },
        { "option": "Squirtle", "correct": false },
      ]
    },
    { 
      "question": "Qual é o nome da equipe de vilões mais famosa da série Pokémon?",
      "answers": [
        { "option": "Equipe Rocket", "correct": true },
        { "option": "Equipe Aqua", "correct": false },
        { "option": "Equipe Magma", "correct": false },
      ]
    }
  ]

  const questionElement = document.querySelector('.pergunta')
  const answerElement = document.querySelector('.respostas')
  const progressElement = document.querySelector('.progresso')
  const finalText = document.querySelector('.fim span')
  const content = document.querySelector('.conteudo')
  const finalContent = document.querySelector('.fim')

  content.style.display = 'flex'
  finalContent.style.display = 'none'

  let currentIndex = 0
  let hits = 0

  function loadQuestion() {
    progressElement.innerHTML = `${currentIndex + 1}/${questions.length}`
    const currentQuestion = questions[currentIndex]
    questionElement.innerHTML = currentQuestion.question

    answerElement.innerHTML = ''


    for (let i = 0; i < currentQuestion.answers.length; i++) {
      const answer = currentQuestion.answers[i]
      const button = document.createElement('button')

      button.classList.add('botao-resposta')
      button.innerText = answer.option
      button.onclick = function () {

        if (answer.correct) {
          hits++
        }

        currentIndex++

        if (currentIndex < questions.length) {
          loadQuestion()
        } else {
          endGame()
        }
      }

      answerElement.appendChild(button)
    }
  }

  function endGame() {
    finalText.innerHTML = `Você acertou ${hits} de ${questions.length}`
    content.style.display = 'none'
    finalContent.style.display = 'flex'
  }

  loadQuestion()
}