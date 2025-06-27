import { createButton } from '../../components/button'

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
    strong: ['halberdier', 'champion'],
    weak:  ['paladin', 'camel', 'skirmisher'],
  }],
  ['skirmisher', {
    name: 'Escaramuçador',
    value: 'skirmisher',
    img: skirmisherIconImg,
    type: 'archer',
    strong: ['arbalester'],
    weak: ['paladin', 'camel']
  }],
  ['halberdier', {
    name: 'Alabardeiro',
    value: 'halberdier',
    img: halberdierIconImg,
    type: 'infantry',
    strong: ['paladin', 'camel'],
    weak: ['arbalester', 'skirmisher', 'champion'],
  }],
  ['champion', {
    name: 'Campeão',
    value: 'champion',
    img: championIconImg,
    type: 'infantry',
    strong: ['halberdier'],
    weak: ['arbalester', 'skirmisher'],
  }],
  ['paladin', {
    name: 'Paladino',
    value: 'paladin',
    img: paladinIconImg,
    type: 'cavalry',
    strong: ['arbalester', 'skirmisher'],
    weak: ['halberdier', 'champion', 'camel'],

  }],
  ['camel', {
    name: 'Cameleiro',
    value: 'camel',
    img: camelIconImg,
    type: 'cavalry',
    strong: ['paladin'],
    weak: ['halberdier', 'champion'],
  }],
])

export function createGame4() {
  const section__element = document.createElement('section')
  
  section__element.innerHTML = `
    <div id="game-4">
      <div class="header"> 
        <h2 id="title">Monte seu exército e ganhe</h2>
      </div>

      <div id="main">

      </div>
    </div>
  `

  const main__element =  section__element.querySelector('#main')
  main__element.appendChild(createButton({ text: 'Começar', handleClick: handleStart }))

  return section__element
}

function handleStart() {
  const archers__element = document.createElement('div')
  archers__element.className = 'archers'
  const archer_title__element = document.createElement('span')
  archer_title__element.innerText = 'Arqueiros'
  archers__element.append(
    archer_title__element,
    createButtonUnit('arbalester'),
    createButtonUnit('skirmisher'),
  )

  const infantries__element = document.createElement('div')
  infantries__element.className = 'infantries'
  const infantries_title__element = document.createElement('span')
  infantries_title__element.innerText = 'Infantarias'
  infantries__element.append(
    infantries_title__element,
    createButtonUnit('halberdier'),
    createButtonUnit('champion'),
  )

  const cavalries__element = document.createElement('div')
  cavalries__element.className = 'cavalries'
  const cavalries_title__element = document.createElement('span')
  cavalries_title__element.innerText = 'Cavalarias'
  cavalries__element.append(
    cavalries_title__element,
    createButtonUnit('paladin'),
    createButtonUnit('camel'),
  )

  const units__element = document.createElement('div')
  units__element.className = 'units'
  units__element.append(archers__element, infantries__element, cavalries__element)

  const title__element = document.getElementById('title')
  title__element.innerText = 'Escolha três unidades'

  const selected_units__element = document.createElement('div')
  selected_units__element.id = 'selected-units'

  const start_battle__element = createButton({ text: 'Batalhar', handleClick: handleBattle })
  start_battle__element.disabled = true
  start_battle__element.id = 'start-battle-button'

  selected_units__element.append(
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
    start_battle__element,
  )

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(selected_units__element, units__element)
}

function handleAddUnit(unit) {
  const selected_units__element = document.getElementById('selected-units')

  const slot_1__element = selected_units__element.querySelectorAll('div')[0]
  const slot_2__element = selected_units__element.querySelectorAll('div')[1]
  const slot_3__element = selected_units__element.querySelectorAll('div')[2]

  if (slot_1__element.hasChildNodes() === false) {
    slot_1__element.dataset.unit = unit
    slot_1__element.appendChild(createSelectedUnit(unit))
  } else if (slot_2__element.hasChildNodes() === false) {
    slot_2__element.dataset.unit = unit
    slot_2__element.appendChild(createSelectedUnit(unit))
  } else if (slot_3__element.hasChildNodes() === false) {
    slot_3__element.dataset.unit = unit
    slot_3__element.appendChild(createSelectedUnit(unit))
  }

  if (slot_1__element.hasChildNodes() && slot_2__element.hasChildNodes() && slot_3__element.hasChildNodes()) {
    const start_battle__element = document.getElementById('start-battle-button')
    start_battle__element.disabled = false
  }  
}

