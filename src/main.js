import './style.css'
const header = document.querySelector('#header')
const main = document.querySelector('#main')
const footer = document.querySelector('#footer')

header.innerHTML = `
  <img src="https://i.postimg.cc/GpCxYmvc/title.png" alt="Logo">
  <div class="buttons">
    <button id="aula-1">Aula 1</button>
    <button id="aula-2">Aula 2</button>
    <button id="aula-3">Aula 3</button>
  </div>
`

main.innerHTML = `
  <div class="container">
    <div class="content">
      <h2></h2>
      <p></p>
      <button></button>
    </div>
  </div>
`

footer.innerHTML = `
  <footer>Alura - Imersão DEV - 2025</footer>
`

header.querySelector('#aula-1').onclick = () => {
  main.querySelector('h2').innerText = 'Quem ganha, ganha em Wons!'
  main.querySelector('p').innerText = 'Que tal converter esse valor'
  main.querySelector('button').innerText = 'Bora converter!'
  main.querySelector('button').onclick = () => handlePlayAula1()
}

header.querySelector('#aula-2').onclick = () => {
  main.querySelector('h2').innerText = 'Pra ganhar é preciso arriscar!'
  main.querySelector('p').innerText = 'PEDRA, PAPEL ou TESOURA?'
  main.querySelector('button').innerText = 'Bora jogar!'
  main.querySelector('button').onclick = () => handlePlayAula2()
}

header.querySelector('#aula-3').onclick = () => {
  main.querySelector('h2').innerText = 'Pra ganhar, é preciso coragem!'
  main.querySelector('p').innerText = 'Até mesmo para pisar em um chão feito de vidro'
  main.querySelector('button').innerText = 'Bora jogar!'
  main.querySelector('button').onclick = () => handlePlayAula3()
}

function handlePlayAula1() {
  const won = 0.0040

  const promptValue = prompt('Digite um valor em Reais para converter em Wons')

  const wonValue = promptValue * won

  const realValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(wonValue)

  alert('O valor em Reais é ' + realValue)
}

function handlePlayAula2() {
  const age = prompt("Quantos anos você tem?") 

  if (age < 18) {
    alert('Você NÃO pode jogar jokenpo')
  } else {
    const playerChoice = prompt('Digite 1-Pedra, 2-Papel ou 3-Tesoura?')
    const computerChoice = Math.floor(Math.random() * 3) + 1

    if (playerChoice == computerChoice) {
      alert('Empate!!')
    }

    if (playerChoice == 1) {
      if (computerChoice == 2) {
        alert('Computador venceu, escolheu papel')
      }

      if (computerChoice == 3) {
        alert('Você venceu, computador escolheu tesoura')
      }
    }

    if (playerChoice == 2) {
      if (computerChoice == 1) {
        alert('Você venceu, computador escolheu pedra')
      }

      if (computerChoice == 3) {
        alert('Computador venceu, escolheu tesoura')
      }
    }

    if (playerChoice == 3) {
      if (computerChoice == 1) {
        alert('Computador venceu, computador escolheu pedra')
      }

      if (computerChoice == 2) {
        alert('Você venceu, escolheu tesoura')
      }
    }
  }
}

function handlePlayAula3() {
  let round = 1
  let win = false

  while(round <= 3) {
    const playerChoice = prompt(`Nível ${round}, escolha um vidro entre (1, 2, 3)?` )
    const brokenFloor = Math.floor(Math.random() * 3) + 1
   
    if (['1', '2', '3'].includes(playerChoice)) {
      if (playerChoice == brokenFloor) {
        alert('Vidro quebrou! Acabou o jogo para você.')
        return
      } else {
        alert(`Passou! Piso quebrado estava na ponte: ${brokenFloor}.`)
  
        win = true
        
        round = round + 1
      }
    } else {
      alert('Escolha inválida')
    }
  }

  if (win == true) {
    alert('Parabéns você venceu!')    
  }
}