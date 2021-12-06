var board = null
var game = new Chess()

function pickUpPiece (source, piece, position, orientation) {
  if (game.game_over()) return false
  if (piece.search(/^b/) !== -1) return false
}

function dropPiece (source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  })
  if (move === null) return 'snapback'
}

function updateBoard () {
  board.position(game.fen())
}

var config = {
  draggable: true,
  position: 'start',
  pickUpPiece: pickUpPiece,
  dropPiece: dropPiece,
  updateBoard: updateBoard
}
board = Chessboard('board', config)