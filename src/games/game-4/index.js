import { createButton } from '../../components/button'

import arbalesterIconImg from '../../assets/game-4/arbalester_icon.png'
import skirmisherIconImg from '../../assets/game-4/skirmisher_icon.png'
import halberdierIconImg from '../../assets/game-4/halberdier_icon.png'
import championIconImg from '../../assets/game-4/champion_icon.png'
import paladinIconImg from '../../assets/game-4/paladin_icon.png'
import camelIconImg from '../../assets/game-4/camel_icon.png'

import './styles.css'

const initialLife = 4
const weakDamage = 1
const strongDamage = 2

let battleUnits = {}

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
  main__element.appendChild(createButton({ text: 'Começar', handleClick: selectionScreen }))

  return section__element
}

function selectionScreen() {
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

  const start_battle__element = createButton({ text: 'Batalhar', handleClick: battleScreen })
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

async function battleScreen() {
  const slots__elements = document.getElementById('selected-units').querySelectorAll('div')

  battleUnits = {
    player: [{ 
      id: Math.floor(Math.random() * new Date().getTime()),
      life: initialLife,
      unit: slots__elements[0].dataset.unit
    }, {
      id: Math.floor(Math.random() * new Date().getTime()),
      life: initialLife,
      unit: slots__elements[1].dataset.unit,
    }, {
      id: Math.floor(Math.random() * new Date().getTime()),
      life: initialLife,
      unit:slots__elements[2].dataset.unit,
    }],
    computer: [{
      id: Math.floor(Math.random() * new Date().getTime()),
      life: initialLife,
      unit: Array.from(units)[Math.floor(Math.random() * 6)][0]
    }, {
      id: Math.floor(Math.random() * new Date().getTime()),
      life: initialLife,
      unit: Array.from(units)[Math.floor(Math.random() * 6)][0]
    }, {
      id: Math.floor(Math.random() * new Date().getTime()),
      life: initialLife,
      unit: Array.from(units)[Math.floor(Math.random() * 6)][0]
    }],
  }

  const battle_units__element = renderBattleUnits()

  const title__element = document.getElementById('title')
  title__element.innerText = 'Batalha'

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(battle_units__element)

  let loop = true
  
  do {
    const initialValue = 0

    const playerLife = battleUnits.player.reduce(
      (accumulator, unit) => accumulator + unit.life,
      initialValue,
    )

    const computerLife = battleUnits.computer.reduce(
      (accumulator, unit) => accumulator + unit.life,
      initialValue,
    )

    if (playerLife === 0 && computerLife === 0) {
      const title__element = document.getElementById('title')
      const h1__element = document.createElement('h1')
      
      title__element.innerText = 'Resultado'
      h1__element.innerText = 'EMPATE'
      h1__element.className = 'result'

      main__element.innerHTML = ''
      main__element.append(h1__element, createButton({ text: 'Começar outra partida', handleClick: selectionScreen }))

      loop = false
    } else if (playerLife >= 1 && computerLife === 0) {
      const title__element = document.getElementById('title')
      const h1__element = document.createElement('h1')
      
      title__element.innerText = 'Resultado'
      h1__element.innerText = 'GANHOU'
      h1__element.className = 'result'

      main__element.innerHTML = ''
      main__element.append(h1__element, createButton({ text: 'Começar outra partida', handleClick: selectionScreen }))
      loop = false
    } else if (computerLife >= 1 && playerLife === 0) {
      const title__element = document.getElementById('title')
      const h1__element = document.createElement('h1')

      title__element.innerText = 'Resultado'
      h1__element.innerText = 'PERDEU'
      h1__element.className = 'result'

      main__element.innerHTML = ''
      main__element.append(h1__element, createButton({ text: 'Começar outra partida', handleClick: selectionScreen }))
      loop = false
    } else {
      battleUnits.player.sort((a, b) => b.life - a.life)
      battleUnits.computer.sort((a, b) => b.life - a.life)
      
      const battle_units__element = renderBattleUnits()
      main__element.innerHTML = ''
      main__element.append(battle_units__element)
      
      await playCombat()
    }
  } while (loop)
}

async function playCombat() {
  let loop = true
  
  do {
    const playerUnitLife1 = battleUnits.player[0].life
    const playerUnitLife2 = battleUnits.player[1].life
    const playerUnitLife3 = battleUnits.player[2].life
    
    const computerUnitLife1 = battleUnits.computer[0].life
    const computerUnitLife2 = battleUnits.computer[1].life
    const computerUnitLife3 = battleUnits.computer[2].life

    if (playerUnitLife1 >= 1 && computerUnitLife1 >= 1) {
      await combat(battleUnits.player[0].id, battleUnits.computer[0].id)
    } else
    if (playerUnitLife2 >= 1 && computerUnitLife2 >= 1) {
      await combat(battleUnits.player[1].id, battleUnits.computer[1].id)
    } else
    if (playerUnitLife3 >= 1 && computerUnitLife3 >= 1) {
      await combat(battleUnits.player[2].id, battleUnits.computer[2].id)
    } else {
      loop = false
    }
  } while (loop)
}

async function combat(playerUnitId, computerUnitId) {
  const player_unit__element = document.getElementById(playerUnitId)
  const computer_unit__element = document.getElementById(computerUnitId)

  const playerUnit = units.get(player_unit__element.dataset.unit)
  const currentPlayerLife = Number(player_unit__element.dataset.life)

  const computerUnit = units.get(computer_unit__element.dataset.unit)
  const currentComputerLife = Number(computer_unit__element.dataset.life)

  let newPlayerLife = 0
  let newComputerLife = 0

  if (currentPlayerLife === 0 || currentComputerLife === 0) {
    return
  }

  if (playerUnit.strong.includes(computerUnit.value) && computerUnit.weak.includes(playerUnit.value)) {
    newPlayerLife = Math.max(0, currentPlayerLife - weakDamage)
    newComputerLife = Math.max(0, currentComputerLife - strongDamage)
  } else if (playerUnit.weak.includes(computerUnit.value) && computerUnit.strong.includes(playerUnit.value)) {
    newPlayerLife = Math.max(0, currentPlayerLife - strongDamage)
    newComputerLife = Math.max(0, currentComputerLife - weakDamage)
  } else {
    newPlayerLife = Math.max(0, currentPlayerLife - weakDamage)
    newComputerLife = Math.max(0, currentComputerLife - weakDamage)
  }

  await unitAnimation(
    player_unit__element, currentPlayerLife, newPlayerLife,
    computer_unit__element, currentComputerLife, newComputerLife,
  )

  battleUnits.player.find((unit) => unit.id === playerUnitId).life = newPlayerLife
  battleUnits.computer.find((unit) => unit.id === computerUnitId).life = newComputerLife

  player_unit__element.dataset.life = newPlayerLife
  computer_unit__element.dataset.life = newComputerLife
}

function renderBattleUnits() {
  const player_units__element = document.createElement('div')
  const computer_units__element = document.createElement('div')

  const playerUnits = battleUnits.player
  const computerUnits = battleUnits.computer

  player_units__element.append(
    ...Array.from(playerUnits.map((unit) => createBattleUnit(unit.id, unit.life, unit.unit)))
  )

  computer_units__element.append(
    ...Array.from(computerUnits.map((unit) => createBattleUnit(unit.id, unit.life, unit.unit)))
  )

  const battle_units__element = document.createElement('div')
  battle_units__element.className = 'battle'
  battle_units__element.append(
    player_units__element,
    computer_units__element,
  )

  return battle_units__element
}

function handleRemoveUnit(id) {
  document.getElementById(id).remove()

  const slots__element = document.getElementById('selected-units').querySelectorAll('div')

  if (slots__element[0].hasChildNodes() || slots__element[1].hasChildNodes() || slots__element[2].hasChildNodes()) {
    document.getElementById('start-battle-button').disabled = true
  }
}

function calcPercent(value) {
  return Math.floor(Math.min(100, Math.max(0, ((100 * value) / initialLife))))
}

async function unitAnimation(
  player_unit__element, playerCurrentLife, playerNewLife,
  computer_unit__element, computerCurrentLife, computerNewLife, 
) {
  const playerCurrentPercentage  = calcPercent(playerCurrentLife)
  const playerNewPercentage = calcPercent(playerNewLife)
  const computerCurrentPercentage  = calcPercent(computerCurrentLife)
  const computerNewPercentage = calcPercent(computerNewLife)

  const player_unit_life__element = player_unit__element.querySelector('#life')
  const computer_unit_life__element = computer_unit__element.querySelector('#life')

  const playerKeyframe = new KeyframeEffect(
    player_unit__element,
    [ 
      { transform: 'translateX(0)' },
      { filter: 'blur(5px)' },
      { transform: `translateX(2.5rem)` },
      { transform: 'translateX(0)' },
      { filter: 'blur(0)' },
      { filter: 'contrast(50%)' },
      { transform: `rotate(10deg)` },
      { transform: 'rotate(0deg)' },
      { transform: `rotate(-10deg)`}, 
      { transform: 'rotate(0deg)' },
      { filter: 'contrast(100%)' },
    ],
    { duration: 500 } 
  )

  const computerKeyframe =  new KeyframeEffect(
    computer_unit__element,
    [ 
      { transform: 'translateX(0)' },
      { filter: 'blur(5px)' },
      { transform: `translateX(-2.5rem)` },
      { transform: 'translateX(0)' },
      { filter: 'blur(0)' },
      { filter: 'contrast(50%)' },
      { transform: `rotate(-10deg)` },
      { transform: 'rotate(0deg)' },
      { transform: `rotate(10deg)`}, 
      { transform: 'rotate(0deg)' },
      { filter: 'contrast(100%)' },
    ],
    { duration: 500 } 
  )

  const playerSpan1Keyframe = new KeyframeEffect(
    player_unit_life__element.firstChild,
    [ 
      { width: playerCurrentPercentage + '%' },
      { width: playerNewPercentage + '%' },
    ],
    { duration: 500 } 
  )

  const playerSpan2Keyframe = new KeyframeEffect(
    player_unit_life__element.lastChild,
    [ 
      { width: 100 - playerCurrentPercentage + '%' },
      { width: 100 - playerNewPercentage + '%' },
    ],
    { duration: 500 } 
  )

  const computerSpan1Keyframe = new KeyframeEffect(
    computer_unit_life__element.firstChild,
    [ 
      { width: computerCurrentPercentage + '%' },
      { width: computerNewPercentage + '%' },
    ],
    { duration: 500 } 
  )

  const computerSpan2Keyframe = new KeyframeEffect(
    computer_unit_life__element.lastChild,
    [ 
      { width: 100 - computerCurrentPercentage + '%' },
      { width: 100 - computerNewPercentage + '%' },
    ],
    { duration: 500 } 
  )

  const playerAnimation = new Animation(playerKeyframe)
  const computerAnimation = new Animation(computerKeyframe)
  const playerSpan1Animation = new Animation(playerSpan1Keyframe)
  const playerSpan2Animation = new Animation(playerSpan2Keyframe)
  const computerSpan1Animation = new Animation(computerSpan1Keyframe)
  const computerSpan2Animation = new Animation(computerSpan2Keyframe)

  playerAnimation.play()
  computerAnimation.play()
  
  await playerAnimation.finished
  playerSpan1Animation.play()
  playerSpan2Animation.play()

  await computerAnimation.finished
  computerSpan1Animation.play()
  computerSpan2Animation.play()

  return Promise.all([
    playerAnimation.finished,
    computerAnimation.finished,
    playerSpan1Animation.finished,
    playerSpan2Animation.finished,
    computerSpan1Animation.finished,
    computerSpan2Animation.finished,
  ])
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

function createBattleUnit(id, life, unit) {
  const { value, img } = units.get(unit)

  const battle_unit__element = document.createElement('div')
  const img__element = document.createElement('img')
  const life__element = document.createElement('div')
  
  life__element.id = 'life'
  life__element.className = 'unit-life'
  battle_unit__element.id = id
  battle_unit__element.className = 'battle-unit'
  img__element.src = img
  battle_unit__element.dataset.life = life
  battle_unit__element.dataset.unit = value
  
  life__element.append(document.createElement('span'), document.createElement('span'))
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