function handleBattle() {
  const slots__elements = document.getElementById('selected-units').querySelectorAll('div')

  const player_units__element = document.createElement('div')
  const computer_units__element = document.createElement('div')
  computer_units__element.className = 'computer-units'

  const player_unit_1 = units.get(slots__elements[0].dataset.unit)
  const player_unit_2 = units.get(slots__elements[1].dataset.unit)
  const player_unit_3 = units.get(slots__elements[2].dataset.unit)

  const computer_unit_1 = Array.from(units.entries())[Math.floor(Math.random() * 6)][1]
  const computer_unit_2 = Array.from(units.entries())[Math.floor(Math.random() * 6)][1]
  const computer_unit_3 = Array.from(units.entries())[Math.floor(Math.random() * 6)][1]

  if (player_unit_1 && player_unit_2 && player_unit_3) {

    const player_unit_1__element = createBattleUnit(player_unit_1.value)
    const player_unit_2__element = createBattleUnit(player_unit_2.value)
    const player_unit_3__element = createBattleUnit(player_unit_3.value)

    player_units__element.append(
      player_unit_1__element,
      player_unit_2__element,
      player_unit_3__element,
    )

    const computer_unit_1__element =  createBattleUnit(computer_unit_1.value)
    const computer_unit_2__element =  createBattleUnit(computer_unit_2.value)
    const computer_unit_3__element =  createBattleUnit(computer_unit_3.value)

    computer_units__element.append(
      computer_unit_1__element,
      computer_unit_2__element,
      computer_unit_3__element,
    )

    const battle__element = document.createElement('div')
    battle__element.className = 'battle'
    battle__element.append(
      player_units__element,
      computer_units__element,
    )

    const title__element = document.getElementById('title')
    title__element.innerText = 'Batalha'

    const main__element = document.getElementById('main')
    main__element.innerHTML = ''
    main__element.append(battle__element, createButton({ text: 'Recomeçar', handleClick: handleStart }))
    
    setTimeout(() => {
      unitAnimation(player_unit_1__element, 'left').play()
      unitAnimation(computer_unit_1__element, 'right').play()

      setTimeout(() => {
         combat(player_unit_1__element, computer_unit_1__element)
      }, 500)
    }, 1000)
  
    setTimeout(() => {
      unitAnimation(player_unit_2__element, 'left').play()
      unitAnimation(computer_unit_2__element, 'right').play()

      setTimeout(() => {
        combat(player_unit_2__element, computer_unit_2__element)
      }, 500)
    }, 2000)

    setTimeout(() => {
      unitAnimation(player_unit_3__element, 'left').play()
      unitAnimation(computer_unit_3__element, 'right').play()

      setTimeout(() => {
        combat(player_unit_3__element, computer_unit_3__element)
      }, 500)
    }, 3000)
  }
}

function handleRemoveUnit(id) {
  document.getElementById(id).remove()

  const slots__element = document.getElementById('selected-units').querySelectorAll('div')

  if (slots__element[0].hasChildNodes() || slots__element[1].hasChildNodes() || slots__element[2].hasChildNodes()) {
    document.getElementById('start-battle-button').disabled = true
  }
}

function unitAnimation(element, side) {
  const css = (() => { 
    switch (side) {
      case 'left':
        return { 
          translate: '2.5rem',
          rotate_1: '10deg',
          rotate_2: '-10deg',
        }
    
      case 'right':
        return { 
          translate: '-2.5rem',
          rotate_1: '-10deg',
          rotate_2: '10deg',
        }
      default:
        return { 
          translate: '0',
          rotate_1: '0',
          rotate_2: '0',
        }
    }
  })()

  const keyframe = new KeyframeEffect(
    element,
    [ 
      { transform: 'translateX(0)' },
      { transform: `translateX(${css.translate})` },
      { transform: `rotate(${css.rotate_1})` },
      { transform: 'rotate(0deg)' },
      { transform: `rotate(${css.rotate_2})`}, 
      { transform: 'rotate(0deg)' },
      { transform: 'translateX(0)' },
    ],
    { duration: 500 } 
  )

  return new Animation(keyframe)
}

