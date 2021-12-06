var board = null
var game = new Chess()

function pickUpPiece (source, piece, position, orientation) {
  if (game.game_over()) {
    return false /* Do not allow player to pick up piece if the game is over */
  }
  if (piece.search(/^b/) !== -1) {
    return false /* Do not allow player to pick up black pieces; the player is white by default*/
  }
}

function computerMove () {
  var possibleMoves = game.moves(); /* Get all possible moves */
  if (possibleMoves.length === 0) {
    return /* Cancel computer move if there are no available moves, as this means that the game is over */
  }
  var bestMove = calcBestMove(possibleMoves);
  game.move(possibleMoves[bestMove]); /* Makes the move number returned by calcBestMove */
  board.position(game.fen()); /* Update the board to display the move */
}

function calcBestMove(moves) {
  var score=-9999;
  var moveToMake= null; 
  for (let i=0; i<moves.length; i++) {
    game.move(moves[i]); /* Make every move possible */
    tempScore = boardScore(game.board()); /* Calculate the board score when that move has been made*/
    if (tempScore > score) { /* If that move returns the best board score yet, then store that move */
      score = tempScore;
      moveToMake = i;
    }
    game.undo() /* Undo the move and restart the loop */
  }
  return moveToMake; /* Return the stored move */
}

function pieceWeight (piece) {
  if (piece === null){
    return 0; /* If space is empty */
  }
  else if (piece.type === 'p') {
    return piece.color === 'b' ? 1: -1; /* If piece is a pawn */
  }
  else if (piece.type === 'r') {
    return piece.color === 'b' ? 5: -5; /* If piece is a rook */
  }
  else if (piece.type === 'n') {
    return piece.color === 'b' ? 3: -3; /* If piece is a knight */
  }
  else if (piece.type === 'b') {
    return piece.color === 'b' ? 3: -3; /* If piece is a bishop */
  }
  else if (piece.type === 'q') {
    return piece.color === 'b' ? 9: -9; /* If piece is a queen */
  }
  else if (piece.type === 'k') {
    return piece.color === 'b' ? 90: -90; /* If piece is a king */
  }
  /* All above statements return positive values if piece colour is black as AI plays as black */
}

function boardScore (boardArray) {
  var totalScore = 0;
  for (let i=0; i<8; i++) {
    for (let j=0; j<8; j++) {
        totalScore = totalScore + pieceWeight(boardArray[i][j]); /* Loops through every position on the board, and adds that position's weighting onto the total score */
    }
  }
  return totalScore;
}

function dropPiece (source, target) {
  var move = game.move({
    from: source,
    to: target, /* Move piece from where it has been picked up to where it has been dropped */
    promotion: 'q' /* Pawns will be promoted to queens by default */
  })
  if (game.game_over()) {
    document.getElementById("p1").innerHTML = "GAME OVER!" /* Update text above board to show game over if game is over */
  }
  if (move === null) {
    return 'snapback' /* Cancel move if it is invalid */
  }
  window.setTimeout(computerMove, 250) /* 250 milliseconds after the piece is dropped, make a computer move */
}

function updateBoard () {
  board.position(game.fen()) /* Update board to visually show the current state of the game */
}

var config = {
  draggable: true,
  position: 'start',
  pickUpPiece: pickUpPiece,
  dropPiece: dropPiece,
  updateBoard: updateBoard
}

board = Chessboard('board', config)
$(window).resize(board.resize) /* Dynamically resize board as browser window is resized */ 