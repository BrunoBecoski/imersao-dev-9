import marketImg from '../../assets/market.png'
import goldImg from '../../assets/gold.png'
import woodImg from '../../assets/wood.png'
import foodImg from '../../assets/food.png'
import stoneImg from '../../assets/stone.png'

import './styles.css'


export function createGame1() {
  const section__element = document.createElement('section')
  const gold = 100
  const wood = 100
  const food = 100
  const stone = 100

  section__element.innerHTML = `
    <div class="game_1">
      <div class="resources">
        <div>
          <img src=${goldImg} />
          <span>${gold}</span>
        </div>

        <div>
          <img src=${woodImg} />
          <span>${wood}</span>
        </div>

        <div>
          <img src=${foodImg} />
          <span>${food}</span>
        </div>

        <div>
          <img src=${stoneImg} />
          <span>${stone}</span>
        </div>
      </div>

      <div class="market">
        <img src=${marketImg} />

        <div class="exchange">
          <div class="sell">
            <button>100 <img src=${woodImg} /> Vender</button>
            <button>100 <img src=${foodImg} /> Vender</button>
            <button>100 <img src=${stoneImg} /> Vender</button>
          </div>

          <div class="buy">
            <button>100 <img src=${woodImg} /> Comprar</button>
            <button>100 <img src=${foodImg} /> Comprar</button>
            <button>100 <img src=${stoneImg} /> Comprar </button>
          </div>
        </div>
      </div>
    </div>
  `

  return section__element
}

function handlePlay() {
  const won = 0.0040
  const promptValue = prompt('Digite um valor em Reais para converter em Wons')
  const wonValue = promptValue * won
  const realValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(wonValue)

  alert('O valor em Reais é ' + realValue)
}