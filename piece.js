var pieces = [ 
    // Long Straight
    [4, 5, 6, 7], 
    // [5, 15, 25, 35],  
    // Square
    [4, 5, 14, 15],
    // T
    [5, 14, 15, 16],
    // Z
    [4, 5, 15, 16],
    // Mirrored Z
    [5, 6, 14, 15],
    // L
    [4, 5, 6, 14],
    // Mirrored L
    [4, 5, 6, 16],
]

function resetPieces(){
    pieceCounter = generatePiece()
    rotateCounter = 0
    // lineCounter = lineCounter + Math.floor(currPiece4 / 10)
}

function previousPiece(prevPiece1, prevPiece2, prevPiece3, prevPiece4){
    document.getElementById(prevPiece1.toString()).style.backgroundColor = "rgb(23, 25, 35)"
    document.getElementById(prevPiece2.toString()).style.backgroundColor = "rgb(23, 25, 35)"
    document.getElementById(prevPiece3.toString()).style.backgroundColor = "rgb(23, 25, 35)"
    document.getElementById(prevPiece4.toString()).style.backgroundColor = "rgb(23, 25, 35)"
}

function currentPiece(currPiece1, currPiece2, currPiece3, currPiece4){
    document.getElementById(currPiece1.toString()).style.backgroundColor = "rgb(255, 79, 216)"
    document.getElementById(currPiece2.toString()).style.backgroundColor = "rgb(255, 79, 216)"
    document.getElementById(currPiece3.toString()).style.backgroundColor = "rgb(255, 79, 216)"
    document.getElementById(currPiece4.toString()).style.backgroundColor = "rgb(255, 79, 216)"
}

function ghostPiece(currPiece1, currPiece2, currPiece3, currPiece4){
    document.getElementById(currPiece1.toString()).style.backgroundColor = "gray"
    document.getElementById(currPiece2.toString()).style.backgroundColor = "gray"
    document.getElementById(currPiece3.toString()).style.backgroundColor = "gray"
    document.getElementById(currPiece4.toString()).style.backgroundColor = "gray"
}

function rotatePositive(rotatePos1, rotatePos2, rotatePos3, rotatePos4){
    currPiece1 = currPiece1 + rotatePos1
    currPiece2 = currPiece2 + rotatePos2
    currPiece3 = currPiece3 + rotatePos3
    currPiece4 = currPiece4 + rotatePos4
}

function rotateNegative(rotatePos1, rotatePos2, rotatePos3, rotatePos4){
    currPiece1 = currPiece1 - rotatePos1
    currPiece2 = currPiece2 - rotatePos2
    currPiece3 = currPiece3 - rotatePos3
    currPiece4 = currPiece4 - rotatePos4
}

function generatePiece(){
    var selectedPiece = Math.floor(Math.random() * 6)

    // selectedPiece = 2
    currPiece1 = pieces[selectedPiece][0]
    currPiece2 = pieces[selectedPiece][1]
    currPiece3 = pieces[selectedPiece][2]
    currPiece4 = pieces[selectedPiece][3]

    currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)
    return selectedPiece
}

function getLayer(piece){
    let tempLineCounter = 2
    if(piece == 0){
        tempLineCounter = 1
    }
    return tempLineCounter
}

function clearLine(line){
    if (document.getElementById(line[0].toString()).style.backgroundColor == "pink" 
        && document.getElementById(line[1].toString()).style.backgroundColor == "pink" 
        && document.getElementById(line[2].toString()).style.backgroundColor == "pink" 
        && document.getElementById(line[3].toString()).style.backgroundColor == "pink" 
        && document.getElementById(line[4].toString()).style.backgroundColor == "pink" 
        && document.getElementById(line[5].toString()).style.backgroundColor == "pink" 
        && document.getElementById(line[6].toString()).style.backgroundColor == "pink" 
        && document.getElementById(line[7].toString()).style.backgroundColor == "pink" 
        && document.getElementById(line[8].toString()).style.backgroundColor == "pink" 
        && document.getElementById(line[9].toString()).style.backgroundColor == "pink"
    ) {
        document.getElementById(line[0].toString()).style.backgroundColor = "white"
        document.getElementById(line[1].toString()).style.backgroundColor = "white"
        document.getElementById(line[2].toString()).style.backgroundColor = "white"
        document.getElementById(line[3].toString()).style.backgroundColor = "white"
        document.getElementById(line[4].toString()).style.backgroundColor = "white"
        document.getElementById(line[5].toString()).style.backgroundColor = "white"
        document.getElementById(line[6].toString()).style.backgroundColor = "white"
        document.getElementById(line[7].toString()).style.backgroundColor = "white"
        document.getElementById(line[8].toString()).style.backgroundColor = "white"
        document.getElementById(line[9].toString()).style.backgroundColor = "white"

        console.log("Line clear")
    }
}

