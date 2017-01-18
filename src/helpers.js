export function CalculateTargetSquare(initialSquare, xOffset, yOffset) {
    console.log(initialSquare, xOffset, yOffset);
    var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
    return letters[letters.indexOf(initialSquare[0]) + (Math.round(xOffset / 64))] + numbers[numbers.indexOf(initialSquare[1]) - (Math.round(yOffset / 64))]
}

export function CalculateAvailableMovesForPiece(position, initialSquare) {
    return(['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'])
}

