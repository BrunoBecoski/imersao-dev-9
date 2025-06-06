import { createButton } from '../../components/button'

import archerIconImg from '../../assets/game-2/archer_icon.png'
import spearmanIconImg from '../../assets/game-2/spearman_icon.png'
import scoutIconImg from '../../assets/game-2/scout_icon.png'

import './styles.css'

const units = new Map([
  ['archer', {
    name: 'Arqueiro',
    value: 'archer',
    img: archerIconImg,
    win: 'spearman',
    lose: 'scout',
  }],
  ['spearman', {
    name: 'Lanceiro',
    value: 'spearman',
    img: spearmanIconImg,
    win: 'scout',
    lose: 'archer',
  }],
  ['scout', {
    name: 'Batedor',
    value: 'scout',
    img: scoutIconImg,
    win: 'archer',
    lose: 'spearman',
  }],
])

export function createGame2() {
  const section__element = document.createElement('section')

  section__element.innerHTML = `
    <div id="game_2">
      <div class="header">
        <h2 id="title">Pra ganhar é preciso arriscar!!</h2>
      </div>

      <div id="main"></div>
    </div>
  `

  const main__element =  section__element.querySelector('#main')
  main__element.appendChild(createButton({ text: 'Começar', handleClick: handleStart }))
  
  return section__element
}

function handleStart() {
  const title__element = document.getElementById('title')
  title__element.innerText = 'Selecione uma unidade'

  const chooseUnits__element = document.createElement('div')
  chooseUnits__element.className = 'chooseUnits'
  chooseUnits__element.append(
    createButtonIcon({ unit: 'archer' }),
    createButtonIcon({ unit: 'spearman' }),
    createButtonIcon({ unit: 'scout' }),
  )

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.appendChild(chooseUnits__element)
}

function handlePlay(unit) {
  const playerChoice = units.get(unit)
  const computerChoice = Array.from(units.entries())[Math.floor(Math.random() * 3)][1]

  let  result = 'draw'

  if (playerChoice.wins.includes(computerChoice.value) && computerChoice.loses.includes(playerChoice.value)) {
    result = 'won'
  }

  if (playerChoice.loses.includes(computerChoice.value) && computerChoice.wins.includes(playerChoice.value)) {
    result = 'lost'
  }

  const title__element = document.getElementById('title')
  title__element.innerHTML = 'Resultado'

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

function createButtonIcon({ unit }) {
  const { name, img, win, lose } = units.get(unit)

  const buttonIcon__element = document.createElement('button')
  const img__element = document.createElement('img')
  const name__element = document.createElement('span')
  const info__element = document.createElement('span')

  buttonIcon__element.id = unit
  buttonIcon__element.title = `Selecionar ${name}`
  buttonIcon__element.className = 'button-icon'
  buttonIcon__element.onclick = () => handlePlay(unit)

  buttonIcon__element.addEventListener('mouseover', () => {
    img__element.style.borderColor = 'yellow'

    const win__element = document.getElementById(win)
    win__element.querySelector('img').style.borderColor = 'green'
    win__element.querySelector('.info').innerText = 'Ganha'

    const lose__element = document.getElementById(lose)
    lose__element.querySelector('img').style.borderColor = 'red'
    lose__element.querySelector('.info').innerText = 'Perde'
  })


  buttonIcon__element.addEventListener('mouseout', () => {
    img__element.style.borderColor = 'white'

    const win__element = document.getElementById(win)
    win__element.querySelector('img').style.borderColor = 'white'
    win__element.querySelector('.info').innerText = ''

    const lose__element = document.getElementById(lose)
    lose__element.querySelector('img').style.borderColor = 'white'
    lose__element.querySelector('.info').innerText = ''
  })

  name__element.className = 'name'
  name__element.innerText = name
  img__element.src = img
  info__element.className = 'info'

  buttonIcon__element.append(name__element, img__element, info__element )

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