import archerIconImg from '../../assets/game-2/archer_icon.png'
import skirmisherIconImg from '../../assets/game-2/skirmisher_icon.png'
import manAtArmsIconImg from '../../assets/game-2/manAtArms_icon.png'
import spearmanIconImg from '../../assets/game-2/spearman_icon.png'
import scoutCavalryIconImg from '../../assets/game-2/scoutCavalry_icon.png'

import './styles.css'

const units = [
  {
    name: 'Arqueiro',
    value: 'archer',
    img: archerIconImg,
    wins: ['manAtArms', 'spearman'],
    loses: ['skirmisher', 'scoutCavalry']
  },
   {
    name: 'Escaramuçador',
    value: 'skirmisher',
    img: skirmisherIconImg,
    wins: ['archer', 'spearman'],
    loses: ['manAtArms', 'scoutCavalry']
  },
   {
    name: 'Homem de Armas',
    value: 'manAtArms',
    img: manAtArmsIconImg,
    wins: ['skirmisher', 'spearman', 'scoutCavalry'],
    loses: ['archer']
  },
   {
    name: 'Lanceiro',
    value: 'spearman',
    img: spearmanIconImg,
    wins: ['scoutCavalry'],
    loses: ['archer', 'skirmisher', 'manAtArms']
  },
   {
    name: 'Batedor a Cavalo',
    value: 'scoutCavalry',
    img: scoutCavalryIconImg,
    wins: ['archer', 'skirmisher',],
    loses: ['manAtArms', 'spearman']
  },
]

export function createGame2() {
  const section__element = document.createElement('section')

  section__element.innerHTML = `
    <div id="game_2">
      <div class="header">
        <h2>Pra ganhar é preciso arriscar!!</h2>
        <p>Escolha uma unidade para batalhar contra o computador</p>
      </div>
      <div id="info"></div>
      <div id="buttons"></div>
      <div id="select"></div>
      <div id="result"></div>
    </div>
  `

  section__element.querySelector('#buttons').append(
    createButtonIcon({ unit: units[0], handleClick: () => handlePlay('archer') }),
    createButtonIcon({ unit: units[1], handleClick: () => handlePlay('skirmisher') }),
    createButtonIcon({ unit: units[2], handleClick: () => handlePlay('manAtArms') }),
    createButtonIcon({ unit: units[3], handleClick: () => handlePlay('spearman') }),
    createButtonIcon({ unit: units[4], handleClick: () => handlePlay('scoutCavalry') }),
  )

  return section__element
}

// function handleChoose(unit) {
//   const { img } = unit

//   const buttons__element = document.getElementById('buttons')
//   buttons__element.dataset.unit = unit.value

//   const img__element = document.createElement('img')
//   img__element.src = img
  
//   const select__element = document.getElementById('select')
//   select__element.appendChild(img__element)
// }

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
  
  const result__element = document.getElementById('result')

  result__element.innerHTML = `
    <h2>${playerChoice} VS ${computerChoice}</h2>
    <h1>
      ${result === 'draw' ? 'EMPATE' : ''}
      ${result === 'won' ? 'VENCEU' : ''}
      ${result === 'lost' ? 'PERDEU' : ''}
    </h1>
  `
}

function showInformation(unit) {
  const info__element = document.getElementById('info')

  const winsFrom__element = document.createElement('span')
  winsFrom__element .className = 'wins'

  const losesFrom__element  = document.createElement('span')
  losesFrom__element.className = 'loses'

  switch (unit) {
    case 'archer':
      winsFrom__element .innerText = '+ Homem de Armas | Lanceiro'
      losesFrom__element.innerText = '- Escaramuçador | Batedor a Cavalo'
      break;

    case 'skirmisher':
      winsFrom__element .innerText = '+ Arqueiro | Lanceiro'
      losesFrom__element.innerText = '- Homem de Armas  | Batedor a Cavalo'
      break;

    case 'manAtArms':
      winsFrom__element .innerText = '+ Escaramuçador | Lanceiro | Batedor a Cavalo'
      losesFrom__element.innerText = '- Arqueiro'
      break;

    case 'spearman':
      winsFrom__element .innerText = '+ Batedor a Cavalo'
      losesFrom__element.innerText = '- Escaramuçador | Arqueiro | Homem de Armas'
      break;

    case 'scoutCavalry':
      winsFrom__element .innerText = '+ Escaramuçador | Arqueiro'
      losesFrom__element.innerText = '- Homem de Armas | Lanceiro'
  
    default:
      break;
  }

  info__element.append(winsFrom__element, losesFrom__element)
}

function hiddenInformation() {
  const info__element = document.getElementById('info')

  info__element.innerHTML = ''
}

export function createButtonIcon({ unit, handleClick }) {
  const { name, value, img } = unit

  const buttonIcon__element = document.createElement('button')
  const img__element = document.createElement('img')
  const span__element = document.createElement('span')
  
  buttonIcon__element.className = 'button-icon'
  buttonIcon__element.onclick = () => handleClick()
  buttonIcon__element.addEventListener('mouseover', () => showInformation(value))
  buttonIcon__element.addEventListener('mouseout', () => hiddenInformation())
  img__element.src = img
  span__element.innerText = name

  buttonIcon__element.append(img__element, span__element )

  return buttonIcon__element
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