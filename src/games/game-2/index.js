import { createButton } from '../../components/button'

import archerIconImg from '../../assets/game-2/archer_icon.png'
import spearmanIconImg from '../../assets/game-2/spearman_icon.png'
import scoutIconImg from '../../assets/game-2/scout_icon.png'

import './styles.css'

const units = new Map([
  ['archer', {
    value: 'archer',
    name: 'Arqueiro',
    img: archerIconImg,
    win: 'spearman',
    lose: 'scout',
  }],
  ['spearman', {
    value: 'spearman',
    name: 'Lanceiro',
    img: spearmanIconImg,
    win: 'scout',
    lose: 'archer',
  }],
  ['scout', {
    value: 'scout',
    name: 'Cavaleiro',
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
    createButtonUnit({ unit: 'archer' }),
    createButtonUnit({ unit: 'spearman' }),
    createButtonUnit({ unit: 'scout' }),
  )

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.appendChild(chooseUnits__element)
}

function handlePlay(unit) {
  const playerChoice = units.get(unit)
  const computerChoice = Array.from(units.entries())[Math.floor(Math.random() * 3)][1]

  let playerResult = 'draw'
  let computerResult = 'draw'

  if (playerChoice.value === computerChoice.lose && playerChoice.win === computerChoice.value) {
    playerResult = 'won'
    computerResult = 'lose'
  }

  if (playerChoice.value === computerChoice.win && playerChoice.lose === computerChoice.value) {
    playerResult = 'lose'
    computerResult = 'won'
  }

  const title__element = document.getElementById('title')
  title__element.innerHTML = 'Batalhando'

  const result__element = document.createElement('div')
  result__element.className = 'result'

  result__element.innerHTML = `
    <h3 id="title-result"></h3>

    <div class="units">
      <div id="player-unit" class="unit right-animation" data-result=${playerResult}> 
        <span>Você</span>
        <div id="player-unit">
          <img src="${playerChoice.img}" />
          <span>${playerChoice.name}</span>
        </div>
      </div>
      
      <div class="unit left-animation" data-result=${computerResult}>
      <span>Computador</span>
        <div id="computer-unit">
          <img src="${computerChoice.img}" title="${computerChoice.name}"/>
          <span>${computerChoice.name}</span>
        </div>
      </div>
    </div>
  `
  
  const player_unit__element =  result__element.querySelector('#player-unit')
  const computer_unit__element =  result__element.querySelector('#computer-unit')

  setTimeout(() => {
    playerAnimation().play()
    computerAnimation().play()
  }, 500)

 
  setTimeout(() => {
    const lose__element = document.querySelector("[data-result='lose']")
    const won__element = document.querySelector("[data-result='won']")
    const draw__elements = document.querySelectorAll("[data-result='draw']")

    if(lose__element && won__element) {
      lose__element.style.filter = 'grayscale(100%)'
    }

    if (draw__elements.length === 2) {
      draw__elements[0].style.filter = 'grayscale(50%)'
      draw__elements[1].style.filter = 'grayscale(50%)'
    }

    const title__element = document.getElementById('title')
    title__element.innerText = 'Resultado'

    const title_result__element = document.getElementById('title-result')
    if (playerResult === 'draw') {
      title_result__element.innerHTML = 'EMPATE'
    } else if (playerResult === 'won') {
      title_result__element.innerHTML = 'VENCEU'
    } else if (playerResult === 'lose') {
      title_result__element.innerHTML = 'PERDEU'
    }

    const replay__element = createButton({ text: 'Jogar novamente', handleClick: handleStart })
    result__element.appendChild(replay__element)
  }, 1000)

  const main__element = document.getElementById('main')
  main__element.innerHTML = ``
  main__element.appendChild(result__element)

  function playerAnimation() {
    const keyframe = new KeyframeEffect(
      player_unit__element,
      [
        { transform: 'translateX(0)' },
        { transform: 'rotate(0deg)' },
        { transform: 'translateX(2rem)'},
        { transform: 'rotate(10deg)' },
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-10deg)'}, 
        { transform: 'rotate(0deg)' },
        { transform: 'translateX(0)' },
      ],
      { duration: 500 },
    )                             

    return new Animation(keyframe)
  }

  function computerAnimation() {
    const keyframe = new KeyframeEffect(
      computer_unit__element,
      [
        { transform: 'translateX(0)' },
        { transform: 'rotate(0deg)' },
        { transform: 'translateX(-2rem)' },
        { transform: 'rotate(-10deg)' },
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(10deg)'},
        { transform: 'rotate(0deg)' },
        { transform: 'translateX(0)' },
      ],
      { duration: 500 },
    )

    return new Animation(keyframe)
  }
}

function createButtonUnit({ unit }) {
  const { value, name, img } = units.get(unit)

  const buttonUnit__element = document.createElement('button')
  const info__element = document.createElement('span')
  const img__element = document.createElement('img')
  const name__element = document.createElement('span')

  buttonUnit__element.id = value
  buttonUnit__element.title = `Selecionar ${name}`
  buttonUnit__element.className = 'button-unit'
  buttonUnit__element.onclick = () => handlePlay(value)

  buttonUnit__element.addEventListener('mouseover', () => handleButtonUnitMouseover(value))
  buttonUnit__element.addEventListener('mouseout', () => handleButtonUnitMouseout(value))

  info__element.className = 'info'
  img__element.src = img
  name__element.className = 'name'
  name__element.innerText = name

  buttonUnit__element.append(info__element, img__element, name__element)

  return buttonUnit__element
}

function handleButtonUnitMouseover(unit) {
  const { win, lose } = units.get(unit)

  const win__element = document.getElementById(win)
  win__element.querySelector('.info').innerText = 'Ganha'
  win__element.querySelector('.info').classList.add('win')
  win__element.classList.add('win')

  const lose__element = document.getElementById(lose)
  lose__element.querySelector('.info').innerText = 'Perde'
  lose__element.querySelector('.info').classList.add('lose')
  lose__element.classList.add('lose')
}

function handleButtonUnitMouseout(unit) {
  const { win, lose } = units.get(unit)

  const win__element = document.getElementById(win)
  win__element.querySelector('.info').innerText = ''
  win__element.querySelector('.info').classList.remove('win')
  win__element.classList.remove('win')

  const lose__element = document.getElementById(lose)
  lose__element.querySelector('.info').innerText = ''
  lose__element.querySelector('.info').classList.remove('lose')
  lose__element.classList.remove('lose')
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