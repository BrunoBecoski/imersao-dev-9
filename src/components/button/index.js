import './styles.css';

export function createButton({ text, handleClick }) {
  const button__element = document.createElement('button')

  button__element.innerText = text
  button__element.onclick = () => handleClick()
  
  return button__element
}