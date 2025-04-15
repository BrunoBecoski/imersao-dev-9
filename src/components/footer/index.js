import './styles.css';

export function createFooter() {
  const footer__element = document.createElement('footer')
  footer__element.className = 'footer'
  footer__element.innerText = 'Alura - Imersão DEV - 2025'

  return footer__element
}