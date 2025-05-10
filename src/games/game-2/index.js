import './styles.css'
 
import { createButton } from '../../components/button'

export function createGame2() {
  const section__element = document.createElement('section')

  section__element.innerHTML = `
    <div id="game_2">
      <h2>Pra ganhar é preciso arriscar!!</h2>
      <p>Arqueiro, Escaramuçador, Homem de Armas, Lanceiro ou Batedor a Cavalo?</p>
      <div class="choices"></div>
      <span id="result"></span>
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

function handlePlay(unit) {
  const units = [
    'archer',
    'skirmisher',
    'manAtArms',
    'spearman',
    'scoutCavalry',
  ]

  const playerChoice = unit
  const computerChoice = units[Math.floor(Math.random() * 5)]
  
  const result = (() => {
    switch (playerChoice) {
      case 'archer':
        switch (computerChoice) {
          case 'archer': return 'draw'
          case 'skirmisher': return 'lost'
          case 'manAtArms': return 'won'
          case 'spearman': return 'won'
          case 'scoutCavalry': return 'lost'
          default: return 'draw'
        }

      case 'skirmisher':
        switch (computerChoice) {
          case 'archer': return 'won'
          case 'skirmisher': return 'draw'
          case 'manAtArms': return 'lost'
          case 'spearman': return 'won'
          case 'scoutCavalry': return 'lost'
          default: return 'draw'
        }

      case 'manAtArms':
        switch (computerChoice) {
          case 'archer': return 'lost'
          case 'skirmisher': return 'won'
          case 'manAtArms': return 'draw'
          case 'spearman': return 'won'
          case 'scoutCavalry': return 'won'
          default: return 'draw'
        }

      case 'spearman':
        switch (computerChoice) {
          case 'archer': return 'lost'
          case 'skirmisher': return 'lost'
          case 'manAtArms': return 'lost'
          case 'spearman': return 'draw'
          case 'scoutCavalry': return 'won'
          default: return 'draw'
        }
      
      case 'scoutCavalry':
        switch (computerChoice) {
          case 'archer': return 'won'
          case 'skirmisher': return 'won'
          case 'manAtArms': return 'lost'
          case 'spearman': return 'lost'
          case 'scoutCavalry': return 'draw'
        }

      default: return 'draw'
    }
  })();
  
  const span__element =  document.getElementById('result')

  span__element.innerHTML = `
    <h2>${playerChoice} VS ${computerChoice}</h2>
    <h1>
      ${result === 'draw' ? 'EMPATE' : ''}
      ${result === 'won' ? 'VENCEU' : ''}
      ${result === 'lost' ? 'PERDEU' : ''}
    </h1>
  `
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