var board = null;
var game = new Chess();

/* Below are the piece-square tables which allow the AI to play positionally */
var wq = [[-20,-10,-10,- 5,- 5,-10,-10,-20],
          [-10,  0,  0,  0,  0,  0,  0,-10],
          [-10,  0,  5,  5,  5,  5,  0,-10],
          [- 5,  0,  5,  5,  5,  5,  0,- 5],
          [  0,  0,  5,  5,  5,  5,  0,- 5],
          [-10,  5,  5,  5,  5,  5,  0,-10],
          [-10,  0,  5,  0,  0,  0,  0,-10],
          [-20,-10,-10,- 5,- 5,-10,-10,-20]]; /* White Queen */
          
var wp = [[  0,  0,  0,  0,  0,  0,  0,  0],
          [ 50, 50, 50, 50, 50, 50, 50, 50],
          [ 10, 10, 20, 30, 30, 20, 10, 10],
          [  5,  5, 10, 25, 25, 10,  5,  5],
          [  0,  0,  0, 20, 20,  0,  0,  0],
          [  5,- 5,-10,  0,  0,-10,- 5,  5],
          [  5, 10, 10,-20,-20, 10, 10,  5],
          [  0,  0,  0,  0,  0,  0,  0,  0]]; /* White Pawn */
          
var wr = [[  0,  0,  0,  0,  0,  0,  0,  0],
          [  5, 10, 10, 10, 10, 10, 10,  5],
          [- 5,  0,  0,  0,  0,  0,  0,- 5],
          [- 5,  0,  0,  0,  0,  0,  0,- 5],
          [- 5,  0,  0,  0,  0,  0,  0,- 5],
          [- 5,  0,  0,  0,  0,  0,  0,- 5],
          [- 5,  0,  0,  0,  0,  0,  0,- 5],
          [  0,  0,  0,  5,  5,  0,  0,  0]]; /* White Rook */
          
var wb = [[-20,-10,-10,-10,-10,-10,-10,-20],
          [  0,  0,  0,  0,  0,  0,  0,-10],
          [-10,  0,  5, 10, 10,  5,  0,-10],
          [-10,  5,  5, 10, 10,  5,  5,-10],
          [-10,  0, 10, 10, 10, 10,  0,-10],
          [-10, 10, 10, 10, 10, 10, 10,-10],
          [-10,  5,  0,  0,  0,  0,  5,-10],
          [-20,-10,-10,-10,-10,-10,-10,-20]]; /* White Bishop */

var wk = [[-30,-40,-40,-50,-50,-40,-40,-30],
          [-30,-40,-40,-50,-50,-40,-40,-30],
          [-30,-40,-40,-50,-50,-40,-40,-30],
          [-30,-40,-40,-50,-50,-40,-40,-30],
          [-20,-30,-30,-40,-40,-30,-30,-20],
          [-10,-20,-20,-20,-20,-20,-20,-10],
          [ 20, 20,  0,  0,  0,  0, 20, 20],
          [ 20, 30, 10,  0,  0, 10, 30, 20]]; /* White King */
          
var wn = [[-50,-40,-30,-30,-30,-30,-40,-50],
          [-40,-20,  0,  0,  0,  0,-20,-40],
          [-30,  0, 10, 15, 15, 10,  0,-30],
          [-30,  5, 15, 20, 20, 15,  5,-30],
          [-30,  0, 15, 20, 20, 15,  0,-30],
          [-30,  5, 10, 15, 15, 10,  5,-30],
          [-40,-20,  0,  5,  5,  0,-20,-40],
          [-50,-40,-10,- 5,- 5,-10,-40,-50]]; /* White Knight */
          
var bq = [[-20,-10,-10,- 5,- 5,-10,-10,-20],
          [-10,  0,  0,  0,  0,  0,  0,-10],
          [-10,  0,  5,  5,  5,  5,  0,-10],
          [- 5,  0,  5,  5,  5,  5,  0,  0],
          [- 5,  0,  5,  5,  5,  5,  0,- 5],
          [-10,  5,  5,  5,  5,  5,  0,-10],
          [-10,  0,  5,  0,  0,  0,  0,-10],
          [-20,-10,-10,- 5,- 5,-10,-10,-20]]; /* Black Queen */
          
var bp = [[  0,  0,  0,  0,  0,  0,  0,  0],
          [  5, 10, 10,-20,-20, 10, 10,  5],
          [  5,- 5,-10,  0,  0,-10,- 5,  5],
          [  0,  0,  0, 20, 20,  0,  0,  0],
          [  5,  5, 10, 25, 25, 10,  5,  5],
          [ 10, 10, 20, 30, 30, 20, 10, 10],
          [ 50, 50, 50, 50, 50, 50, 50, 50],
          [  0,  0,  0,  0,  0,  0,  0,  0]]; /* Black Pawn */
          
