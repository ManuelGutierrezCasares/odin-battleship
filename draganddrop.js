import { createCoordinatesFromStartingPosition, createDirectionButton, createShipPreview, getCoordinatesFromTagId, getShipsToPlace, getShipLengthFromId } from './helpers.js';
import { PvEprepareAttackListenerTiles, updateBoard } from './display.js';

export const createShipsPreview = (SHIP_TYPES) => {
  const wrapper = document.getElementById('ship-wrapper');
  const arrayOfShips = getShipsToPlace(SHIP_TYPES);
  let tagId, shipLength;

  while (arrayOfShips.length !== 0) {
    shipLength = arrayOfShips.shift();
    tagId = shipLength;
    const directionButton = createDirectionButton(tagId);
    const shipPreview = createShipPreview(shipLength, tagId);
    wrapper.appendChild(shipPreview);
    wrapper.appendChild(directionButton);
  }

  // const draggable = document.getElementById('draggable-1');
  // draggable.textContent = shipLength;
  // draggable.ondragstart = dragstartHandler;
};

export const createGameInstructions = () => {
  const div = document.getElementById('instructions');
  div.textContent = 'Place your ships on your board by dragging the dark blue part of each ship into the board';
};

export const dropShip = (board, coordinates, orientation, shipLength) => {
  // if (orientation === 'vertical')
  // if (orientation === 'horizontal')
};

export function dragstartHandler (e) {
  // Add the target element's id to the data transfer object
  e.dataTransfer.clearData();
  e.dataTransfer.setData('text', e.target.id);
  e.dataTransfer.dropEffect = 'move';
}

export function dragoverHandler (ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';

  // console.log(ev.dataTransfer.getData('text'));
};

export function dropHandler (ev, game) {
  console.log('GAME: ', game);
  console.log('ev is: ', ev);
  // console.log('game is: ', game);
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  const data = ev.dataTransfer.getData('text');
  // Get position to placeship
  const startingPositionToPlaceShip = getCoordinatesFromTagId(ev.target, 1);
  const shipLength = parseInt(getShipLengthFromId(data));
  const directionBtn = document.getElementById(`btn-draggable-${shipLength}`);
  const directionHandler = directionBtn.value;
  console.log('SHIP LENGTH IS: ', shipLength);
  console.log('DATA IS: ', JSON.stringify(data));
  console.log('startingPositionToPlaceShip: ', startingPositionToPlaceShip);
  console.log('CURRENT DIRECTION IS: ', directionHandler);
  const arrOfPos = createCoordinatesFromStartingPosition(startingPositionToPlaceShip, shipLength, directionHandler);
  console.log('arrofpos: ', arrOfPos);
  console.log('arrofposlength: ', arrOfPos.length);
  if (game.player1.ownGameboard.placeShip(shipLength, arrOfPos)) {
    console.log('SHIP PLACED');
    deleteCurrentShip(shipLength);
    // Place PC ship
    game.player2.ownGameboard.placeShipRandomPosition(shipLength);
  }

  if (checkDivs()) {
    alert('time to play');
    PvEprepareAttackListenerTiles(game, 2);
  }
  updateBoard(game.player1.ownGameboard.board, game.player1.ownGameboard.ships, 1);
  updateBoard(game.player2.ownGameboard.board, game.player2.ownGameboard.ships, 2);
  // return startingPositionToPlaceShip;
};

const deleteCurrentShip = (id) => {
  const wrapper = document.getElementById('ship-wrapper');
  const btn = document.getElementById(`btn-draggable-${id}`);
  const p = document.getElementById(`draggable-${id}`);
  wrapper.removeChild(btn);
  wrapper.removeChild(p);
};

function checkDivs () {
  const wrapper = document.getElementById('ship-wrapper');
  if (wrapper.childElementCount === 0) {
    return true;
  }
  return false;
}
