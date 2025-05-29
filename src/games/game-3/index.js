import { createButton } from '../../components/button'

import palisadeGateImg from '../../assets/game-3/palisade_gate.png'
import stoneGateImg from '../../assets/game-3/stone_gate.png'
import relicImg from '../../assets/game-3/relic.png'

import './styles.css'

export function createGame3() {
  const section__element = document.createElement('section')

  section__element.innerHTML = `
    <div id="game_3">
      <div class="header">
        <h2>Pra ganhar, é preciso coragem!<h2>
      </div>
      
      <div id="main">
        <p>Escolhas os portões corretos para ganhar</p>
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
  const correctGate = Math.floor(Math.random() * 3) + 1
  const main__element = document.getElementById('main')

  if (correctGate === value) {
   createGates({ handleClick: handleRound2, round: '2' })
  } else {
    const p__element = document.createElement('p')
    p__element.innerText = `PERDEU`
    main__element.innerHTML = ''
    main__element.append(p__element, createButton({ text: 'Jogar novamente', handleClick: handleStart }))
  }
}

function handleRound2(value) {
  const correctGate = Math.floor(Math.random() * 3) + 1
  const main__element = document.getElementById('main')

  if (correctGate === value) {
    createGates({ handleClick: handleRound3, round: '3' })
  } else {
    const p__element = document.createElement('p')
    p__element.innerText = `PERDEU`
    main__element.innerHTML = ''
    main__element.append(p__element, createButton({ text: 'Jogar novamente', handleClick: handleStart }))
  }
}

function handleRound3(value) {
  const correctGate = Math.floor(Math.random() * 3) + 1
  const main__element = document.getElementById('main')

  if (correctGate === value) {
    const p__element = document.createElement('p')
    p__element.innerText = `VENCEU`
    main__element.innerHTML = ''
    main__element.append(p__element, createButton({ text: 'Jogar novamente', handleClick: handleStart }))
  } else {
    const p__element = document.createElement('p')
    p__element.innerText = `PERDEU`
    main__element.innerHTML = ''
    main__element.append(p__element, createButton({ text: 'Jogar novamente', handleClick: handleStart }))
  }
}

function createGates({ handleClick, round }) {
  const p__element = document.createElement('p')
  p__element.innerText = `${round}ª fase`

  const gates__element = document.createElement('div')
  gates__element.className = 'gates'

  gates__element.append(
    createButtonGate({ img: palisadeGateImg, handleClick: () => handleClick(1) }),
    createButtonGate({ img: palisadeGateImg, handleClick: () => handleClick(2) }), 
    createButtonGate({ img: palisadeGateImg, handleClick: () => handleClick(3) }),
  )

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(p__element, gates__element)
}

function createButtonGate({ img, handleClick }) {
  const button__element = document.createElement('button')
  const img__element = document.createElement('img')

  button__element.className = 'button-gate'
  img__element.className = 'button-img'

  button__element.onclick = () => handleClick()
  img__element.src = img
  button__element.appendChild(img__element)

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