function moveLine(line){
    if (document.getElementById(line[0].toString()).style.backgroundColor == "white" 
        && document.getElementById(line[1].toString()).style.backgroundColor == "white" 
        && document.getElementById(line[2].toString()).style.backgroundColor == "white" 
        && document.getElementById(line[3].toString()).style.backgroundColor == "white" 
        && document.getElementById(line[4].toString()).style.backgroundColor == "white" 
        && document.getElementById(line[5].toString()).style.backgroundColor == "white" 
        && document.getElementById(line[6].toString()).style.backgroundColor == "white" 
        && document.getElementById(line[7].toString()).style.backgroundColor == "white" 
        && document.getElementById(line[8].toString()).style.backgroundColor == "white" 
        && document.getElementById(line[9].toString()).style.backgroundColor == "white"
    ) {

        prev1 = line[0] - 10
        prev2 = line[1] - 10
        prev3 = line[2] - 10
        prev4 = line[3] - 10
        prev5 = line[4] - 10
        prev6 = line[5] - 10
        prev7 = line[6] - 10
        prev8 = line[7] - 10
        prev9 = line[8] - 10
        prev10 = line[9] - 10

        document.getElementById(line[0].toString()).style.backgroundColor = document.getElementById(prev1.toString()).style.backgroundColor
        document.getElementById(line[1].toString()).style.backgroundColor = document.getElementById(prev2.toString()).style.backgroundColor
        document.getElementById(line[2].toString()).style.backgroundColor = document.getElementById(prev3.toString()).style.backgroundColor
        document.getElementById(line[3].toString()).style.backgroundColor = document.getElementById(prev4.toString()).style.backgroundColor
        document.getElementById(line[4].toString()).style.backgroundColor = document.getElementById(prev5.toString()).style.backgroundColor
        document.getElementById(line[5].toString()).style.backgroundColor = document.getElementById(prev6.toString()).style.backgroundColor
        document.getElementById(line[6].toString()).style.backgroundColor = document.getElementById(prev7.toString()).style.backgroundColor
        document.getElementById(line[7].toString()).style.backgroundColor = document.getElementById(prev8.toString()).style.backgroundColor
        document.getElementById(line[8].toString()).style.backgroundColor = document.getElementById(prev9.toString()).style.backgroundColor
        document.getElementById(line[9].toString()).style.backgroundColor = document.getElementById(prev10.toString()).style.backgroundColor

        pprev1 = line[0] - 10
        pprev2 = line[0] - 10
        pprev3 = line[0] - 10
        pprev4 = line[0] - 10
        pprev5 = line[0] - 10
        pprev6 = line[0] - 10
        pprev7 = line[0] - 10
        pprev8 = line[0] - 10
        pprev9 = line[0] - 10
        pprev10 = line[0] - 10

        document.getElementById(prev1.toString()).style.backgroundColor = document.getElementById(pprev1.toString()).style.backgroundColor
        document.getElementById(prev2.toString()).style.backgroundColor = document.getElementById(pprev2.toString()).style.backgroundColor
        document.getElementById(prev3.toString()).style.backgroundColor = document.getElementById(pprev3.toString()).style.backgroundColor
        document.getElementById(prev4.toString()).style.backgroundColor = document.getElementById(pprev4.toString()).style.backgroundColor
        document.getElementById(prev5.toString()).style.backgroundColor = document.getElementById(pprev5.toString()).style.backgroundColor
        document.getElementById(prev6.toString()).style.backgroundColor = document.getElementById(pprev6.toString()).style.backgroundColor
        document.getElementById(prev7.toString()).style.backgroundColor = document.getElementById(pprev7.toString()).style.backgroundColor
        document.getElementById(prev8.toString()).style.backgroundColor = document.getElementById(pprev8.toString()).style.backgroundColor
        document.getElementById(prev9.toString()).style.backgroundColor = document.getElementById(pprev9.toString()).style.backgroundColor
        document.getElementById(prev10.toString()).style.backgroundColor = document.getElementById(pprev10.toString()).style.backgroundColor
        
        console.log("Line move")
    }
}