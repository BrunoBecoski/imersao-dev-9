import { createButton } from '../../components/button'

import relicImg from '../../assets/game-3/relic.png'
import backImg from '../../assets/game-3/back.png'
import gateImg from '../../assets/game-3/gate.png'
import frontImg from '../../assets/game-3/front.png'

import './styles.css'

const rounds = 3

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

async function handleStart() {
  for (let index = 1; index <= rounds; index++) {
    const correctResponse  = Math.floor(Math.random() * 3) + 1

    const gates__element = createGates(index)
    const response = await renderGates(gates__element)
    
    if (correctResponse != response) {
      lose()
      return 
    }

    if (index == 3 || correctResponse === response) {
      win()
      return
    }
  }
}

async function renderGates(gates__element) {
  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.appendChild(gates__element)

  return new Promise(resolver => {
    [...gates__element.querySelectorAll('button')].map(button => 
      button.addEventListener('click', () => {
        resolver(button.id)
      }) 
    )
  })
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

function createGates(round) {
  const h2__element = document.querySelector('#header h2')
  h2__element.innerText = `${round}ª fase`

  const p__element = document.createElement('p')
  p__element.innerText = 'Escolha os portão correto para avançar'

  const gates__element = document.createElement('div')
  gates__element.className = 'gates'

  gates__element.append(
    createButtonGate(1),
    createButtonGate(2),
    createButtonGate(3),
  )

  return gates__element
}

function createButtonGate(id) {
  const button__element = document.createElement('button')
  button__element.className = 'button-gate'
  button__element.id = id

  button__element.innerHTML = `
    <img id="back" src="${backImg}" />
    <img id="gate" src="${gateImg}" />
    <img id="front" src="${frontImg}" />
  `

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