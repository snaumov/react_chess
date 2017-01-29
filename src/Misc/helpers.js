export function CalculateTargetSquare(initialSquare, xOffset, yOffset) {
    var letters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ];
    var numbers = [ '1', '2', '3', '4', '5', '6', '7', '8' ];
    return letters[letters.indexOf(initialSquare[0]) + (Math.round(xOffset / 64))] + numbers[numbers.indexOf(initialSquare[1]) - (Math.round(yOffset / 64))]
}

export function CalculateTargetSquareBlackAtBottom(initialSquare, xOffset, yOffset) {
    var letters = [ 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a' ];
    var numbers = [ '8', '7', '6', '5', '4', '3', '2', '1' ];
    return letters[letters.indexOf(initialSquare[0]) + (Math.round(xOffset / 64))] + numbers[numbers.indexOf(initialSquare[1]) - (Math.round(yOffset / 64))]
}

export function CalculateAvailableMovesForPiece(position, initialSquare) {
    return(['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'])
}

