export function createGame4() {
  const section__element = document.createElement('section')
  
  section__element.innerHTML = `
    <div class="container">
      <div class="content">
        <h2>Força ou Queda</h2>
        <p>Escolha 3 jogadores para seu time:</p>
        <button>Ver Resultado</button>
      </div>
    </div>
  `

  section__element.querySelector('button').onclick = () => handlePlay()

  return section__element
}

function handlePlay() {
  const characters = []
  const villains = []

  let charactersForce = 0
  let villainsForce = 0
  
  for(let i = 0; i < 3; i++) {
    characters[i] = prompt(`Digite o nome do seu ${i + 1}º personagem`)
    charactersForce += Math.floor(Math.random() * 10) + 1
  }

  for(let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * 6)
    const possibleVillains = [
      'Nazaré Tedesco',
      'Odete Roitman',
      'Flora',
      'Carminha',
      'Laura Prudente da Costa ',
      'Bia Falcão',
    ]

    villains[i] = possibleVillains[randomIndex] 
    villainsForce += Math.floor(Math.random() * 10) + 1
  }

  if (charactersForce > villainsForce) {
    alert('Seu time é muito forte! Você ganhou a disputa de cabo de guerra! Sua força foi de: ' + charactersForce)
  } else {
    if (charactersForce < villainsForce) {
      alert('Seu time é fraquinho. O computador ganhou o cabo de guerra com força de: ' + villainsForce)
    } else {
      alert('Os dois times tem a mesma força! Vocês empataram com a força de: ' + charactersForce)
    }
  }
}