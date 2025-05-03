import marketImg from '../../assets/market.png'
import goldImg from '../../assets/gold.png'
import woodImg from '../../assets/wood.png'
import foodImg from '../../assets/food.png'
import stoneImg from '../../assets/stone.png'

import './styles.css'

export function createGame1() {
  resetResource()

  const section__element = document.createElement('section')

  section__element.innerHTML = `
    <div id="game_1">
      <div class="resources">
        <div>
          <div id="animation-gold"></div>
          <img src=${goldImg} />
          <span id="gold_quantity">${gold.quantity()}</span>
        </div>
        <div>
          <div id="animation-wood"></div>
          <img src=${woodImg} />
          <span id="wood_quantity">${wood.quantity()}</span>
        </div>
        <div>
          <div id="animation-food"></div>
          <img src=${foodImg} />
          <span id="food_quantity">${food.quantity()}</span>
        </div>
        <div>
          <div id="animation-stone"></div>
          <img src=${stoneImg} />
          <span id="stone_quantity">${stone.quantity()}</span>
        </div>
      </div>

      <div class="market">
        <img src=${marketImg} />

        <div class="exchange">
          <div class="sell">
            <button id="sell_wood" title="Madeira"><span id="sell_wood_price">${wood.price()}</span> <img src=${woodImg} /> Vender</button>
            <button id="sell_food" title="Comida"><span id="sell_food_price">${food.price()}</span> <img src=${foodImg} /> Vender</button>
            <button id="sell_stone" title="Pedra"><span id="sell_stone_price">${stone.price()}</span> <img src=${stoneImg} /> Vender</button>
          </div>

          <div class="buy">
            <button id="buy_wood" title="Madeira"><span id="buy_wood_price">${wood.price()}</span> <img src=${woodImg} /> Comprar</button>
            <button id="buy_food" title="Comida"><span id="buy_food_price">${food.price()}</span> <img src=${foodImg} /> Comprar</button>
            <button id="buy_stone" title="Pedra"><span id="buy_stone_price">${stone.price()}</span> <img src=${stoneImg} /> Comprar </button>
          </div>
        </div>
      </div>
    </div>
  ` 

  section__element.querySelector('#sell_wood').addEventListener('click', () => handleSell('wood'))
  section__element.querySelector('#sell_food').addEventListener('click', () => handleSell('food'))
  section__element.querySelector('#sell_stone').addEventListener('click', () => handleSell('stone'))

  section__element.querySelector('#buy_wood').addEventListener('click', () => handleBuy('wood'))
  section__element.querySelector('#buy_food').addEventListener('click', () => handleBuy('food'))
  section__element.querySelector('#buy_stone').addEventListener('click', () => handleBuy('stone'))

  return section__element
}

const supplyDemand = 5

const gold = createResource({
  name: 'gold',
  initialQuantity: 1500,
  initialPrice: 100,
  supplyDemand: 0,
})

const wood = createResource({
  name: 'wood',
  initialQuantity: 500,
  initialPrice: 100,
  supplyDemand,
})

const food = createResource({
  name: 'food',
  initialQuantity: 500,
  initialPrice: 115,
  supplyDemand,
})

const stone = createResource({
  name: 'stone',
  initialQuantity: 500,
  initialPrice: 130,
  supplyDemand,
})

function createResource(resource) {
  const { name, initialQuantity, initialPrice, supplyDemand } = resource

  let quantity = initialQuantity
  let price = initialPrice

  function reset() {
    quantity = initialQuantity
    price = initialPrice
  }

  function increase() {
    quantity = quantity + price

    if (price < 220) {
      price = price + supplyDemand
    }
    renderResource({
      name,
      type: 'increase',
      quantity,
      price,
    })
  }

  function decrease() {
    quantity = quantity - price

    if (price > 20) {
      price = price - supplyDemand
    }

    renderResource({
      name,
      type: 'decrease',
      quantity,
      price,
    })
  }

  return {
    reset,
    quantity: () => quantity,
    price: () => price,
    increase,
    decrease,
  }
}

function renderResource(resource)  {
  const { name, type, quantity, price } = resource

  const div__element = document.getElementById(`animation-${name}`)
  const span__element = document.createElement('span')

  span__element.className = `animation-${type}`
  span__element.innerText = (type === 'increase' ?  '+' : '-') + price
  span__element.style.color = type === 'increase' ? '#00FE00' : '#EB0000'

  div__element.appendChild(span__element)
  
  document.getElementById(`${name}_quantity`).innerText = quantity
  if (name != 'gold') {
    document.getElementById(`buy_${name}_price`).innerText = price
    document.getElementById(`sell_${name}_price`).innerText = price
  }

  setTimeout(() => {
    div__element.removeChild(span__element)
  }, 1000);
}

function resetResource() {
  gold.reset()
  wood.reset()
  food.reset()
  stone.reset()
}

function handleSell(resource) {
  switch (resource) {
    case 'wood':
      if (wood.quantity() >= wood.price()) {
        wood.decrease()
        gold.increase()
      }
      break;

    case 'food':
      if (food.quantity() >= food.price()) {
        food.decrease() 
        gold.increase()
      }
      break;

    case 'stone':
      if (stone.quantity() >= stone.price()) {
        stone.decrease()
        gold.increase()
      }
      break;
  
    default:
      break;
  }

  enableDisableExchange()
}

function handleBuy(resource) {
  if (gold.quantity() >= gold.price()) {
    switch (resource) {
      case 'wood':
        wood.increase()
        gold.decrease()
        break;

      case 'food':
        food.increase()
        gold.decrease()
        break;

      case 'stone':
        stone.increase()
        gold.decrease()
        break;
  
      default:
        break;
    }

    enableDisableExchange()
  }
}

function enableDisableExchange() {
  document.getElementById('buy_wood').disabled = gold.quantity() < gold.price()
  document.getElementById('buy_food').disabled = gold.quantity() < gold.price()
  document.getElementById('buy_stone').disabled = gold.quantity() < gold.price()
  document.getElementById('sell_wood').disabled = wood.quantity() < wood.price()
  document.getElementById('sell_food').disabled = food.quantity() < food.price()
  document.getElementById('sell_stone').disabled = stone.quantity() < stone.price()
}

// function handlePlay() {
//   const won = 0.0040
//   const promptValue = prompt('Digite um valor em Reais para converter em Wons')
//   const wonValue = promptValue * won
//   const realValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(wonValue)

//   alert('O valor em Reais é ' + realValue)
// }