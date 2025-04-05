export function createGame1() {
  const section__element = document.createElement('section')
  
  section__element.innerHTML = `
    <div class="container">
      <div class="content">
        <h2>Quem ganha, ganha em Wons!</h2>
        <p>Que tal converter esse valor</p>
        <button>Bora converter!</button>
      </div>
    </div>
  `

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