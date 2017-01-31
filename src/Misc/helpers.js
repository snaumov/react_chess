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

export function IsEligibleMove(availableMoves=[], targetSquare) {
    console.log(availableMoves);
    if(availableMoves.map((move) => {if (move.slice(-1) === '+' || move.slice(-1) === '#') {return move.slice(-3, -1)} else return move.slice(-2)}).includes(targetSquare)) {
        return true
    } else if (availableMoves.includes("O-O-O") && (targetSquare === "c1" || targetSquare === "c8")) {
        return true
    } else if (availableMoves.includes("O-O") && (targetSquare === "g1" || targetSquare === "g8")) {
        return true
    } else {
        return false
    }
}

