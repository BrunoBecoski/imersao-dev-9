import arbalesterIconImg from '../../assets/game-4/arbalester_icon.png'
import skirmisherIconImg from '../../assets/game-4/skirmisher_icon.png'
import halberdierIconImg from '../../assets/game-4/halberdier_icon.png'
import championIconImg from '../../assets/game-4/champion_icon.png'
import paladinIconImg from '../../assets/game-4/paladin_icon.png'
import camelIconImg from '../../assets/game-4/camel_icon.png'

const units = new Map([
  ['arbalester', {
    name: 'Arbalesteiro',
    value: 'arbalester',
    img: arbalesterIconImg,
  }],
  ['skirmisher', {
    name: 'Escaramuçador',
    value: 'skirmisher',
    img: skirmisherIconImg,
  }],
  ['champion', {
    name: 'Campeão',
    value: 'champion',
    img: championIconImg,
  }],
  ['halberdier', {
    name: 'Alabardeiro',
    value: 'halberdier',
    img: halberdierIconImg,
  }],
  ['paladin', {
    name: 'Paladino',
    value: 'paladin',
    img: paladinIconImg,
  }],
  ['camel', {
    name: 'Cameleiro',
    value: 'camel',
    img: camelIconImg,
  }],
])

export function createGame4() {
  const section__element = document.createElement('section')
  
  section__element.innerHTML = `
    <div class="container">
      <div class="content">Escolha três unidades</div>

      <div id="main"></div>
    </div>
  `

  const arbalester = document.createElement('img')
  arbalester.src = units.get('arbalester').img

  const skirmisher = document.createElement('img')
  skirmisher.src = units.get('skirmisher').img

  const champion = document.createElement('img')
  champion.src = units.get('champion').img

  const halberdier = document.createElement('img')
  halberdier.src = units.get('halberdier').img

  const paladin = document.createElement('img')
  paladin.src = units.get('paladin').img

  const camel = document.createElement('img')
  camel.src = units.get('camel').img

  const units__element = document.createElement('div')
  units__element.append(
    arbalester,
    skirmisher,
    champion,
    halberdier,
    paladin,
    camel,
  )

  section__element.querySelector('#main').appendChild(units__element)

  return section__element
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