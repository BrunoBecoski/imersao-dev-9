import { createButton } from '../../components/button'

import arbalesterIconImg from '../../assets/game-4/arbalester_icon.png'
import skirmisherIconImg from '../../assets/game-4/skirmisher_icon.png'
import halberdierIconImg from '../../assets/game-4/halberdier_icon.png'
import championIconImg from '../../assets/game-4/champion_icon.png'
import paladinIconImg from '../../assets/game-4/paladin_icon.png'
import camelIconImg from '../../assets/game-4/camel_icon.png'

import './styles.css'

const initialLife = 2
const weakDamage = 1
const strongDamage = 2

const [playerUnits, setPlayerUnits] = createState([])
const [computerUnits, setComputerUnits] = createState([])
const [battlesRounds, setBattlesRounds] = createState([])
const [resultValue, setResultValue] = createState('')

export function createGame4() {
  const section__element = document.createElement('section')
  
  section__element.innerHTML = `
    <div id="game-4">
      <div class="header"> 
        <h2 id="title">Monte seu exército e ganhe</h2>
      </div>

      <div id="main"></div>
    </div>
  `

  const main__element =  section__element.querySelector('#main')
  main__element.appendChild(createButton({ text: 'Começar', handleClick: renderSelectionScreen }))

  return section__element
}

