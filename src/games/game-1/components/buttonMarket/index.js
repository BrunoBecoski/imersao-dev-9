import './styles.css'

export function createButtonMarket({ price, img__element, handleClick, title }) {
  const button__element = document.createElement('button')
  button__element.className = 'button'

  button__element.append(price, img__element, title)

  button__element.onclick = () => handleClick()

  return button__element
}