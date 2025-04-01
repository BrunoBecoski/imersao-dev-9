import './style.css'

function handleChangeRoute(route) {
  if (route === '1') {
    document.querySelector('#main').innerHTML = aula1.innerHTML
  }
}

const header = document.querySelector('#header')

header.innerHTML = `
  <div>
    <img src="https://i.postimg.cc/GpCxYmvc/title.png" alt="Logo">

    <div class="container">
      <div class="content">
        <h2>Quem ganha, ganha em Wons!</h2>
        <p> Que tal converter esse valor?</p>
        <button id="converter" type="button">Bora converter!</button>
      </div>
    </div>
  
  <footer>Alura - Imersão DEV - 2025</footer>
  </div>
`

document.querySelector('#converter').onclick = () => handleConverter()

const won = 0.0040

function handleConverter() {
  const promptValue = prompt('Digite um valor em Reais para converter em Wons')

  const wonValue = promptValue * won

  const realValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(wonValue)

  alert('O valor em Reais é ' + realValue)
}