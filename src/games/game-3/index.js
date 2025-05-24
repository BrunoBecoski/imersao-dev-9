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
  console.log('começar')
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