function lifeAnimation(element, life, damage) {
  let css = {
    life: {
      width_1: (100 * life) / 4,
      width_2: (100 * (life - damage)) / 4,
    },
    damage: {
      width_1: 100 - ((100 * life) / 4),
      width_2: (100 * damage) / 4,
    }
  }

  const life__element = element.querySelector('#life')

  new Animation( new KeyframeEffect(
    life__element.firstChild,
    [ 
      { width: css.life.width_1 + '%' },
      { width: css.life.width_2 + '%' },
    ],
    { duration: 500 } 
  )).play()

  new Animation( new KeyframeEffect(
    life__element.lastChild,
    [ 
      { width: css.damage.width_1 + '%' },
      { width: css.damage.width_2 + '%' },
    ],
    { duration: 500 } 
  )).play()
}

function combat(player_unit__element, computer_unit__element) {
  const playerUnit = units.get(player_unit__element.dataset.unit)
  const playerLife = Number(player_unit__element.dataset.life)

  const computerUnit = units.get(computer_unit__element.dataset.unit)
  const computerLife = Number(computer_unit__element.dataset.life)

  if (playerUnit.strong.includes(computerUnit.value) && computerUnit.weak.includes(playerUnit.value)) {
    const playerDamage = playerLife - 1
    const computerDamage = computerLife - 2

    player_unit__element.dataset.life = playerDamage
    computer_unit__element.dataset.life = computerDamage

    lifeAnimation(player_unit__element, playerLife, 1)
    lifeAnimation(computer_unit__element, computerLife, 2)
  } else if (playerUnit.weak.includes(computerUnit.value) && computerUnit.strong.includes(playerUnit.value)) {
    const playerDamage = playerLife - 2
    const computerDamage = computerLife - 1
    
    player_unit__element.dataset.life = playerDamage
    computer_unit__element.dataset.life = computerDamage

    lifeAnimation(player_unit__element, playerLife, 2)
    lifeAnimation(computer_unit__element, computerLife, 1)
  } else {
    const playerDamage = playerLife - 1
    const computerDamage = computerLife - 1

    player_unit__element.dataset.life = playerDamage
    computer_unit__element.dataset.life = computerDamage

    lifeAnimation(player_unit__element, playerLife, 1)
    lifeAnimation(computer_unit__element, computerLife, 1)
  }
}

function createButtonUnit(unit) {
  const { value, img, name } = units.get(unit)

  const button__element = document.createElement('button')
  const img__element = document.createElement('img')
  const span__element = document.createElement('span')
  
  button__element.id = value
  button__element.className = 'select-unit'
  button__element.onclick = () => handleAddUnit(unit)
  img__element.src = img
  span__element.innerText = name

  button__element.addEventListener('mouseover', () => handleMouseOver(value))
  button__element.addEventListener('mouseout', () => handleMouseOut(value))

  button__element.append(img__element, span__element)

  return button__element
}

function createSelectedUnit(unit) {
  const { name, img } = units.get(unit)

  const button__element = document.createElement('button')
  const img__element = document.createElement('img')
  const span__element = document.createElement('span')

  const id = new Date().getTime()
  
  button__element.id = new Date().getTime()
  button__element.className = 'selected-unit'
  button__element.onclick = () => handleRemoveUnit(id)
  img__element.src = img
  span__element.innerText = name

  button__element.append(img__element, span__element)

  return button__element
}

function handleMouseOver(value) {
  const { strong, weak } = units.get(value)

  strong.forEach(unit => document.getElementById(unit).classList.add('strong'))
  weak.forEach(unit => document.getElementById(unit).classList.add('weak'))
}

function handleMouseOut(value) {
  const { strong, weak } = units.get(value)

  strong.forEach(unit => document.getElementById(unit).classList.remove('strong'))
  weak.forEach(unit => document.getElementById(unit).classList.remove('weak'))
}

function createBattleUnit(unit) {
  const { value, img } = units.get(unit)

  const battle_unit__element = document.createElement('div')
  const img__element = document.createElement('img')
  const life__element = document.createElement('div')

  life__element.append(document.createElement('span'), document.createElement('span'))

  life__element.id = 'life'
  life__element.className = 'unit-life'
  battle_unit__element.className = 'battle-unit'

  img__element.src = img

  battle_unit__element.dataset.life = 4
  battle_unit__element.dataset.unit = value

  battle_unit__element.append(life__element, img__element)

  return battle_unit__element
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