var br = [[  0,  0,  0,  5,  5,  0,  0,  0],
          [- 5,  0,  0,  0,  0,  0,  0,- 5],
          [- 5,  0,  0,  0,  0,  0,  0,- 5],
          [- 5,  0,  0,  0,  0,  0,  0,- 5],
          [- 5,  0,  0,  0,  0,  0,  0,- 5],
          [- 5,  0,  0,  0,  0,  0,  0,- 5],
          [  5, 10, 10, 10, 10, 10, 10,  5],
          [  0,  0,  0,  0,  0,  0,  0,  0]]; /* Black Rook */
          
var bb = [[-20,-10,-10,-10,-10,-10,-10,-20],
          [-10,  5,  0,  0,  0,  0,  5,-10],
          [-10, 10, 10, 10, 10, 10, 10,-10],
          [-10,  0, 10, 10, 10, 10,  0,-10],
          [-10,  5,  5, 10, 10,  5,  5,-10],
          [-10,  0,  5, 10, 10,  5,  0,-10],
          [-10,  0,  0,  0,  0,  0,  0,-10],
          [-20,-10,-10,-10,-10,-10,-10,-20]]; /* Black Bishop */
         
var bk = [[ 20, 30, 10,  0,  0, 10, 30, 20],
          [ 20, 20,  0,  0,  0,  0, 20, 20],
          [-10,-20,-20,-20,-20,-20,-20,-10],
          [-20,-30,-30,-40,-40,-30,-30,-20],
          [-30,-40,-40,-50,-50,-40,-40,-30],
          [-30,-40,-40,-50,-50,-40,-40,-30],
          [-30,-40,-40,-50,-50,-40,-40,-30],
          [-30,-40,-40,-50,-50,-40,-40,-30]]; /* Black King */
          
var bn = [[-50,-40,-10,- 5,- 5,-10,-40,-50],
          [-40,-20,  0, 05,  5,  0,-20,-40],
          [-30,  5, 10, 15, 15, 10,  5,-30],
          [-30,  0, 15, 20, 20, 15,  0,-30],
          [-35,  5, 15, 20, 20, 15,  5,-30],
          [-30,  0, 10, 15, 15, 10,  0,-30],
          [-40, 20,  0,  0,  0,  0,-20,-40],
          [-50,-40,-30,-30,-30,-30,-40,-50]]; /* Black Knight */
          
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
  game.move(bestMove); /* Makes the move number returned by calcBestMove */
  board.position(game.fen()); /* Update the board to display the move */
}

function addMovesToTree(moves,tree,prevMove) {
  for (let i=0; i<moves.length; i++) {
    game.move(moves[i]);
    moveScore = boardScore(game.board());
    game.undo();
    var moveObject = {move:moves[i], prevMove:prevMove, score:moveScore};
    tree.push(moveObject);
  }
}

function generateMoveTree(moves) {
  var moveTree = [];
  addMovesToTree(moves,moveTree,null);
  return moveTree;
}

function calcBestMove(moves) {
  var moveTree = generateMoveTree(moves);
  var score = -9999;
  var moveToMake = null;
  for (let i = 0; i < moveTree.length; i++) {
    tempScore = moveTree[i].score;
    if (tempScore > score) {
      score = tempScore;
      moveToMake = moveTree[i].move;
    }
  }
  return moveToMake;
}

function pieceWeight (boardArray,x,y) {
  var piece = boardArray[x][y]
  if (piece === null){
    return 0; /* If space is empty */
  }
  else if (piece.type === 'p') {
    return piece.color === 'b' ? 100 + bp[x][y]: -(100 + wp[x][y]); /* If piece is a pawn */
  }
  else if (piece.type === 'r') {
    return piece.color === 'b' ? 500 + br[x][y]: -(500 + wr[x][y]); /* If piece is a rook */
  }
  else if (piece.type === 'n') {
    return piece.color === 'b' ? 320 + bn[x][y]: -(320 + wn[x][y]); /* If piece is a knight */
  }
  else if (piece.type === 'b') {
    return piece.color === 'b' ? 330 + bb[x][y]: -(330 + wb[x][y]); /* If piece is a bishop */
  }
  else if (piece.type === 'q') {
    return piece.color === 'b' ? 900 + bq[x][y]: -(900 + wq[x][y]); /* If piece is a queen */
  }
  else if (piece.type === 'k') {
    return piece.color === 'b' ? 20000 + bk[x][y]: -(20000 + bk[x][y]); /* If piece is a king */
  }
  /* All above statements return positive values if piece colour is black as AI plays as black */
}

function boardScore (boardArray) {
  var totalScore = 0;
  for (let i=0; i<8; i++) {
    for (let j=0; j<8; j++) {
        totalScore = totalScore + pieceWeight(boardArray,i,j); /* Loops through every position on the board, and adds that position's weighting onto the total score */
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