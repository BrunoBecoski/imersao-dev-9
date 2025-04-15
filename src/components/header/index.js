import { createButton } from '../button';
import logoPng from '../../assets/logo.png';
import './styles.css';

export function createHeader(showGame) {
  const header__element = document.createElement('header')
  header__element.className = 'header'

  const img__element = document.createElement('img')
  img__element.src = logoPng
  img__element.alt = 'Imersão Dev Alura'

  const buttons__element = document.createElement('div')

  const button_1__element = createButton({ text: 'Jogo 1' })
  const button_2__element = createButton({ text: 'Jogo 2' })
  const button_3__element = createButton({ text: 'Jogo 3' })
  const button_4__element = createButton({ text: 'Jogo 4' })
  const button_5__element = createButton({ text: 'Jogo 5' })

  button_1__element.onclick = () => showGame(1)
  button_2__element.onclick = () => showGame(2)
  button_3__element.onclick = () => showGame(3)
  button_4__element.onclick = () => showGame(4)
  button_5__element.onclick = () => showGame(5)

  buttons__element.append(
    button_1__element,
    button_2__element,
    button_3__element,
    button_4__element,
    button_5__element,
  )
  
  header__element.appendChild(img__element)
  header__element.appendChild(buttons__element)

  return header__element
}