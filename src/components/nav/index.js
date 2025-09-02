import { createButton } from '../button';
import './styles.css';

export function createNav(showGame) {
  const nav__element = document.createElement('nav')
  nav__element.className = 'nav'

  const h1__element = document.createElement('h1')
  h1__element.innerText = 'Imersão DEV - Alura'
  
  const ul__element = document.createElement('ul')

  const li_1__element = 
    document.createElement('li').innerHTML = 
    createButton({ text: 'Jogo 1', handleClick: () => showGame(1) })
  const li_2__element = 
    document.createElement('li').innerHTML = 
    createButton({ text: 'Jogo 2', handleClick: () => showGame(2) })
  const li_3__element = 
    document.createElement('li').innerHTML = 
    createButton({ text: 'Jogo 3', handleClick: () => showGame(3) })
  const li_4__element = 
    document.createElement('li').innerHTML = 
    createButton({ text: 'Jogo 4', handleClick: () => showGame(4) })
  const li_5__element = 
    document.createElement('li').innerHTML = 
    createButton({ text: 'Jogo 5', handleClick: () => showGame(5) })

  ul__element.append(
    li_1__element,
    li_2__element,
    li_3__element,
    li_4__element,
    li_5__element,
  )
  
  const footer__element = document.createElement('footer')
  footer__element.className = 'footer'
  footer__element.innerText = 'Alura - Imersão DEV - 2025'
  
  nav__element.appendChild(h1__element)
  nav__element.appendChild(ul__element)
  nav__element.appendChild(footer__element)

  return nav__element
}