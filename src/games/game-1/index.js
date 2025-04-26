import marketImg from '../../assets/market.png'
import goldImg from '../../assets/gold.png'
import woodImg from '../../assets/wood.png'
import foodImg from '../../assets/food.png'
import stoneImg from '../../assets/stone.png'

import './styles.css'

function createGold() {
  let quantity = 1500

  function increase() {
    quantity = quantity + 100
    render()
  }

  function decrease() {
    quantity = quantity - 100
    render()
  }

  function render() {
    document.getElementById('gold_resource').innerText = quantity
  }

  return {
    quantity: () => quantity,
    increase, 
    decrease,
  }
}

function createWood() {
  let quantity = 500
  let price = 100

  function increase() {
    quantity = quantity + price
    if (price < 220) {
      price = price + 5
    }
    render()
  }

  function decrease() {
    quantity = quantity - price
    if (price > 20) {
      price = price - 5
    }

    render()
  }

  function render() {
    document.getElementById('wood_resource').innerText = quantity
    document.getElementById('buy_wood_price').innerText = price
    document.getElementById('sell_wood_price').innerText = price
  }

  return {
    quantity: () => quantity,
    price: () => price,
    increase,
    decrease,
  }
}

function createFood() {
  let quantity = 500
  let price = 115

  function increase() {
    quantity = quantity + price
    if (price < 220) {
      price = price + 5
    }
    render()
  }

  function decrease() {
    quantity = quantity - price
    if (price > 20) {
      price = price - 5
    }
    render()
  }

  function render() {
    document.getElementById('food_resource').innerText = quantity
    document.getElementById('buy_food_price').innerText = price
    document.getElementById('sell_food_price').innerText = price
  }

  return {
    quantity: () => quantity,
    price: () => price,
    increase,
    decrease,
  }
}

function createStone() {
  let quantity = 500
  let price = 130

  function increase() {
    quantity = quantity + price
    if (price < 220) {
      price = price + 5
    }
    render()
  }

  function decrease() {
    quantity = quantity - price
    if (price > 20) {
      price = price - 5
    }
    render()
  }

  function render() {
    document.getElementById('stone_resource').innerText = quantity
    document.getElementById('buy_stone_price').innerText = price
    document.getElementById('sell_stone_price').innerText = price
  }

  return {
    quantity: () => quantity,
    price: () => price,
    increase,
    decrease,
  }
}

const gold = createGold()
const wood = createWood()
const food = createFood()
const stone = createStone()

export function createGame1() {
  const section__element = document.createElement('section')

  section__element.innerHTML = `
    <div id="game_1">
      <div class="resources">
        <div><img src=${goldImg} /><span id="gold_resource">${gold.quantity()}</span></div>
        <div><img src=${woodImg} /><span id="wood_resource">${wood.quantity()}</span></div>
        <div><img src=${foodImg} /><span id="food_resource">${food.quantity()}</span></div>
        <div><img src=${stoneImg} /><span id="stone_resource">${stone.quantity()}</span></div>
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

  section__element.querySelector('#sell_wood').addEventListener('click', () => { 
    if (wood.quantity() >= wood.price()) {
      wood.decrease()
      gold.increase()
    }
  })
  section__element.querySelector('#sell_food').addEventListener('click', () => { 
    if (food.quantity() >= food.price()) {
      food.decrease() 
      gold.increase()
    }  
  })
  section__element.querySelector('#sell_stone').addEventListener('click', () => { 
    if (stone.quantity() >= stone.price()) {
      stone.decrease()
      gold.increase()
    } 
   })

  section__element.querySelector('#buy_wood').addEventListener('click', () => { 
    if (gold.quantity() >= 100) {
      wood.increase()
      gold.decrease()
    }
  })
  section__element.querySelector('#buy_food').addEventListener('click', () => { 
    if (gold.quantity() >= 100) {
      food.increase()
      gold.decrease()
    }
  })
  section__element.querySelector('#buy_stone').addEventListener('click', () => {
    if (gold.quantity() >= 100) {
      stone.increase()
      gold.decrease()
    }
  })

  return section__element
}

// function handlePlay() {
//   const won = 0.0040
//   const promptValue = prompt('Digite um valor em Reais para converter em Wons')
//   const wonValue = promptValue * won
//   const realValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(wonValue)

//   alert('O valor em Reais é ' + realValue)
// }