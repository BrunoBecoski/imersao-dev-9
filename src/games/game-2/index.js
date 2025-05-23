import { createButton } from '../../components/button'

import archerIconImg from '../../assets/game-2/archer_icon.png'
import skirmisherIconImg from '../../assets/game-2/skirmisher_icon.png'
import manAtArmsIconImg from '../../assets/game-2/manAtArms_icon.png'
import spearmanIconImg from '../../assets/game-2/spearman_icon.png'
import scoutCavalryIconImg from '../../assets/game-2/scoutCavalry_icon.png'

import './styles.css'

const units = new Map([
  ['archer', {
    name: 'Arqueiro',
    value: 'archer',
    img: archerIconImg,
    wins: ['manAtArms', 'spearman'],
    loses: ['skirmisher', 'scoutCavalry'],
  }],
  ['skirmisher', {
    name: 'Escaramuçador',
    value: 'skirmisher',
    img: skirmisherIconImg,
    wins: ['archer', 'spearman'],
    loses: ['manAtArms', 'scoutCavalry'],
  }],
  ['manAtArms', {
    name: 'Homem de Armas',
    value: 'manAtArms',
    img: manAtArmsIconImg,
    wins: ['skirmisher', 'spearman', 'scoutCavalry'],
    loses: ['archer'],
  }],
  ['spearman', {
    name: 'Lanceiro',
    value: 'spearman',
    img: spearmanIconImg,
    wins: ['scoutCavalry'],
    loses: ['archer', 'skirmisher', 'manAtArms'],
  }],
  ['scoutCavalry', {
    name: 'Batedor a Cavalo',
    value: 'scoutCavalry',
    img: scoutCavalryIconImg,
    wins: ['archer', 'skirmisher',],
    loses: ['manAtArms', 'spearman'],
  }],
])

export function createGame2() {
  const section__element = document.createElement('section')

  section__element.innerHTML = `
    <div id="game_2">
      <div class="header">
        <h2>Pra ganhar é preciso arriscar!!</h2>
        <div id="subtitle">Selecione uma unidade</div>
      </div>

      <div id="main"></div>
    </div>
  `

  const chooseUnits__element = document.createElement('div')
  chooseUnits__element.className = 'chooseUnits'
  chooseUnits__element.append(
    createButtonIcon({ unit: units.get('archer'), handleClick: handleChoose }),
    createButtonIcon({ unit: units.get('skirmisher'), handleClick: handleChoose }),
    createButtonIcon({ unit: units.get('manAtArms'), handleClick: handleChoose }),
    createButtonIcon({ unit: units.get('spearman'), handleClick: handleChoose }),
    createButtonIcon({ unit: units.get('scoutCavalry'), handleClick: handleChoose }),
  )
  
  section__element.querySelector('#main').appendChild(chooseUnits__element)

  return section__element
}

function handleStart() {
  const subtitle__element = document.getElementById('subtitle')
  subtitle__element.innerText = 'Selecione uma unidade'

  const chooseUnits__element = document.createElement('div')
  chooseUnits__element.className = 'chooseUnits'
  chooseUnits__element.append(
    createButtonIcon({ unit: units.get('archer'), handleClick: handleChoose }),
    createButtonIcon({ unit: units.get('skirmisher'), handleClick: handleChoose }),
    createButtonIcon({ unit: units.get('manAtArms'), handleClick: handleChoose }),
    createButtonIcon({ unit: units.get('spearman'), handleClick: handleChoose }),
    createButtonIcon({ unit: units.get('scoutCavalry'), handleClick: handleChoose }),
  )
  
  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.appendChild(chooseUnits__element)
}

function handleChoose(unit) {  
  const { name, img, wins, loses } = unit

  const play__element = createButton({ text: 'Jogar', handleClick: () => handlePlay(unit) })
  const choose__element = createButton({ text: 'Escolher outra unidade', handleClick: handleStart })
  const subtitle__element = document.getElementById('subtitle')
  subtitle__element.innerText = ''
  subtitle__element.append(play__element, choose__element)

  const unit_details__element = document.createElement('div')

  unit_details__element.className = 'unitDetails'

  unit_details__element.innerHTML = `
    <h3>
      ${name}
    </h3>

    <div class="info">
      <img class="unitImg" src="${img}" />
      
      <div class="counters">
        <div class="win">
          <h4>Ganha</h4>
          <div id="winUnits"></div>
        </div>

        <div class="lose">
          <h4>Perde</h4>
          <div id="loseUnits"></div>
        </div>
      </div>
    </div>
  `

  wins.map(win =>  {
    const { name, img } = units.get(win)

    const div__element = document.createElement('div')
    div__element.innerHTML = `
      <img src="${img}" />
      <span>${name}</span>
    `

     unit_details__element.querySelector('#winUnits').append(div__element)
  })

  loses.map(lose =>  {
    const { name, img } = units.get(lose)

    const div__element = document.createElement('div')
    div__element.innerHTML = `
      <img src="${img}" />
      <span>${name}</span>
    `
    unit_details__element.querySelector('#loseUnits').append(div__element)
  })

  const main__element = document.getElementById('main')
  main__element.innerHTML = ``
  main__element.appendChild(unit_details__element)
}

function handlePlay(unit) {
  const playerChoice = unit
  const computerChoice = Array.from(units.entries())[Math.floor(Math.random() * 5)][1]

  let  result = 'draw'

  if (playerChoice.wins.includes(computerChoice.value) && computerChoice.loses.includes(playerChoice.value)) {
    result = 'won'
  }

  if (playerChoice.loses.includes(computerChoice.value) && computerChoice.wins.includes(playerChoice.value)) {
    result = 'lost'
  }

  const subtitle__element = document.getElementById('subtitle')
  subtitle__element.innerHTML = 'Resultado'

  const result__element = document.createElement('div')
  result__element.className = 'result'

  result__element.innerHTML = `
    <h2>
      ${result === 'draw' ? 'EMPATE' : ''}
      ${result === 'won' ? 'VENCEU' : ''}
      ${result === 'lost' ? 'PERDEU' : ''}
    </h2>

    <div class="units">
      <div class="unit" data-wins=${result === 'won'}>
        <strong>${playerChoice.name}</strong>
        <span>(Você)</span>
        <img src="${playerChoice.img}" />
      </div>
      
      <div class="unit" data-wins=${result === 'lost'}>
        <strong>${computerChoice.name}</strong>
        <span>(Computador)</span>
        <img src="${computerChoice.img}" title="${computerChoice.name}"/>
      </div>
    </div>
  `

  const replay__element = createButton({ text: 'Jogar novamente', handleClick: handleStart })
  result__element.appendChild(replay__element)

  const main__element = document.getElementById('main')
  main__element.innerHTML = ``
  main__element.appendChild(result__element)
}

function createButtonIcon({ unit, handleClick }) {
  const { name, img } = unit

  const buttonIcon__element = document.createElement('button')
  const img__element = document.createElement('img')
  const span__element = document.createElement('span')

  buttonIcon__element.title = `Selecionar ${name}`
  buttonIcon__element.className = 'button-icon'
  buttonIcon__element.onclick = () => handleClick(unit)

  img__element.src = img
  span__element.innerText = name

  buttonIcon__element.append(img__element, span__element)

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