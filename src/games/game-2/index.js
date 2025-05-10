import './styles.css'
 
import { createButton } from '../../components/button'

export function createGame2() {
  const section__element = document.createElement('section')

  section__element.innerHTML = `
    <div id="game_2">
      <h2>Pra ganhar é preciso arriscar!!</h2>
      <p>Arqueiro, Escaramuçador, Homem de Armas, Lanceiro ou Batedor a Cavalo?</p>
      <div class="choices"></div>
    </div>
  `

  const button_archer__element = createButton({ text: 'Arqueiro', handleClick: () => handlePlay('archer') })
  const button_skirmisher__element = createButton({ text: 'Escaramuçador', handleClick: () => handlePlay('skirmisher') })
  const button_manAtArms__element = createButton({ text: 'Homem de Armas', handleClick: () => handlePlay('manAtArms') })
  const button_spearman__element = createButton({ text: 'Lanceiro', handleClick: () => handlePlay('spearman') })
  const button_scoutCavalry__element = createButton({ text: 'Batedor a Cavalo', handleClick: () => handlePlay('scoutCavalry') })

  section__element.getElementsByClassName('choices')[0].append(
    button_archer__element,
    button_skirmisher__element,
    button_manAtArms__element,
    button_spearman__element,
    button_scoutCavalry__element,
  )

  return section__element
}

function handlePlay(unite) {
  console.log('Unidade: ' + unite) 
}





// export function createGame2() {
//   const section__element = document.createElement('section')
  
//   section__element.innerHTML = `
//     <div class="container">
//       <div class="content">
//         <h2>Pra ganhar é preciso arriscar!!</h2>
//         <p>PEDRA, PAPEL ou TESOURA?</p>
//         <button>Bora jogar!</button>
//       </div>
//     </div>
//   `

//   section__element.querySelector('button').onclick = () => handlePlay()

//   return section__element
// }

// function handlePlay() {
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