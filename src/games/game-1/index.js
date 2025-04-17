import { createButtonMarket } from './components/buttonMarket'

import marketImg from '../../assets/market.png'
import goldImg from '../../assets/gold.png'
import woodImg from '../../assets/wood.png'
import foodImg from '../../assets/food.png'
import stoneImg from '../../assets/stone.png'

export function createGame1() {
  const section__element = document.createElement('section')
  const img__element = document.createElement('img')
  const img__element_gold = document.createElement('img')
  const img__element_wood = document.createElement('img')
  const img__element_food = document.createElement('img')
  const img__element_stone = document.createElement('img')

  img__element.src = marketImg
  img__element_gold.src = goldImg
  img__element_wood.src = woodImg
  img__element_food.src = foodImg
  img__element_stone.src = stoneImg
  
  section__element.innerHTML = `
    <div class="container">
      <div class="content">
        <h2>Quem ganha, ganha em Wons!</h2>
        <p>Que tal converter esse valor</p>
        <button>Bora converter!</button>
      </div>
    </div>
  `
  const button_gold__element = createButtonMarket({
    price: '100',
    img__element: img__element_gold,
    handleClick: () => console.log('vender ouro'),
    title: 'Vender'
  })

  const button_wood__element = createButtonMarket({
    price: '100',
    img__element: img__element_wood,
    handleClick: () => console.log('vender madeira'),
    title: 'Vender'
  })

  const button_food__element = createButtonMarket({
    price: '100',
    img__element: img__element_food,
    handleClick: () => console.log('vender comida'),
    title: 'Vender'
  })

  const button_stone__element = createButtonMarket({
    price: '100',
    img__element: img__element_stone,
    handleClick: () => console.log('vender ouro'),
    title: 'Vender'
  })

  section__element.append(
    img__element,
    button_gold__element,
    button_wood__element,
    button_food__element,
    button_stone__element,
  )

  section__element.querySelector('button').onclick = () => handlePlay()

  return section__element
}

function handlePlay() {
  const won = 0.0040
  const promptValue = prompt('Digite um valor em Reais para converter em Wons')
  const wonValue = promptValue * won
  const realValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(wonValue)

  alert('O valor em Reais é ' + realValue)
}