function renderSelectionScreen() {
  setResultValue('')
  setBattlesRounds([])
  setPlayerUnits([])
  setComputerUnits([])

  const archers__element = document.createElement('div')
  archers__element.className = 'archers'
  const archer_title__element = document.createElement('span')
  archer_title__element.innerText = 'Arqueiros'
  archers__element.append(
    archer_title__element,
    createUnit({ type: 'select', value: 'arbalester' }),
    createUnit({ type: 'select', value: 'skirmisher' }),
  )

  const infantries__element = document.createElement('div')
  infantries__element.className = 'infantries'
  const infantries_title__element = document.createElement('span')
  infantries_title__element.innerText = 'Infantarias'
  infantries__element.append(
    infantries_title__element,
    createUnit({ type: 'select', value: 'halberdier' }),
    createUnit({ type: 'select', value: 'champion' }),
  )

  const cavalries__element = document.createElement('div')
  cavalries__element.className = 'cavalries'
  const cavalries_title__element = document.createElement('span')
  cavalries_title__element.innerText = 'Cavalarias'
  cavalries__element.append(
    cavalries_title__element,
    createUnit({ type: 'select', value: 'paladin' }),
    createUnit({ type: 'select', value: 'camel' }),
  )

  const units__element = document.createElement('div')
  units__element.className = 'units'
  units__element.append(archers__element, infantries__element, cavalries__element)

  const title__element = document.getElementById('title')
  title__element.innerText = 'Escolha três unidades'

  const selected_units__element = document.createElement('div')
  selected_units__element.id = 'selected-units'

  const start_battle__element = createButton({ text: 'Batalhar', handleClick: renderBattleScreen })
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

async function renderBattleScreen() {
  const slots__elements = document.getElementById('selected-units').querySelectorAll(':scope > div')

  setPlayerUnits([
    { 
      id: Math.floor(Math.random() * new Date().getTime()),
      life: initialLife,
      unit: slots__elements[0].dataset.unit,
      index: 1,
    }, {
      id: Math.floor(Math.random() * new Date().getTime()),
      life: initialLife,
      unit: slots__elements[1].dataset.unit,
      index: 2, 
    }, {
      id: Math.floor(Math.random() * new Date().getTime()),
      life: initialLife,
      unit:slots__elements[2].dataset.unit,
      index: 3,
    }
  ])

  setComputerUnits([
    {
      id: Math.floor(Math.random() * new Date().getTime()),
      life: initialLife,
      unit: Array.from(units)[Math.floor(Math.random() * 6)][0],
      index: 1,
    }, {
      id: Math.floor(Math.random() * new Date().getTime()),
      life: initialLife,
      unit: Array.from(units)[Math.floor(Math.random() * 6)][0],
      index: 2,
    }, {
      id: Math.floor(Math.random() * new Date().getTime()),
      life: initialLife,
      unit: Array.from(units)[Math.floor(Math.random() * 6)][0],
      index: 3,
    }
  ])

  const battle_units__element = renderBattleUnits()

  const title__element = document.getElementById('title')
  title__element.innerText = 'Batalha'

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(battle_units__element)

  let loop = true
  
  do {
    const initialValue = 0

    const playerLife = playerUnits().reduce(
      (accumulator, unit) => accumulator + unit.life,
      initialValue,
    )

    const computerLife = computerUnits().reduce(
      (accumulator, unit) => accumulator + unit.life,
      initialValue,
    )

    if (playerLife === 0 && computerLife === 0) {
      setResultValue('draw')

      loop = false
    } else if (playerLife >= 1 && computerLife === 0) {
      setResultValue('won')

      loop = false
    } else if (computerLife >= 1 && playerLife === 0) {
      setResultValue('lose')

      loop = false
    } else {
      playerUnits().sort((a, b) => b.life - a.life)
      computerUnits().sort((a, b) => b.life - a.life)
      
      const battle_units__element = renderBattleUnits()
      main__element.innerHTML = ''
      main__element.append(battle_units__element)
      
      await playCombat()
    }
  } while (loop)

  renderResultScreen()
}

function renderBattleUnits() {
  const player_units__element = document.createElement('div')
  const computer_units__element = document.createElement('div')
  player_units__element.className = 'player-units'
  computer_units__element.className = 'computer-units'

  player_units__element.append(
    ...Array.from(playerUnits().map(({ id, unit, life, index }) => createUnit({ type: 'combat', id, value: unit, life, index })))
  )

  computer_units__element.append(
    ...Array.from(computerUnits().map(({ id, unit, life, index }) => createUnit({ type: 'combat', id, value: unit, life, index })))
  )

  const battle_units__element = document.createElement('div')
  battle_units__element.className = 'battle'
  battle_units__element.append(
    player_units__element,
    computer_units__element,
  )

  return battle_units__element
}

function renderResultScreen() {
  const result_title__element = document.createElement('h1')
  result_title__element.className = 'result-title'

  const top_div__element = document.createElement('div')
  top_div__element.className = 'top-units'
  const top_title__element = document.createElement('h2')
  const top_units__element = document.createElement('div')
  top_div__element.append(
    top_title__element,
    top_units__element
  )

  const bottom_div__element = document.createElement('div')
  bottom_div__element.className = 'bottom-units'
  const bottom_title__element = document.createElement('h2')
  const bottom_units__element = document.createElement('div')
  bottom_div__element.append(
    bottom_title__element,
    bottom_units__element
  )

  switch (resultValue()) {
    case 'draw':
      result_title__element.innerText = 'EMPATE',

      top_title__element.innerText = 'Jogador'
      top_units__element.append(
        ...Array.from(playerUnits().map(({ unit, index }) => createUnit({ type: 'result', value: unit, index, result: 'draw' }))),
      )

      bottom_title__element.innerText = 'Computador'
      bottom_units__element.append(
        ...Array.from(computerUnits().map(({ unit, index }) => createUnit({ type: 'result', value: unit, index, result: 'draw' }))),
      )

      break;

    case 'won':
      result_title__element.innerText = 'VENCEU',

      top_title__element.innerText = 'Jogador'
      top_units__element.append(
        ...Array.from(playerUnits().map(({ unit, index }) => createUnit({ type: 'result', value: unit, index, result: 'won' }))),
      )

      bottom_title__element.innerText = 'Computador'
      bottom_units__element.append(
        ...Array.from(computerUnits().map(({ unit, index }) => createUnit({ type: 'result', value: unit, index, result: 'lose' }))),
      )

      break;

    case 'lose':
      result_title__element.innerText = 'PERDEU',

      top_title__element.innerText = 'Computador'
      top_units__element.append(
        ...Array.from(computerUnits().map(({ unit, index }) => createUnit({ type: 'result', value: unit, index, result: 'won' }))),
      )

      bottom_title__element.innerText = 'Jogador'
      bottom_units__element.append(
        ...Array.from(playerUnits().map(({ unit, index }) => createUnit({ type: 'result', value: unit, index, result: 'lose' }))),
      )

    default:
      break;
  }
 
  const title__element = document.getElementById('title')
  title__element.innerText = 'Resultado'
  
  const buttons__element = document.createElement('div')
  buttons__element.className = 'result-buttons'
  buttons__element.append(
    createButton({ text: 'Ver relatório', handleClick: renderReportScreen }),
    createButton({ text: 'Jogar novamente', handleClick: renderSelectionScreen })
  )

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(
    result_title__element,
    buttons__element,
    top_div__element,
    bottom_div__element,
  )
}

function renderReportScreen() {
  let index = 0

  const player = battlesRounds()[index].player
  const computer = battlesRounds()[index].computer
  const rounds__element = document.createElement('div')
  rounds__element.className = 'report-round'
  rounds__element.id = 'round'

  rounds__element.append(
    createUnit({ type: 'combat', id: player.id, value: player.value, life: player.life, index: player.index }),
    createUnit({ type: 'combat', id: computer.id, value: computer.value, life: computer.life, index: computer.index }),
  )

  const back__element = createButton({ text: 'Voltar', handleClick: () => {
    if (index > 0) {
      index--
      
      const player = battlesRounds()[index].player
      const computer = battlesRounds()[index].computer
      const rounds__element = document.getElementById('round')
      const progress__element = document.getElementById('progress')

      progress__element.innerText = `Rodada ${index + 1}`
      rounds__element.innerHTML = ''
      rounds__element.append(
        createUnit({ type: 'combat', id: player.id, value: player.value, life: player.life, index: player.index }),
        createUnit({ type: 'combat', id: computer.id, value: computer.value, life: computer.life, index: computer.index }),
      )
    }
  }})

  const next__element = createButton({ text: 'Próximo', handleClick: () => {
    if (index < (battlesRounds().length - 1)) {

      index++
      const player = battlesRounds()[index].player
      const computer = battlesRounds()[index].computer
      const rounds__element = document.getElementById('round')
      const progress__element = document.getElementById('progress')

      progress__element.innerText = `Rodada ${index + 1}`
      rounds__element.innerHTML = ''
      rounds__element.append(
        createUnit({ type: 'combat', id: player.id, value: player.value, life: player.life, index: player.index }),
        createUnit({ type: 'combat', id: computer.id, value: computer.value, life: computer.life, index: computer.index }),
      )
    }
  }})

  const progress__element = document.createElement('span')
  progress__element.id = 'progress'
  progress__element.innerText = `Rodada ${index + 1}`

  const title__element = document.getElementById('title')
  title__element.innerText = 'Relatório'

  const units_report__element = document.createElement('div')
  units_report__element.className = 'report-units'

  const titles__element = document.createElement('div')
  titles__element.className = 'report-titles'
  titles__element.innerHTML = `<strong>Jogador</strong> <strong>Computador</strong>`

  units_report__element.appendChild(rounds__element)

  const main__element = document.getElementById('main')
  main__element.innerHTML = ''
  main__element.append(
    createButton({ text: 'Ver resultado', handleClick: renderResultScreen }), 
    back__element,
    progress__element,
    next__element,
    titles__element, 
    units_report__element
  )
}

async function playCombat() {
  let loop = true

  do {
    const playerUnitLife1 = playerUnits()[0].life
    const playerUnitLife2 = playerUnits()[1].life
    const playerUnitLife3 = playerUnits()[2].life
    
    const computerUnitLife1 = computerUnits()[0].life
    const computerUnitLife2 = computerUnits()[1].life
    const computerUnitLife3 = computerUnits()[2].life

    if (playerUnitLife1 >= 1 && computerUnitLife1 >= 1) {
      await combat(playerUnits()[0], computerUnits()[0])
    } else
    if (playerUnitLife2 >= 1 && computerUnitLife2 >= 1) {
      await combat(playerUnits()[1], computerUnits()[1])
    } else
    if (playerUnitLife3 >= 1 && computerUnitLife3 >= 1) {
      await combat(playerUnits()[2], computerUnits()[2])
    } else {
      loop = false
    }
  } while (loop)
}

async function combat(playerInfo, computerInfo) {
  const player_unit__element = document.getElementById(playerInfo.id)
  const computer_unit__element = document.getElementById(computerInfo.id)

  const playerUnit = units.get(player_unit__element.dataset.unit)
  const currentPlayerLife = Number(player_unit__element.dataset.life)

  const computerUnit = units.get(computer_unit__element.dataset.unit)
  const currentComputerLife = Number(computer_unit__element.dataset.life)

  let newPlayerLife = 0
  let newComputerLife = 0

  let battleRoundUnits = {
    player: {
      id: playerInfo.id,
      value: playerUnit.value,
      life: currentPlayerLife,
      damage: 0,
      index: playerInfo.index,
    },
    computer: {
      id: computerInfo.id,
      value: computerUnit.value,
      life: currentComputerLife,
      damage: 0,
      index: computerInfo.index,
    }
  }

  if (currentPlayerLife === 0 || currentComputerLife === 0) {
    return
  }

  if (playerUnit.strong.includes(computerUnit.value) && computerUnit.weak.includes(playerUnit.value)) {
    newPlayerLife = Math.max(0, currentPlayerLife - weakDamage)
    newComputerLife = Math.max(0, currentComputerLife - strongDamage)

    battleRoundUnits.player.damage = weakDamage
    battleRoundUnits.computer.damage = strongDamage
  } else if (playerUnit.weak.includes(computerUnit.value) && computerUnit.strong.includes(playerUnit.value)) {
    newPlayerLife = Math.max(0, currentPlayerLife - strongDamage)
    newComputerLife = Math.max(0, currentComputerLife - weakDamage)

    battleRoundUnits.player.damage = strongDamage
    battleRoundUnits.computer.damage = weakDamage
  } else {
    newPlayerLife = Math.max(0, currentPlayerLife - weakDamage)
    newComputerLife = Math.max(0, currentComputerLife - weakDamage)

    battleRoundUnits.player.damage = weakDamage
    battleRoundUnits.computer.damage = weakDamage
  }

  await unitAnimation(
    player_unit__element, currentPlayerLife, newPlayerLife,
    computer_unit__element, currentComputerLife, newComputerLife,
  )

  playerUnits().find((unit) => unit.id === playerInfo.id).life = newPlayerLife
  computerUnits().find((unit) => unit.id === computerInfo.id).life = newComputerLife

  setBattlesRounds([...battlesRounds(), battleRoundUnits])

  player_unit__element.dataset.life = newPlayerLife
  computer_unit__element.dataset.life = newComputerLife
}

function handleAddUnit(unit) {
  const selected_units__element = document.getElementById('selected-units')

  const slot_1__element = selected_units__element.querySelectorAll(':scope > div')[0]
  const slot_2__element = selected_units__element.querySelectorAll(':scope > div')[1]
  const slot_3__element = selected_units__element.querySelectorAll(':scope > div')[2]

  if (slot_1__element.hasChildNodes() === false) {
    slot_1__element.dataset.unit = unit
    slot_1__element.appendChild(createUnit({ type: 'selected', value: unit, index: 1 }))
  } else if (slot_2__element.hasChildNodes() === false) {
    slot_2__element.dataset.unit = unit
    slot_2__element.appendChild(createUnit({ type: 'selected', value: unit, index: 2 }))
  } else if (slot_3__element.hasChildNodes() === false) {
    slot_3__element.dataset.unit = unit
    slot_3__element.appendChild(createUnit({ type: 'selected', value: unit, index: 3 }))
  }

  if (slot_1__element.hasChildNodes() && slot_2__element.hasChildNodes() && slot_3__element.hasChildNodes()) {
    const start_battle__element = document.getElementById('start-battle-button')
    start_battle__element.disabled = false
  }  
}

function handleRemoveUnit(id) {
  document.getElementById(id).remove()

  const slots__element = document.getElementById('selected-units').querySelectorAll(':scope > div')

  if (slots__element[0].hasChildNodes() || slots__element[1].hasChildNodes() || slots__element[2].hasChildNodes()) {
    document.getElementById('start-battle-button').disabled = true
  }
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

function createUnit(props) {
  const { type, id, value, life, index, result } = props

  const { name, img } = units.get(value)

  let unitId = id

  if (id === undefined) {
    unitId = Math.round(Math.random() * new Date())
  }

  const container__element = document.createElement('div')
  const name__element = document.createElement('strong')
  const image__element = document.createElement('img')
  const index__element = document.createElement('i')
  const life__element = document.createElement('div')
  
  container__element.id = unitId
  container__element.dataset.unit = value

  container__element.className = 'unit'
  name__element.className = 'unit-name'
  image__element.className = 'unit-image'
  index__element.className = 'unit-index'
  life__element.id = 'life'

  name__element.innerText = name
  image__element.src = img

  switch (type) {
    case 'select':
      container__element.classList.add('hover-select')
      container__element.onclick = () => handleAddUnit(value)
      break;
      
    case 'selected':
      index__element.innerText = index
      container__element.classList.add('hover-selected')
      container__element.onclick = () => handleRemoveUnit(unitId)
      break;

    case 'combat':
      container__element.dataset.life = life
      index__element.innerText = index
      life__element.append(document.createElement('span'), document.createElement('span'))
    
    case 'result':
      container__element.dataset.result = result
      index__element.innerText = index

    default:
      break;
  }

  container__element.append(name__element, image__element, index__element, life__element)

  return container__element
}

function calcPercent(value) {
  return Math.floor(Math.min(100, Math.max(0, ((100 * value) / initialLife))))
}

function createState(initialValue) {
  let value = initialValue

  function get() {
    return value
  }

  function set(newValue) {  
    value = newValue
  }

  return [get, set]
}

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