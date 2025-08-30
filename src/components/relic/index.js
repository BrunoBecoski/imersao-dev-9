import relicImg from '../../assets/relic.png'

import './styles.css';

export function createRelic() {
  const div__element = document.createElement('div')
  const img__element = document.createElement('img')
  const reflection__element = document.createElement('img')

  div__element.className = 'relic' 
  img__element.src = relicImg
  reflection__element.src = relicImg

  img__element.className = 'image'
  reflection__element.className = 'reflection'

  div__element.append(img__element, reflection__element)

  return div__element
}