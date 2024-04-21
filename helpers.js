import { dragstartHandler } from './draganddrop.js';

export const compareArrays = (a, b) => {
  return a.toString() === b.toString();
};

export const TOKENS = {
  empty: 'o',
  ship: 's',
  hit: 'x',
  miss: 'm'
};

export const SHIP_TYPES = {
  availableShips: {
    battleship: {
      amount: 1,
      length: 4
    },
    cruiser: {
      amount: 1,
      length: 3
    },
    submarine: {
      amount: 1,
      length: 2
    },
    patrolBoat: {
      amount: 1,
      length: 1
    }
  },
  maxLength: 4,
  minLength: 1

};

export const getShipsToPlace = (obj) => {
  const ships = [];

  const copy = JSON.parse(JSON.stringify(obj));
  const tmp = Object.values(copy.availableShips);
  tmp.forEach(shipType => {
    while (shipType.amount !== 0) {
      ships.push(shipType.length);
      shipType.amount--;
    }
  });
  return ships;
};

export const convertUserInputToPosition = (string) => {
  return string.split('-')
    .map((e) => e.split(',')
      .map(Number));
};

export const getRandomPosition = () => {
  const randomX = Math.floor(Math.random() * 10); const randomY = Math.floor(Math.random() * 10);
  return [randomX, randomY];
};

export const checkRandomPosition = (player, pos) => {
  const x = pos[0]; const y = pos[1];
  return !!((player.ownGameboard.board[x][y] === 'o' || player.ownGameboard.board[x][y] === 's'));
};

export const pcAttack = (game) => {
  let randomPositionToAttack = getRandomPosition();
  while (true) {
    if (checkRandomPosition(game.player1, randomPositionToAttack)) break;
    randomPositionToAttack = getRandomPosition();
  }

  return game.player2.attackEnemy(game.player1, randomPositionToAttack);
};

export const getCoordinatesFromTagId = (target, id) => {
  const x = parseInt(target.id.replace(`player-${id}-cell-`, '').charAt(0));
  const y = parseInt(target.id.replace(`player-${id}-cell-`, '').charAt(1));
  return [x, y];
};

export const createShipPreview = (shipLength, tagId) => {
  const div = document.createElement('div');
  const imgWidth = 32 * shipLength;
  const span = document.createElement('span');
  span.textContent = 'drag';
  span.style.color = 'white';

  div.style.background = 'linear-gradient(90deg, rgba(4,31,97,1) 32px, rgba(0,212,255,1) 32px, rgba(0,212,255,1) 100%)';
  div.id = `draggable-${tagId}`;
  div.draggable = 'true';
  div.style.width = `${imgWidth}px`;
  div.style.height = '32px';
  div.style.marginTop = '10px';
  div.style.marginBottom = '5px';
  div.style.display = 'flex';
  div.style.flexDirection = 'column';
  div.style.justifyContent = 'end';
  div.ondragstart = dragstartHandler;
  div.appendChild(span);
  return div;
};

export const createDirectionButton = (tagId) => {
  const btn = document.createElement('button');
  btn.id = `btn-draggable-${tagId}`;
  btn.value = 'horizontal';
  btn.textContent = 'horizontal';
  btn.onclick = () => {
    modifyShipPreviewDirection(tagId);
    modifyShipSelectPreviewDirection(tagId, btn.value);
    if (btn.value === 'horizontal') {
      btn.value = 'vertical';
      btn.textContent = 'vertical';
      return;
    }
    btn.value = 'horizontal';
    btn.textContent = 'horizontal';
  };
  return btn;
};

const modifyShipPreviewDirection = (tagId) => {
  const div = document.getElementById(`draggable-${tagId}`);

  const tmp = div.style.width;
  div.style.width = div.style.height;
  div.style.height = tmp;
};
const modifyShipSelectPreviewDirection = (tagId, direction) => {
  const div = document.getElementById(`draggable-${tagId}`);

  if (direction === 'horizontal') {
    div.style.background = 'linear-gradient(0deg, rgba(4,31,97,1) 32px, rgba(0,212,255,1) 32px, rgba(0,212,255,1) 100%)';
  } else {
    div.style.background = 'linear-gradient(90deg, rgba(4,31,97,1) 32px, rgba(0,212,255,1) 32px, rgba(0,212,255,1) 100%)';
  }
};

export const createCoordinatesFromStartingPosition = (startingPosition, shipLength, direction) => {
  if (direction === 'horizontal') {
    const fullPosition = Array(shipLength);
    for (let i = 0; i < shipLength; i++) {
      fullPosition[i] = [startingPosition[0] + i, startingPosition[1]];
    }
    return fullPosition;
  }
  if (direction === 'vertical') {
    const fullPosition = Array(shipLength);
    for (let i = 0; i < shipLength; i++) {
      fullPosition[i] = [startingPosition[0], startingPosition[1] + i];
    }
    return fullPosition;
  }
};

export const getShipLengthFromId = (id) => {
  return id.split('-')[1];
};
