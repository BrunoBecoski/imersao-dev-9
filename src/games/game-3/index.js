import { createButton } from '../../components/button'

import gateCloseImg from '../../assets/game-3/gate_close.png'
import gateOpenImg from '../../assets/game-3/gate_open.png'
import relicImg from '../../assets/game-3/relic.png'

import './styles.css'

export function createGame3() {
  const section__element = document.createElement('section')

  section__element.innerHTML = `
    <div id="game_3">
      <div id="header">
        <h2>Pra ganhar, é preciso coragem!<h2>
      </div>
      
      <div id="main">
        <p>Conseguira chegar até final</p>
      </div>
    </div>
  `

  const main__element = section__element.querySelector('#main')
  main__element.append(createButton({ text: 'Começar', handleClick: handleStart }))

  return section__element
}

function handleStart() {
  createGates({ handleClick: handleRound1, round: '1' })
}

function handleRound1(value) {
  if (Math.floor(Math.random() * 3) + 1) {
   createGates({ handleClick: handleRound2, round: '2' })
  } else {
    lose()
  }
}

function handleRound2(value) {
  if (Math.floor(Math.random() * 3) + 1 === value) {
    createGates({ handleClick: handleRound3, round: '3' })
  } else {
    lose()
  }
}

function handleRound3(value) {
  if (Math.floor(Math.random() * 3) + 1 === value) {
    win()
  } else {
    lose()
  }
}

function win() {
  const main__element = document.getElementById('main')
  const h2__element = document.querySelector('#header h2')
  const img__element = document.createElement('img')

  h2__element.innerText = 'VENCEU'
  img__element.src = relicImg
  main__element.innerHTML = ''
  main__element.append(img__element, createButton({ text: 'Jogar novamente', handleClick: handleStart }))
}

function lose() {
  const main__element = document.getElementById('main')
  const h2__element = document.querySelector('#header h2')

  h2__element.innerText = 'PERDEU'
  main__element.innerHTML = ''
  main__element.appendChild(createButton({ text: 'Jogar novamente', handleClick: handleStart }))
}

function createGates({ handleClick, round, img }) {
  const h2__element = document.querySelector('#header h2')
  h2__element.innerText = `${round}ª fase`

  const p__element = document.createElement('p')
  p__element.innerText = 'Escolha os portão correto para avançar'

  const gates__element = document.createElement('div')
  gates__element.className = 'gates'

  gates__element.append(
    createButtonGate({ img, handleClick: () => handleClick(1) }),
    createButtonGate({ img, handleClick: () => handleClick(2) }), 
    createButtonGate({ img, handleClick: () => handleClick(3) }),
  )

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(p__element, gates__element)
}

function createButtonGate({ handleClick }) {
  const button__element = document.createElement('button')
  const img__element = document.createElement('img')

  button__element.className = 'button-gate'
  img__element.className = 'button-img'

  button__element.onclick = () => handleClick()
  img__element.src = gateCloseImg
  button__element.appendChild(img__element)

  button__element.addEventListener('mouseover', () => {
    img__element.src = gateOpenImg
  })

  button__element.addEventListener('mouseout', () => {
    img__element.src = gateCloseImg
  })

  return button__element
}





// export function createGame3() {
//   const section__element = document.createElement('section')
  
//   section__element.innerHTML = `
//     <div class="container">
//       <div class="content">
//         <h2>Pra ganhar, é preciso coragem!</h2>
//         <p>Até mesmo para pisar em um chão feito de vidro</p>
//         <button>Bora jogar!</button>
//       </div>
//     </div>
//   `

//   section__element.querySelector('button').onclick = () => handlePlay()

//   return section__element
// }

// function handlePlay() {
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