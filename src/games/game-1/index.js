import marketImg from '../../assets/market.png'
import goldImg from '../../assets/gold.png'
import woodImg from '../../assets/wood.png'
import foodImg from '../../assets/food.png'
import stoneImg from '../../assets/stone.png'

import './styles.css'

function createGold() {
  let quantity = 1500

  function reset() {
    quantity = 1500
  }

  function increase() {
    quantity = quantity + 100
    render('increase')
  }

  function decrease() {
    quantity = quantity - 100
    render('decrease')
  }

  function render(type) {
    const div__element = document.getElementById('animation-gold')

    const span__element = document.createElement('span')
    span__element.className = type === 'increase' ? 'animation-increase' : 'animation-decrease'
    span__element.innerText = type === 'increase' ? '+ 100' : '- 100'
    span__element.style.color = type === 'increase' ? '#00FE00' : '#EB0000'

    div__element.appendChild(span__element)

    document.getElementById('gold_quantity').innerText = quantity
    
    setTimeout(() => {
      div__element.removeChild(span__element)
    }, 1000);
  }

  return {
    reset,
    quantity: () => quantity,
    increase,
    decrease,
  }
}

function createWood() {
  let quantity = 500
  let price = 100

  function reset() {
    quantity = 500
    price = 100
  }

  function increase() {
    quantity = quantity + price
    if (price < 220) {
      price = price + 5
    }
    render('increase')
  }

  function decrease() {
    quantity = quantity - price
    if (price > 20) {
      price = price - 5
    }

    render('decrease')
  }

  function render(type) {
    const div__element = document.getElementById('animation-wood')

    const span__element = document.createElement('span')
    span__element.className = type === 'increase' ? 'animation-increase' : 'animation-decrease'
    span__element.innerText = type === 'increase' ?  `+ ${price}` : `- ${price}`
    span__element.style.color = type === 'increase' ? '#00FE00' : '#EB0000'

    div__element.appendChild(span__element)

    document.getElementById('wood_quantity').innerText = quantity
    document.getElementById('buy_wood_price').innerText = price
    document.getElementById('sell_wood_price').innerText = price
    
    setTimeout(() => {
      div__element.removeChild(span__element)
    }, 1000);
  }

  return {
    reset,
    quantity: () => quantity,
    price: () => price,
    increase,
    decrease,
  }
}

function createFood() {
  let quantity = 500
  let price = 115

  function reset() {
    quantity = 500
    price = 115
  }

  function increase() {
    quantity = quantity + price
    if (price < 220) {
      price = price + 5
    }
    render('increase')
  }

  function decrease() {
    quantity = quantity - price
    if (price > 20) {
      price = price - 5
    }
    render('decrease')
  }

  function render(type) {
    const div__element = document.getElementById('animation-food')

    const span__element = document.createElement('span')
    span__element.className = type === 'increase' ? 'animation-increase' : 'animation-decrease'
    span__element.innerText = type === 'increase' ?  `+ ${price}` : `- ${price}`
    span__element.style.color = type === 'increase' ? '#00FE00' : '#EB0000'

    div__element.appendChild(span__element)

    document.getElementById('food_quantity').innerText = quantity
    document.getElementById('buy_food_price').innerText = price
    document.getElementById('sell_food_price').innerText = price
    
    setTimeout(() => {
      div__element.removeChild(span__element)
    }, 1000);
  }

  return {
    reset,
    quantity: () => quantity,
    price: () => price,
    increase,
    decrease,
  }
}

function createStone() {
  let quantity = 500
  let price = 130

  function reset() {
    quantity = 500
    price = 130
  }

  function increase() {
    quantity = quantity + price
    if (price < 220) {
      price = price + 5
    }
    render('increase')
  }

  function decrease() {
    quantity = quantity - price
    if (price > 20) {
      price = price - 5
    }
    render('decrease')
  }

  function render(type) {
    const div__element = document.getElementById('animation-stone')

    const span__element = document.createElement('span')
    span__element.className = type === 'increase' ? 'animation-increase' : 'animation-decrease'
    span__element.innerText = type === 'increase' ?  `+ ${price}` : `- ${price}`
    span__element.style.color = type === 'increase' ? '#00FE00' : '#EB0000'

    div__element.appendChild(span__element)

    document.getElementById('stone_quantity').innerText = quantity
    document.getElementById('buy_stone_price').innerText = price
    document.getElementById('sell_stone_price').innerText = price

    setTimeout(() => {
      div__element.removeChild(span__element)
    }, 1000);
  }

  return {
    reset,
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
  gold.reset()
  wood.reset()
  food.reset()
  stone.reset()

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

  section__element.querySelector('#sell_wood').addEventListener('click', (event) => { 
    if (wood.quantity() >= wood.price()) {
      wood.decrease()
      gold.increase()
    }

    if (wood.quantity() <= wood.price()) {
      event.currentTarget.disabled = true;
    }
  })
  section__element.querySelector('#sell_food').addEventListener('click', (event) => { 
    if (food.quantity() >= food.price()) {
      food.decrease() 
      gold.increase()
    }  

    if (food.quantity() <= food.price()) {
      event.currentTarget.disabled = true
    }
  })
  section__element.querySelector('#sell_stone').addEventListener('click', (event) => { 
    if (stone.quantity() >= stone.price()) {
      stone.decrease()
      gold.increase()
    } 

    if (stone.quantity() <= stone.price()) {
      event.currentTarget.disabled = true
    }
   })

  section__element.querySelector('#buy_wood').addEventListener('click', (event) => { 
    if (gold.quantity() >= 100) {
      wood.increase()
      gold.decrease()
    }

    if (gold.quantity() <= 100) {
      event.currentTarget.disabled = true
    }
  })
  section__element.querySelector('#buy_food').addEventListener('click', (event) => { 
    if (gold.quantity() >= 100) {
      food.increase()
      gold.decrease()
    }

    if (gold.quantity() <= 100) {
      event.currentTarget.disabled = true
    }
  })
  section__element.querySelector('#buy_stone').addEventListener('click', (event) => {
    if (gold.quantity() >= 100) {
      stone.increase()
      gold.decrease()
    }

    if (gold.quantity() <= 100) {
      event.currentTarget.disabled = true
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