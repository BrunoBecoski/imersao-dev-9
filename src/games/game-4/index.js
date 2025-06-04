import arbalesterIconImg from '../../assets/game-4/arbalester_icon.png'
import skirmisherIconImg from '../../assets/game-4/skirmisher_icon.png'
import halberdierIconImg from '../../assets/game-4/halberdier_icon.png'
import championIconImg from '../../assets/game-4/champion_icon.png'
import paladinIconImg from '../../assets/game-4/paladin_icon.png'
import camelIconImg from '../../assets/game-4/camel_icon.png'

import './styles.css'

const units = new Map([
  ['arbalester', {
    name: 'Arbalesteiro',
    value: 'arbalester',
    img: arbalesterIconImg,
    type: 'archer',
    strong: 'infantry',
  }],
  ['skirmisher', {
    name: 'Escaramuçador',
    value: 'skirmisher',
    img: skirmisherIconImg,
    type: 'archer',
    type: 'archer',
  }],
  ['champion', {
    name: 'Campeão',
    value: 'champion',
    img: championIconImg,
    type: 'infantry',
    strong: 'infantry',
  }],
  ['halberdier', {
    name: 'Alabardeiro',
    value: 'halberdier',
    img: halberdierIconImg,
    type: 'infantry',
    strong: 'cavalry',
  }],
  ['paladin', {
    name: 'Paladino',
    value: 'paladin',
    img: paladinIconImg,
    type: 'cavalry',
    strong: 'archer',
  }],
  ['camel', {
    name: 'Cameleiro',
    value: 'camel',
    img: camelIconImg,
    type: 'cavalry',
    strong: 'cavalry',
  }],
])

export function createGame4() {
  const section__element = document.createElement('section')
  
  section__element.innerHTML = `
    <div id="game-4">
      <div class="header"> 
        <h2>Escolha três unidades</h2>
      </div>

      <div id="main"></div>
    </div>
  `


  const units__element = document.createElement('div')
  units__element.className = 'units'
  units__element.append(
    createSelectUnit('arbalester'),
    createSelectUnit('skirmisher'),
    createSelectUnit('champion'),
    createSelectUnit('halberdier'),
    createSelectUnit('paladin'),
    createSelectUnit('camel'),
  )

  section__element.querySelector('#main').appendChild(units__element)

  return section__element
}

function createSelectUnit(unit) {
  const { img, name } = units.get(unit)

  const button__element = document.createElement('button')
  const img__element = document.createElement('img')
  const span__element = document.createElement('span')
  
  button__element.className = 'select-unit'
  img__element.src = img
  span__element.innerText = name

  button__element.append(img__element, span__element)

  return button__element
}





// export function createGame4() {
//   const section__element = document.createElement('section')
  
//   section__element.innerHTML = `
//     <div class="container">
//       <div class="content">
//         <h2>Força ou Queda</h2>
//         <p>Escolha 3 jogadores para seu time:</p>
//         <button>Ver Resultado</button>
//       </div>
//     </div>
//   `

//   section__element.querySelector('button').onclick = () => handlePlay()

//   return section__element
// }

// function handlePlay() {
//   const characters = []
//   const villains = []

//   let charactersForce = 0
//   let villainsForce = 0
  
//   for(let i = 0; i < 3; i++) {
//     characters[i] = prompt(`Digite o nome do seu ${i + 1}º personagem`)
//     charactersForce += Math.floor(Math.random() * 10) + 1
//   }

//   for(let i = 0; i < 3; i++) {
//     const randomIndex = Math.floor(Math.random() * 6)
//     const possibleVillains = [
//       'Nazaré Tedesco',
//       'Odete Roitman',
//       'Flora',
//       'Carminha',
//       'Laura Prudente da Costa ',
//       'Bia Falcão',
//     ]

//     villains[i] = possibleVillains[randomIndex] 
//     villainsForce += Math.floor(Math.random() * 10) + 1
//   }

//   if (charactersForce > villainsForce) {
//     alert('Seu time é muito forte! Você ganhou a disputa de cabo de guerra! Sua força foi de: ' + charactersForce)
//   } else {
//     if (charactersForce < villainsForce) {
//       alert('Seu time é fraquinho. O computador ganhou o cabo de guerra com força de: ' + villainsForce)
//     } else {
//       alert('Os dois times tem a mesma força! Vocês empataram com a força de: ' + charactersForce)
//     }
//   }
// }