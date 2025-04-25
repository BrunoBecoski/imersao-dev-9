import marketImg from '../../assets/market.png'
import goldImg from '../../assets/gold.png'
import woodImg from '../../assets/wood.png'
import foodImg from '../../assets/food.png'
import stoneImg from '../../assets/stone.png'

import './styles.css'

let gold = 1000
let wood = 100
let food = 100
let stone = 100

let wood_exchange = 100
let food_exchange = 115
let stone_exchange = 130

export function createGame1() {
  const section__element = document.createElement('section')

  section__element.innerHTML = `
    <div id="game_1">
      <div class="resources">
        <div>
          <img src=${goldImg} />
          <span id="gold">${gold}</span>
        </div>

        <div>
          <img src=${woodImg} />
          <span id="wood">${wood}</span>
        </div>

        <div>
          <img src=${foodImg} />
          <span id="food">${food}</span>
        </div>

        <div>
          <img src=${stoneImg} />
          <span id="stone">${stone}</span>
        </div>
      </div>

      <div class="market">
        <img src=${marketImg} />

        <div class="exchange">
          <div class="sell">
            <button id="wood" title="Madeira"><span>${wood_exchange}</span> <img src=${woodImg}  /> Vender</button>
            <button id="food" title="Comida"><span>${food_exchange}</span> <img src=${foodImg} /> Vender</button>
            <button id="stone" title="Pedra"><span>${stone_exchange}</span> <img src=${stoneImg} /> Vender</button>
          </div>

          <div class="buy">
            <button id="wood" title="Madeira"><span>${wood_exchange}</span> <img src=${woodImg} /> Comprar</button>
            <button id="food" title="Comida"><span>${food_exchange}</span> <img src=${foodImg} /> Comprar</button>
            <button id="stone" title="Pedra"><span>${stone_exchange}</span> <img src=${stoneImg} /> Comprar </button>
          </div>
        </div>
      </div>
    </div>
  `
  section__element.querySelector('.sell #wood').addEventListener('click', () => handleSell('wood'))
  section__element.querySelector('.sell #food').addEventListener('click', () => handleSell('food'))
  section__element.querySelector('.sell #stone').addEventListener('click', () => handleSell('stone'))

  section__element.querySelector('.buy #wood').addEventListener('click', () => handleBuy('wood'))
  section__element.querySelector('.buy #food').addEventListener('click', () => handleBuy('food'))
  section__element.querySelector('.buy #stone').addEventListener('click', () => handleBuy('stone'))

  return section__element
}

function updateExchange(resource) {
  const section__element = document.getElementById('game_1')

  switch (resource) {
    case 'wood':
      section__element.querySelector('.exchange .sell #wood span').innerText = wood_exchange
      section__element.querySelector('.exchange .buy #wood span').innerText = wood_exchange
      break;
  
    case 'food':
      section__element.querySelector('.exchange .sell #food span').innerText = food_exchange
      section__element.querySelector('.exchange .buy #food span').innerText = food_exchange
      break;

    case 'stone':
      section__element.querySelector('.exchange .sell #stone span').innerText = stone_exchange
      section__element.querySelector('.exchange .buy #stone span').innerText = stone_exchange
      break;
  }
}

function updateResource(resource) {
  const section__element = document.getElementById('game_1')

  section__element.querySelector('.resources #gold').innerText = gold

  switch (resource) {
    case 'wood':
      section__element.querySelector('.resources #wood').innerText = wood
      break;
  
    case 'food':
      section__element.querySelector('.resources #food').innerText = food
      break;

    case 'stone':
      section__element.querySelector('.resources #stone').innerText = stone
      break;
  } 
}

function handleSell(resource) {
  switch (resource) {
    case 'wood':
      wood = wood - wood_exchange
      gold = gold + 100
      wood_exchange = wood_exchange - 2
      updateResource('wood')
      updateExchange('wood')
      break;

    case 'food':
      food = food - food_exchange
      gold = gold + 100
      food_exchange = food_exchange - 2
      updateResource('food')
      updateExchange('food')
      break;

    case 'stone':
      stone = stone - stone_exchange
      gold = gold + 100
      stone_exchange = stone_exchange - 2
      updateResource('food')
      updateExchange('food')
      break;
  
    default:
      break;
  }
}

function handleBuy(resource) {
  const section__element = document.getElementById('game_1')

  switch (resource) {
    case 'wood':
      wood = wood + wood_exchange
      gold = gold - 100
      wood_exchange = wood_exchange + 2
      updateResource('wood')
      updateExchange('wood')
      break;

    case 'food':
      food = food + food_exchange
      gold = gold - 100
      food_exchange = food_exchange + 2
      updateResource('food')
      updateExchange('food')
      break;

    case 'stone':
      stone = stone + stone_exchange
      gold = gold - 100
      stone_exchange = stone_exchange + 2
      updateResource('food')
      updateExchange('food')
      break;
  
    default:
      break;
  }
}

function handlePlay() {
  const won = 0.0040
  const promptValue = prompt('Digite um valor em Reais para converter em Wons')
  const wonValue = promptValue * won
  const realValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(wonValue)

  alert('O valor em Reais é ' + realValue)
}