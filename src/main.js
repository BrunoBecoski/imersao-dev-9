import { createHeader } from './components/header';
import { createFooter } from './components/footer';
import { createGame1 } from './games/game-1';
import './style.css';

const root_element = document.querySelector('#root')

const header__element = createHeader()
const footer__element = createFooter()

const main__element = document.createElement('main')

const game_1__element = createGame1()

main__element.appendChild(game_1__element)

root_element.append(header__element, main__element, footer__element)

// header.querySelector('#aula-2').onclick = () => {
//   main.innerHTML = `
//     <div class="container">
//       <div class="content">
//         <h2>Pra ganhar é preciso arriscar!!</h2>
//         <p>PEDRA, PAPEL ou TESOURA?</p>
//         <button>Bora jogar!</button>
//       </div>
//     </div>
//   `
//   main.querySelector('button').onclick = () => handlePlayAula2()
// }

// header.querySelector('#aula-3').onclick = () => {
//   main.innerHTML = `
//     <div class="container">
//       <div class="content">
//         <h2>Pra ganhar, é preciso coragem!</h2>
//         <p>Até mesmo para pisar em um chão feito de vidro</p>
//         <button>Bora jogar!</button>
//       </div>
//     </div>
//   `

//   main.querySelector('button').onclick = () => handlePlayAula3()
// }

// header.querySelector('#aula-4').onclick = () => {
//   main.innerHTML = `
//     <div class="container">
//       <div class="content">
//         <h2>Força ou Queda</h2>
//         <p>Escolha 3 jogadores para seu time:</p>
//         <button>Ver Resultado</button>
//       </div>
//     </div>
//   `

//   main.querySelector('button').onclick = () => handlePlayAula4()
// }

// header.querySelector('#aula-5').onclick = () => {
//   main.innerHTML = `
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
//   main.querySelector('#start').onclick = () => handlePlayAula5()
// }

// function handlePlayAula2() {
//   const age = prompt("Quantos anos você tem?") 

//   if (age < 18) {
//     alert('Você NÃO pode jogar jokenpo')
//   } else {
//     const playerChoice = prompt('Digite 1-Pedra, 2-Papel ou 3-Tesoura?')
//     const computerChoice = Math.floor(Math.random() * 3) + 1

//     if (playerChoice == computerChoice) {
//       alert('Empate!!')
//     }

//     if (playerChoice == 1) {
//       if (computerChoice == 2) {
//         alert('Computador venceu, escolheu papel')
//       }

//       if (computerChoice == 3) {
//         alert('Você venceu, computador escolheu tesoura')
//       }
//     }

//     if (playerChoice == 2) {
//       if (computerChoice == 1) {
//         alert('Você venceu, computador escolheu pedra')
//       }

//       if (computerChoice == 3) {
//         alert('Computador venceu, escolheu tesoura')
//       }
//     }

//     if (playerChoice == 3) {
//       if (computerChoice == 1) {
//         alert('Computador venceu, computador escolheu pedra')
//       }

//       if (computerChoice == 2) {
//         alert('Você venceu, escolheu tesoura')
//       }
//     }
//   }
// }

// function handlePlayAula3() {
//   let won = true

//   for(let round = 1; round <= 3; round++) {
//     const playerChoice = prompt(`Nível ${round}, escolha um vidro entre (1, 2, 3)?` )
//     const brokenFloor = Math.floor(Math.random() * 3) + 1
   
//     if (['1', '2', '3'].includes(playerChoice)) {
//       if (playerChoice == brokenFloor) {
//         alert('Vidro quebrou! Acabou o jogo para você.')
//         won = false
//         break
//       } else {
//         alert(`Passou! Piso quebrado estava na ponte: ${brokenFloor}.`)
//       }
//     } else {
//       round--
//       alert('Escolha inválida')
//     }
//   }

//   if (won == true) {
//     alert('Parabéns você venceu!')    
//   }
// }

// function handlePlayAula4() {
//   const characters = []
//   const villains = []

//   let charactersForce = 0
//   let villainsForce = 0
  
//   for(let i = 0; i < 3; i++) {
//     characters[i] = prompt(`Digite o nome do seu ${i + 1}º personagem`)
//     charactersForce += Math.floor(Math.random() * 10) + 1
//   }

//   for(let i = 0; i < 3; i++) {
//     const randomIndex = Math.floor(Math.random() * 6)
//     const possibleVillains = [
//       'Nazaré Tedesco',
//       'Odete Roitman',
//       'Flora',
//       'Carminha',
//       'Laura Prudente da Costa ',
//       'Bia Falcão',
//     ]

//     villains[i] = possibleVillains[randomIndex] 
//     villainsForce += Math.floor(Math.random() * 10) + 1
//   }

//   if (charactersForce > villainsForce) {
//     alert('Seu time é muito forte! Você ganhou a disputa de cabo de guerra! Sua força foi de: ' + charactersForce)
//   } else {
//     if (charactersForce < villainsForce) {
//       alert('Seu time é fraquinho. O computador ganhou o cabo de guerra com força de: ' + villainsForce)
//     } else {
//       alert('Os dois times tem a mesma força! Vocês empataram com a força de: ' + charactersForce)
//     }
//   }
// }

// function handlePlayAula5() {
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