import relicImg from '../../assets/relic.png'

import './styles.css';

export function createRelic() {
  const div__element = document.createElement('div')
  const img__element = document.createElement('img')

  div__element.className = 'relic' 
  img__element.src = relicImg

  div__element.appendChild(img__element)

  return div__element
}