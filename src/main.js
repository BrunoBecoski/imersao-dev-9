import { createNav } from './components/nav';
import { createGame1 } from './games/game-1';
import { createGame2 } from './games/game-2';
import { createGame3 } from './games/game-3';
import { createGame4 } from './games/game-4';
import { createGame5 } from './games/game-5';
import './style.css';

const root_element = document.querySelector('#root')

const nav__element = createNav(showGame)

const main__element = document.createElement('main')

root_element.append(nav__element, main__element)

function showGame(game) {
  main__element.innerHTML = ''
  let game__element

  switch (game) {
    case 1:
      game__element = createGame1()
      break;
    
    case 2:
      game__element = createGame2()
      break;
      
    case 3:
      game__element = createGame3()
      break;

    case 4:
      game__element = createGame4()
      break;

    case 5:
      game__element = createGame5()
      break;

    default:
      game__element = ''
      break;
    }

  main__element.appendChild(game__element)
  root_element.append(nav__element, main__element)
}
