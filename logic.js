let lineCounter = 0
let ghostLineCounter = 0
let ghostPiecePos = []
let projectedLine = 0

let clearedLine = 0
let clearedLineStart = 0
let score = 0
let lines = 0
let time = 1000
let level = 1

// Upon page load
document.addEventListener("DOMContentLoaded", function() {
    
    
    document.getElementById("score").textContent = localStorage.getItem("score")

    if(localStorage.getItem("score") == null){
        document.getElementById("score").textContent = 0
    }
})

// Controls


function limitLineCounter(num){
    let limitLineCounter = num

    if(limitLineCounter > 17){
        limitLineCounter = 17
    }

    if(limitLineCounter < 1){
        limitLineCounter = 1
    }

    return limitLineCounter
}

function timer(milliSecs) {
    setInterval(() => {
        
        // console.log(lineCounter + " lineCounter")

        tempPiece1 = currPiece1
        tempPiece2 = currPiece2
        tempPiece3 = currPiece3
        tempPiece4 = currPiece4

        // console.log(currPiece1 + " " + currPiece2 + " " + currPiece3 + " " + currPiece4)

        // Move the piece downwards
        if(lineCounter <= 17){

            // Make the passed line white 
            previousPiece(currPiece1, currPiece2, currPiece3, currPiece4)
            currPiece1 = currPiece1 + 10; currPiece2 = currPiece2 + 10
            currPiece3 = currPiece3 + 10; currPiece4 = currPiece4 + 10
            
            // if the piece goes out of bounds
            if(currPiece1 > 180 || currPiece2 > 180 || currPiece3 > 180 || currPiece4 > 180){

                // Get the placement prior to going out of bounds
                //  > increment the line so it will terminate the movement
                currPiece1 = tempPiece1
                currPiece2 = tempPiece2
                currPiece3 = tempPiece3
                currPiece4 = tempPiece4
                lineCounter += 1
            }

            // if the piece's position is occupied get the position on top of it
            if(document.getElementById(currPiece1.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                || document.getElementById(currPiece2.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                || document.getElementById(currPiece3.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                || document.getElementById(currPiece4.toString()).style.backgroundColor == "rgb(255, 79, 216)"){

                    // placement of the piece's top position
                    //  > change the line so it will terminate the movement
                    currPiece1 = currPiece1 - 10
                    currPiece2 = currPiece2 - 10
                    currPiece3 = currPiece3 - 10 
                    currPiece4 = currPiece4 - 10
                    lineCounter = 17
            } 
        }

        // Piece
        currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)
        
        
        // Delay 1 count before placing then generating a new piece
        if (lineCounter > 17) {

            // Generate a new piece 
            //   > rotate position to default 
            //      > get the layer count (if it has 2nd layer) 
            //          > show trajectory
            // pieceCounter = generatePiece()
            // rotateCounter = 0
            // lineCounter = getLayer(pieceCounter)

            // currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)
            // console.log("Placed at lineCounter: " + lineCounter)
            // spacebarAction()

            document.dispatchEvent(new KeyboardEvent("keydown", {
                key: " ",
                code: "Space",
                keyCode: 32,
                which: 32,
                bubbles: true
            }));

        }

        lineCounter += 1
    }, milliSecs)
}

function getLayers(piece){
    let layers = []
    let newLayers = []
    let counter = 0

    console.log(piece[0])
    console.log(piece[1])
    console.log(piece[2])
    console.log(piece[3])
    console.log("------")

    layers[0] = (parseInt(piece[0]) - getLastDigitOfPiecePart(parseInt(piece[0]))) 
    layers[1] = (parseInt(piece[1]) - getLastDigitOfPiecePart(parseInt(piece[1]))) 
    layers[2] = (parseInt(piece[2]) - getLastDigitOfPiecePart(parseInt(piece[2]))) 
    layers[3] = (parseInt(piece[3]) - getLastDigitOfPiecePart(parseInt(piece[3])))     
    
    console.log(layers[0])
    console.log(layers[1])
    console.log(layers[2])
    console.log(layers[3])
    console.log("------")

    // if(){
        
    // }

    // console.log(parseInt(piece[3]) - parseInt(piece[3]))

    // console.log(getLastDigitOfPiecePart(parseInt(piece[0])))
    // console.log(getLastDigitOfPiecePart(parseInt(piece[1])))
    // console.log(getLastDigitOfPiecePart(parseInt(piece[2])))
    // console.log(getLastDigitOfPiecePart(parseInt(piece[3])))

    // console.log(piece[0])
    // console.log(piece[1])
    // console.log(piece[2])
    // console.log(piece[3])

    // console.log(parseInt(piece[0]) - parseInt(piece[0]) % 10)
    // console.log(parseInt(piece[1]) - parseInt(piece[1]) % 10)
    // console.log(parseInt(piece[2]) - parseInt(piece[2]) % 10)
    // console.log(parseInt(piece[3]) - parseInt(piece[3]) % 10) 

    for(let i = 3; i >= 0; i--){
        
        for(let j = 3; j >= 0; j--){

            if(layers[i] == layers[j]){

                newLayers[i] = counter
                // console.log(layers[i] + " << " + counter)
            }
        }

        if(layers[i] != layers[i - 1]){
            counter = counter + 1
            // console.log(counter + " << counter")
            // console.log(layers[i + 1] + "  <<  " + i)
        }
    }

    return newLayers
}

function trajectory(piece){
    let trajectory = []    

    trajectory = piece

    for(let i = lineCounter; i <= 17; i++){

        trajectory[0] = trajectory[0] + 10
        trajectory[1] = trajectory[1] + 10
        trajectory[2] = trajectory[2] + 10
        trajectory[3] = trajectory[3] + 10

        if(document.getElementById(trajectory[0].toString()).style.backgroundColor == "rgb(255, 79, 216)"
            || document.getElementById(trajectory[1].toString()).style.backgroundColor == "rgb(255, 79, 216)"
            || document.getElementById(trajectory[2].toString()).style.backgroundColor == "rgb(255, 79, 216)"
            || document.getElementById(trajectory[3].toString()).style.backgroundColor == "rgb(255, 79, 216)"){

                trajectory[0] = trajectory[0] - 10
                trajectory[1] = trajectory[1] - 10
                trajectory[2] = trajectory[2] - 10
                trajectory[3] = trajectory[3] - 10
                // console.log(trajectory + " <<<<<")
                break;
        }
    }

    return trajectory
}

function clearLine(line){

    if (document.getElementById(line[0]).style.backgroundColor == "rgb(255, 79, 216)" &&
        document.getElementById(line[1]).style.backgroundColor == "rgb(255, 79, 216)" &&
        document.getElementById(line[2]).style.backgroundColor == "rgb(255, 79, 216)" &&
        document.getElementById(line[3]).style.backgroundColor == "rgb(255, 79, 216)" &&
        document.getElementById(line[4]).style.backgroundColor == "rgb(255, 79, 216)" &&
        document.getElementById(line[5]).style.backgroundColor == "rgb(255, 79, 216)" &&
        document.getElementById(line[6]).style.backgroundColor == "rgb(255, 79, 216)" &&
        document.getElementById(line[7]).style.backgroundColor == "rgb(255, 79, 216)" &&
        document.getElementById(line[8]).style.backgroundColor == "rgb(255, 79, 216)" &&
        document.getElementById(line[9]).style.backgroundColor == "rgb(255, 79, 216)"){
        

        document.getElementById(line[0]).style.backgroundColor = "rgb(23, 25, 35)"
        document.getElementById(line[1]).style.backgroundColor = "rgb(23, 25, 35)"
        document.getElementById(line[2]).style.backgroundColor = "rgb(23, 25, 35)"
        document.getElementById(line[3]).style.backgroundColor = "rgb(23, 25, 35)"
        document.getElementById(line[4]).style.backgroundColor = "rgb(23, 25, 35)"
        document.getElementById(line[5]).style.backgroundColor = "rgb(23, 25, 35)"
        document.getElementById(line[6]).style.backgroundColor = "rgb(23, 25, 35)"
        document.getElementById(line[7]).style.backgroundColor = "rgb(23, 25, 35)"
        document.getElementById(line[8]).style.backgroundColor = "rgb(23, 25, 35)"
        document.getElementById(line[9]).style.backgroundColor = "rgb(23, 25, 35)"

        clearedLine = clearedLine + 10
        clearedLineStart = line[9]

        lines += 1
        score += 100
        

        document.getElementById("score").textContent = score
        document.getElementById("lines").textContent = lines
    }
}

function startGame(){
    document.getElementById("lbl-score").textContent = "score"
    document.getElementById("score").textContent = "0"

    pieceCounter = generatePiece()
    lineCounter = getLayer(pieceCounter)

    previousPiece(currPiece1, currPiece2, currPiece3, currPiece4)
    ghostPiecePos[0] = currPiece1
    ghostPiecePos[1] = currPiece2
    ghostPiecePos[2] = currPiece3
    ghostPiecePos[3] = currPiece4
    ghostPiecePos = trajectory(ghostPiecePos)
    ghostPiece(ghostPiecePos[0], ghostPiecePos[1], ghostPiecePos[2], ghostPiecePos[3])
    currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)

    let aa = setInterval(() => {

       simulateArrowdown()
        if(lineCounter > 18){
            simulateSpaceBar()
        }
    }, time)

    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowLeft':
                if ((currPiece1 % 10 === 1 && currPiece1 >= 1 && currPiece1 <= 171) 
                    ||  (currPiece4 % 10 === 1 && currPiece4 >= 1 && currPiece4 <= 171)){
                
                        // console.log("MAX")
                        break
                }

                if ((currPiece2 % 10 === 1 && currPiece2 >= 1 && currPiece2 <= 171) 
                    ||  (currPiece3 % 10 === 1 && currPiece3 >= 1 && currPiece3 <= 171)){

                        // console.log("MAX")
                        break
                }

                previousPiece(currPiece1, currPiece2, currPiece3, currPiece4)
                currPiece1 = currPiece1 - 1
                currPiece2 = currPiece2 - 1
                currPiece3 = currPiece3 - 1
                currPiece4 = currPiece4 - 1

                if(document.getElementById(currPiece1.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                    || document.getElementById(currPiece2.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                    || document.getElementById(currPiece3.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                    || document.getElementById(currPiece4.toString()).style.backgroundColor == "rgb(255, 79, 216)"){

                        currPiece1 = currPiece1 + 1
                        currPiece2 = currPiece2 + 1
                        currPiece3 = currPiece3 + 1
                        currPiece4 = currPiece4 + 1
                }

                currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)

                let qq = []
                previousPiece(currPiece1, currPiece2, currPiece3, currPiece4)
                previousPiece(ghostPiecePos[0], ghostPiecePos[1], ghostPiecePos[2], ghostPiecePos[3])
                qq[0] = currPiece1
                qq[1] = currPiece2
                qq[2] = currPiece3
                qq[3] = currPiece4
                ghostPiecePos = trajectory(qq)
                ghostPiece(ghostPiecePos[0], ghostPiecePos[1], ghostPiecePos[2], ghostPiecePos[3])
                currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)
            break;

            case 'ArrowUp':
                rotateCounter += 1
                // console.log(rotateCounter)

                tempPiece1 = currPiece1
                tempPiece2 = currPiece2
                tempPiece3 = currPiece3
                tempPiece4 = currPiece4

                previousPiece(currPiece1, currPiece2, currPiece3, currPiece4)
                switch(pieceCounter){
                    // Straight
                    case 0:
                        // If the straight piece is vertically in the left-test side
                        if((currPiece1 % 10 === 1 && currPiece1 >= 1 && currPiece4 <= 171) 
                            &&  (currPiece2 == currPiece1 + 10 && currPiece3 == currPiece1 + 20 
                                    && currPiece4 == currPiece1 + 30)){
                                
                                rotateNegative(0, 9, 18, 27)
                                rotateCounter = 0
                                lineCounter -= 3
                                lineCounter = limitLineCounter(lineCounter)

                        // If the straight piece is horizontally in the left-test side       
                        }else if((currPiece2 % 10 === 2 && currPiece2 >= 2 && currPiece2 <= 171)
                            && (currPiece3 % 10 === 2 && currPiece3 >= 2 && currPiece3 <= 171)){
                                
                                rotateNegative(1, 10, 19, 28)
                                rotateCounter = 2
                                lineCounter -= 3
                                lineCounter = limitLineCounter(lineCounter)

                        // If the straight piece is vertically in the right-test side
                        }else if((currPiece1 % 10 === 0 && currPiece1 >= 10 && currPiece1 <= 180)
                            && (currPiece2 == currPiece1 + 10 && currPiece3 == currPiece1 + 20)
                            && (currPiece4 == currPiece1 + 30)){

                                rotateNegative(3, 12, 21, 30)
                                rotateCounter = 0
                                lineCounter -= 3
                                lineCounter = limitLineCounter(lineCounter)

                        // If the straight piece is horizontally in the right-test side
                        }else if((currPiece2 % 10 === 9 && currPiece2 >= 9 && currPiece2 <= 180)
                            && (currPiece3 % 10 === 9 && currPiece3 >= 9 && currPiece3 <= 180)){

                                rotateNegative(2, 11, 20, 29)
                                rotateCounter = 0
                                lineCounter -= 3
                                lineCounter = limitLineCounter(lineCounter)
                            
                        // // If the straight piece is in the bottom part
                        // }else if((currPiece2 >= 141 && currPiece2 <= 150) 
                        //     && (currPiece3 >= 141 && currPiece3 <= 150)
                        //     && rotateCounter == 1){
                                
                        //         currPiece1 = currPiece2
                        //         rotatePositive(0, 10, 19, 28)
                        //         lineCounter += 3

                        // If the straight piece is in the bottom part
                        }else if((currPiece2 >= 151 && currPiece2 <= 160) 
                            && (currPiece3 >= 151 && currPiece3 <= 160)
                            && rotateCounter == 1){
                                
                                currPiece1 = currPiece1 - 9
                                rotatePositive(0, 0, 9, 18)
                                lineCounter += 3
                        
                        // If the straight piece is in the bottom part
                        }else if((currPiece2 >= 161 && currPiece2 <= 170) 
                            && (currPiece3 >= 161 && currPiece3 <= 170)
                            && rotateCounter == 1){
            
                                currPiece4 = currPiece4 + 8
                                rotateNegative(19, 10, 1, 0)
                                lineCounter += 3

                        // If the straight piece is in the bottom part    
                        }else if((currPiece2 >= 171 && currPiece2 <= 180) 
                            && (currPiece3 >= 171 && currPiece3 <= 180)
                            && rotateCounter == 1){
                        
                                rotateNegative(29, 20, 11, 2)
                                lineCounter += 3
                                // lineCounter = limitLineCounter(lineCounter)
                            
                        // If the straight piece is in the bottom part
                        }else if((currPiece4 >= 171 && currPiece4 <= 180)
                            && rotateCounter == 2){

                                rotatePositive(29, 20, 11, 2)
                                lineCounter -= 3
                                // lineCounter = limitLineCounter(lineCounter)

                        // If the straight piece is in the bottom part
                        }else if((currPiece4 >= 171 && currPiece4 <= 180)
                            && rotateCounter == 3){

                                // rotatePositive(2, 11, 20, 29)
                                rotateNegative(28, 19, 10, 1)
                                lineCounter += 3
                                // lineCounter = limitLineCounter(lineCounter)

                        // If the straight piece is in the bottom part
                        }else if((currPiece4 >= 171 && currPiece4 <= 180)
                            && rotateCounter == 4){

                                rotatePositive(28, 19, 10 , 1)
                                lineCounter -= 3
                                // lineCounter = limitLineCounter(lineCounter)
                                rotateCounter = 0

                        }else{
                            switch(rotateCounter){
                                case 1:
                                    rotatePositive(1, 10, 19, 28)
                                    lineCounter += 3
                                    lineCounter = limitLineCounter(lineCounter)
                                break;
                                case 2:
                                    rotateNegative(1, 10, 19, 28)
                                    lineCounter -= 3
                                    lineCounter = limitLineCounter(lineCounter)

                                break;
                                case 3:
                                    rotatePositive(2, 11, 20, 29)
                                    lineCounter += 3
                                    lineCounter = limitLineCounter(lineCounter)
                                break;
                                case 4:
                                    rotateNegative(2, 11, 20, 29)
                                    lineCounter -= 3
                                    lineCounter = limitLineCounter(lineCounter)
                                    rotateCounter = 0
                                break;
                            }
                        }
                    break;
                
                    // T
                    case 2:
                        // If T piece is |- on  leftest side
                        if((currPiece2 % 10 === 1 && currPiece2 >= 1 && currPiece1 <= 180)
                            && ((currPiece4 + 1) - 10 == currPiece3)){
                            
                                rotatePositive(10, 1, 1, 1)
                                lineCounter -= 1
                                lineCounter = limitLineCounter(lineCounter)
                            
                        // If T piece is -| on  right-test side
                        }else if((currPiece3 % 10 === 0 && currPiece3 >= 10 && currPiece3 <= 180) 
                            && ((currPiece4 - 1) - 10 == currPiece2)){
                            
                                rotateNegative(1, 1, 1, 10)
                                lineCounter -= 1
                                lineCounter = limitLineCounter(lineCounter)
                                rotateCounter = 0

                        // If the T piece is on the bottom part
                        }else if((currPiece2 >= 171 && currPiece2 <= 180)
                            && (currPiece3 >= 171 && currPiece3 <= 180)
                            && (currPiece4 >= 171 && currPiece4 <= 180)){

                                rotateNegative(10, 9, 9, 1)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)

                        // If the T piece is on the bottom part
                        }else if((currPiece4 >= 171 && currPiece4 <= 180)
                            && (currPiece1 >= 161 && currPiece1 <= 170)
                            && (currPiece2 >= 161 && currPiece3 <= 170)
                            && (currPiece3 >= 161 && currPiece4 <= 170)){

                                rotateNegative(9, 1, 1, 0)
                                rotateCounter = 3
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)

                        // If the T piece is on the bottom part
                        }else if((currPiece4 >= 171 && currPiece4 <= 180)
                            && (currPiece1 >= 151 && currPiece1 <= 160)
                            && (currPiece2 >= 161 && currPiece2 <= 170)
                            && ((currPiece4 + 1) - 10 == currPiece3)){

                                rotatePositive(9, 0, 0, 0)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)
                        
                        // If the T piece is on the bottom part
                        }else if((currPiece4 >= 171 && currPiece4 <= 180)
                            && (currPiece1 >= 151 && currPiece1 <= 160)
                            && (currPiece3 >= 161 && currPiece3 <= 170)
                            && ((currPiece4 - 1) - 10 == currPiece2)){

                                // rotateNegative(0, 0, 0, 9)
                                // currPiece4 = currPiece4 + 1
                                // currPiece3 = currPiece3 + 10
                                // currPiece2 = currPiece2 + 10
                                // currPiece1 = currPiece1 + 10
                                rotatePositive(10, 10, 10, 1)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)
                                rotateCounter = 0
                                console.log("Here")

                        // If the T piece is in the middle
                        }else{
                            switch(rotateCounter){
                                case 1:
                                    rotatePositive(0, 1, 1, 9)
                                    lineCounter += 1
                                    lineCounter = limitLineCounter(lineCounter)
                                break;
                                case 2:
                                    rotatePositive(9, 0, 0, 0)
                                    lineCounter -= 1
                                    lineCounter = limitLineCounter(lineCounter)
                                break;
                                case 3:
                                    rotateNegative(9, 1, 1, 0)
                                    lineCounter += 1
                                    lineCounter = limitLineCounter(lineCounter)
                                break;
                                case 4:
                                    rotateNegative(0, 0, 0, 9)
                                    lineCounter -= 1
                                    lineCounter = limitLineCounter(lineCounter)
                                    rotateCounter = 0
                                break;
                            }
                        }
                    break;
                
                    // Z
                    case 3:
                        // If the z piece is in the left-test side
                        if((currPiece2 % 10 === 1 && currPiece2 >= 1 && currPiece2 <= 180) 
                            && (currPiece4 % 10 === 1 && currPiece4 >= 1 && currPiece4 <= 180) 
                            && (currPiece2 == currPiece4 - 10 && currPiece4 == currPiece2 + 10)){
                            
                                rotateNegative(1, 9, 0, 8)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)
                                rotateCounter = 0

                        // If the z piece is in the bottom part
                        }else if((currPiece3 >= 171 && currPiece3 <= 180) 
                            && (currPiece4 >= 171 && currPiece4 <= 180)
                            && (currPiece3 == currPiece4 - 1 && currPiece4 == currPiece3 + 1)){
                        
                                currPiece1 = currPiece4
                                rotateNegative(20, 0, 9, 1)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)
                                

                        // If the z piece is in the bottom part
                        }else if((currPiece4 >= 171 && currPiece4 <= 180) 
                            && (currPiece2 >= 161 && currPiece2 <= 170)
                            && (currPiece2 == currPiece4 - 10)){

                                currPiece1 = currPiece1 + 8
                                rotatePositive(0, 0, 9, 1)

                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)
                                rotateCounter = 0

                        // If the z piece is in the middle
                        }else{
                            switch(rotateCounter){
                                case 1:
                                    rotatePositive(2, 10, 1, 9)
                                    lineCounter += 1
                                    lineCounter = limitLineCounter(lineCounter)
                                break;
                                case 2:
                                    rotateNegative(2, 10, 1, 9)
                                    lineCounter -= 1
                                    lineCounter = limitLineCounter(lineCounter)
                                    rotateCounter = 0
                                    // console.log("reduce")
                                break;
                            }
                        }
                    break;
                
                    // Mirrored Z
                    case 4:
                        // If the mirrored z piece is in the left-test side
                        if((currPiece1 % 10 === 1 && currPiece1 >= 1 && currPiece1 <= 171) 
                            && (currPiece2 % 10 === 1 && currPiece2 >= 1 && currPiece2 <= 171) 
                            && (currPiece1 == currPiece2 - 10 && currPiece2 == currPiece1 + 10)){
                                
                                currPiece1 = currPiece1 + 1
                                rotateNegative(0, 8, 1, 10)
                                lineCounter -= 1
                                lineCounter = limitLineCounter(lineCounter)
                                rotateCounter = 0

                        // If the mirrored z piece is in the bottom part
                        }else if((currPiece3 >= 171 && currPiece3 <= 180) 
                            && (currPiece4 >= 171 && currPiece4 <= 180)
                            && (currPiece3 == currPiece4 - 1 && currPiece4 == currPiece3 + 1)){

                                currPiece4 = currPiece4 + 1
                                rotateNegative(10, 1, 8, 0)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)
                        
                        // If the mirrored z piece is in the bottom part
                        }else if((currPiece4 >= 171 && currPiece4 <= 180) 
                            && (currPiece3 >= 161 && currPiece3 <= 170)
                            && (currPiece3 == currPiece4 - 10 && currPiece3 == currPiece2 + 1)){

                                currPiece4 = currPiece4 - 1
                                rotatePositive(10, 1, 8, 0)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)
                        
                        // If the z piece is in the middle
                        }else{
                            switch(rotateCounter){
                                case 1:
                                    rotatePositive(0, 9, 2, 11)
                                    lineCounter += 1
                                    lineCounter = limitLineCounter(lineCounter)
                                break;
                                case 2:
                                    rotateNegative(0, 9, 2, 11)
                                    lineCounter -= 1
                                    lineCounter = limitLineCounter(lineCounter)
                                    rotateCounter = 0
                                break;
                            }
                        }
                    break;
                
                    //  L
                    case 5:
                        // If L piece is in the left-test side
                        if((currPiece2 % 10 === 1 & currPiece2 >= 1 && currPiece2 <= 171) 
                            && (currPiece3 % 10 === 1 & currPiece3 >= 1 && currPiece3 <= 171) 
                            && (currPiece2 == currPiece3 - 10 && currPiece3 == currPiece2 + 10)){
                                
                                currentPiece1 = currPiece3 - 20
                                rotateNegative(0, 9, 18, 11)
                                lineCounter -= 1
                                lineCounter = limitLineCounter(lineCounter)
                                rotateCounter = 0   

                        // If L piece is in the right-test side
                        }else if((currPiece2 % 10 === 0 && currPiece2 >= 10 && currPiece2 <= 180) 
                            && (currPiece3 % 10 === 0 && currPiece3 >= 10 && currPiece3 <= 180) 
                            && (currPiece2 == currPiece3 - 10 && currPiece3 == currPiece2 + 10)){
                            
                                currPiece3 = currPiece3 - 1
                                currPiece4 = currPiece4 - 10
                                rotatePositive(1, 8, 0, 0)
                                lineCounter -= 1
                                lineCounter = limitLineCounter(lineCounter)
                                rotateCounter = 2

                        
                        // if the L piece default position is in the bottom part 
                        }else if((currPiece4 >= 171 && currPiece4 <= 180)
                                && rotateCounter == 1){

                                currPiece1 = currPiece4
                                currPiece4 = currPiece4 + 1
                                rotateNegative(20 , 10, 1, 0)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)
                                
                        // if L piece position 1 is in the bottom part
                        }else if((currPiece4 >= 171 && currPiece4 <= 180)
                                && rotateCounter == 2){

                                // currPiece4 = currPiece4 - 9
                                // rotatePositive(2, 9, 0, 0)
                                rotatePositive(12, 19, 10, 1)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)
                        
                        // if L piece position 2 is in the bottom part
                        }else if((currPiece3 >= 171 && currPiece3 <= 180)
                            && rotateCounter == 3){    

                                rotateNegative(11, 9, 0, 0)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)

                        // if L piece position 2 is in the bottom part
                        }else if((currPiece3 >= 171 && currPiece3 <= 180)
                                && (currPiece4 >= 171 && currPiece4 <= 180)
                                && rotateCounter == 4){
                                
                                currPiece1 = currPiece1 + 9
                                rotateNegative(0, 0, 9, 2)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)
                                rotateCounter = 0

                        // If the piece is in the middle
                        }else{
                            switch(rotateCounter){
                                case 1:
                                    rotatePositive(0, 0, 9, 11)
                                    lineCounter += 1
                                    lineCounter = limitLineCounter(lineCounter)
                                break;
                                case 2:
                                    currPiece4 = currPiece4 - 9
                                    rotatePositive(2, 9, 0, 0)
                                    lineCounter -= 1
                                    lineCounter = limitLineCounter(lineCounter)
                                break;
                                case 3:
                                    currPiece1 = currPiece2 - 9
                                    currPiece2 = currPiece3 
                                    rotatePositive(0, 0, 10, 10)
                                    lineCounter += 1
                                    lineCounter = limitLineCounter(lineCounter)
                                break;
                                case 4:
                                    currPiece1 = currPiece3 - 21
                                    rotateNegative(0, 10, 19, 12)
                                    lineCounter -= 1
                                    lineCounter = limitLineCounter(lineCounter)
                                    rotateCounter = 0
                                break;
                            }
                        }
                    break;
                
                    // Mirrored L
                    case 6:
                        // If the straight piece is vertically in the left-test side
                        if((currPiece3 % 10 === 1 && currPiece3 >= 1 && currPiece3 <= 171) 
                            && (currPiece4 % 10 === 1 && currPiece4 >= 1 && currPiece4 <= 171) 
                            && (currPiece3 == currPiece4 - 10 && currPiece4 == currPiece3 + 10)){
                                
                                rotateNegative(0, 0, 8, 8)
                                rotateCounter = 0
                                lineCounter -= 1
                                lineCounter = limitLineCounter(lineCounter)
                        
                        // If the mirrored L piece is in the right-test side
                        }else if((currPiece2 % 10 === 0 && currPiece2 >= 10 && currPiece2 <= 180) 
                            && (currPiece4 % 10 === 0 && currPiece4 >= 10 && currPiece4 <= 180) 
                            && (currPiece2 == currPiece4 - 10 && currPiece4 == currPiece2 + 10)){

                                rotateNegative(2, 2, 10, 10)
                                lineCounter -= 1
                                lineCounter = limitLineCounter(lineCounter)
                                rotateCounter = 2
                            
                        // If the mirrored L piece is in the bottom part
                        }else if((currPiece4 >= 171 && currPiece4 <= 180)
                            && rotateCounter == 1){

                                console.log("Here " + rotateCounter)
                                currPiece3 = currPiece3 + 8
                                rotateNegative(9, 0, 0, 1)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)

                        // If the mirrored L piece is in the bottom part
                        }else if((currPiece4 >= 171 && currPiece4 <= 180)
                            && rotateCounter == 2){

                                rotatePositive(9, 9, 1, 1)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)

                        // If the mirrored L piece is in the bottom part
                        }else if((currPiece2 >= 171 && currPiece2 <= 180)
                            && rotateCounter == 3){

                                rotateNegative(9, 18, 10, 1)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)

                        // If the mirrored L piece is in the bottom part
                        }else if((currPiece4 >= 171 && currPiece4 <= 180)
                            && rotateCounter == 4){

                                // rotateNegative(9, 18, 10, 1)
                                // lineCounter += 1
                                // lineCounter = limitLineCounter(lineCounter)
                                rotatePositive(9, 9, 1, 1)
                                lineCounter += 1
                                lineCounter = limitLineCounter(lineCounter)
                                rotateCounter = 0
                        }else{
                            switch(rotateCounter){
                                case 1:
                                    rotatePositive(1, 10, 18, 9)
                                    lineCounter += 1
                                    lineCounter = limitLineCounter(lineCounter)
                                break;
                                case 2:
                                    rotateNegative(1, 1, 9, 9)
                                    lineCounter -= 1
                                    lineCounter = limitLineCounter(lineCounter)
                                break;
                                case 3:
                                    currPiece2 = currPiece2 - 8
                                    rotatePositive(1, 0, 0, 9)
                                    lineCounter += 1
                                    lineCounter = limitLineCounter(lineCounter)
                                    break;
                                case 4:
                                    rotateNegative(1, 1, 9, 9)
                                    lineCounter -= 1
                                    lineCounter = limitLineCounter(lineCounter)
                                    rotateCounter = 0
                                break;
                            }
                        }
                    break;
                }

                if(document.getElementById(currPiece1.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                    || document.getElementById(currPiece2.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                    || document.getElementById(currPiece3.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                    || document.getElementById(currPiece4.toString()).style.backgroundColor == "rgb(255, 79, 216)"){

                        console.log("Hit")
                        currPiece1 = tempPiece1
                        currPiece2 = tempPiece2
                        currPiece3 = tempPiece3
                        currPiece4 = tempPiece4
                        rotateCounter = 0
                        lineCounter += 1

                        currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)

                } else{
                    currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)

                    previousPiece(currPiece1, currPiece2, currPiece3, currPiece4)
                    previousPiece(ghostPiecePos[0], ghostPiecePos[1], ghostPiecePos[2], ghostPiecePos[3])
                    ghostPiecePos[0] = currPiece1
                    ghostPiecePos[1] = currPiece2
                    ghostPiecePos[2] = currPiece3
                    ghostPiecePos[3] = currPiece4
                    ghostPiecePos = trajectory(ghostPiecePos)
                    ghostPiece(ghostPiecePos[0], ghostPiecePos[1], ghostPiecePos[2], ghostPiecePos[3])
                    currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)
                }
            break;

            case 'ArrowRight':
                if((currPiece1 % 10 === 0 && currPiece1 >= 10 && currPiece1 <= 180)
                    || (currPiece4 % 10 === 0 && currPiece4 >= 10 && currPiece4 <= 180)){

                        // console.log("MAX")
                        break;
                }

                if((currPiece2 % 10 === 0 && currPiece2 >= 10 && currPiece2 <= 180)
                    || (currPiece3 % 10 === 0 && currPiece3 >= 10 && currPiece3 <= 180)){

                        // console.log("MAX")
                        break;
                }

                previousPiece(currPiece1, currPiece2, currPiece3, currPiece4)
                currPiece1 = currPiece1 + 1
                currPiece2 = currPiece2 + 1
                currPiece3 = currPiece3 + 1
                currPiece4 = currPiece4 + 1

                if(document.getElementById(currPiece1.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                    || document.getElementById(currPiece2.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                    || document.getElementById(currPiece3.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                    || document.getElementById(currPiece4.toString()).style.backgroundColor == "rgb(255, 79, 216)"){

                        currPiece1 = currPiece1 - 1
                        currPiece2 = currPiece2 - 1
                        currPiece3 = currPiece3 - 1
                        currPiece4 = currPiece4 - 1
                }

                currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)

                previousPiece(currPiece1, currPiece2, currPiece3, currPiece4)
                previousPiece(ghostPiecePos[0], ghostPiecePos[1], ghostPiecePos[2], ghostPiecePos[3])
                ghostPiecePos[0] = currPiece1
                ghostPiecePos[1] = currPiece2
                ghostPiecePos[2] = currPiece3
                ghostPiecePos[3] = currPiece4
                ghostPiecePos = trajectory(ghostPiecePos)
                ghostPiece(ghostPiecePos[0], ghostPiecePos[1], ghostPiecePos[2], ghostPiecePos[3])
                currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)

            break;

            case 'ArrowDown':
                lineCounter += 1

                if((currPiece1 >= 171 && currPiece1 <= 180) 
                    && (currPiece4 >= 171 && currPiece4 <= 180)){

                        // console.log("MAX")
                        break;
                }

                if((currPiece2 >= 171 && currPiece2 <= 180) 
                    && (currPiece3 >= 171 && currPiece3 <= 180)){

                        // console.log("MAX")
                        break;
                }

                if(currPiece4 <= 170){
                    
                    previousPiece(currPiece1, currPiece2, currPiece3, currPiece4)
                    currPiece1 = currPiece1 + 10
                    currPiece2 = currPiece2 + 10
                    currPiece3 = currPiece3 + 10
                    currPiece4 = currPiece4 + 10

                    if(document.getElementById(currPiece1.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                        || document.getElementById(currPiece2.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                        || document.getElementById(currPiece3.toString()).style.backgroundColor == "rgb(255, 79, 216)"
                        || document.getElementById(currPiece4.toString()).style.backgroundColor == "rgb(255, 79, 216)"){

                            currPiece1 = currPiece1 - 10
                            currPiece2 = currPiece2 - 10
                            currPiece3 = currPiece3 - 10
                            currPiece4 = currPiece4 - 10

                            console.log(currPiece1 + " " + currPiece2 + " " + currPiece3 + " " + currPiece4 + " << Down")
                    }

                    currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)
                    // console.log("-----------")
                    // console.log(lineCounter)
                }
            break;

            case " ":

                let piece = []
                previousPiece(currPiece1, currPiece2, currPiece3, currPiece4)
                // previousPiece(ghostPiecePos[0], ghostPiecePos[1], ghostPiecePos[2], ghostPiecePos[3])

                piece[0] = currPiece1
                piece[1] = currPiece2
                piece[2] = currPiece3
                piece[3] = currPiece4
                piece = trajectory(piece)

                // console.log(piece)

                currPiece1 = piece[0]
                currPiece2 = piece[1]
                currPiece3 = piece[2]
                currPiece4 = piece[3]
                
                // console.log(piece)
                // Place piece
                currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)

                clearLine(line17)
                clearLine(line16)
                clearLine(line15)
                clearLine(line14)
                clearLine(line13)
                clearLine(line12)
                clearLine(line11)
                clearLine(line10)
                clearLine(line9)
                clearLine(line8)
                clearLine(line7)
                clearLine(line6)
                clearLine(line5)
                clearLine(line4)
                clearLine(line3)
                clearLine(line2)
                clearLine(line1)

                clearLine(line1)
                clearLine(line2)
                clearLine(line3)
                clearLine(line4)
                clearLine(line5)
                clearLine(line6)
                clearLine(line7)
                clearLine(line8)
                clearLine(line9)
                clearLine(line10)
                clearLine(line11)
                clearLine(line12)
                clearLine(line13)
                clearLine(line14)
                clearLine(line15)
                clearLine(line16)
                clearLine(line17)

                if(clearedLine > 0){

                    let zz = 0
                    for(let i = clearedLineStart ; i >= 1; i--){
                        if(document.getElementById(i.toString()).style.backgroundColor == "rgb(255, 79, 216)"){
                            zz = i + clearedLine

                            document.getElementById(zz.toString()).style.backgroundColor = document.getElementById(i.toString()).style.backgroundColor
                            document.getElementById(i.toString()).style.backgroundColor = "rgb(23, 25, 35)"
                        }
                    }

                    clearedLine = 0
                }

                // Generate New piece
                pieceCounter = generatePiece()
                rotateCounter = 0
                lineCounter = getLayer(pieceCounter)

                previousPiece(currPiece1, currPiece2, currPiece3, currPiece4)
                ghostPiecePos[0] = currPiece1
                ghostPiecePos[1] = currPiece2
                ghostPiecePos[2] = currPiece3
                ghostPiecePos[3] = currPiece4
                // console.log(trajectory(ghostPiecePos))
                ghostPiecePos = trajectory(ghostPiecePos)
                ghostPiece(ghostPiecePos[0], ghostPiecePos[1], ghostPiecePos[2], ghostPiecePos[3])
                currentPiece(currPiece1, currPiece2, currPiece3, currPiece4)

                // console.log(currPiece1 + " " + currPiece2 + " " + currPiece3 + " " + currPiece4 + "  << Space")

                // changeDropSpeed(100);
                // changeDropSpeed(150);
                // changeDropSpeed(200);
                // changeDropSpeed(250);
                // changeDropSpeed(300);
                // changeDropSpeed(350);
                // changeDropSpeed(400);
                // changeDropSpeed(450);
                // changeDropSpeed(500);
                // changeDropSpeed(550);

                if(piece[0] == currPiece1 
                    || piece[1] == currPiece2
                    || piece[2] == currPiece3
                    || piece[3] == currPiece4){

                        timer = 0;
                        // alert("game over")
                        document.getElementById("modal-overlay").style.display = "flex";
                        clearInterval(aa)
                }
            break;

            default:
                // Ignore other keys
                return
        }

        // Optional: Prevent default behavior (e.g., page scrolling)
        event.preventDefault()
    })
}

function simulateArrowdown(){
    document.dispatchEvent(new KeyboardEvent("keydown", {
        key: "ArrowDown",
        code: "ArrowDown",
        keyCode: 40,
        which: 40,
        bubbles: true
    }));

}

function simulateSpaceBar(){
    document.dispatchEvent(new KeyboardEvent("keydown", {
        key: " ",
        code: "Space",
        keyCode: 32,
        which: 32,
        bubbles: true
    }));
}

function changeDropSpeed(targetScore){
    if(score > targetScore){
        time = time - 100

        clearInterval(aa)
        aa = setInterval(() => {

            simulateArrowdown()
            if(lineCounter > 18){
                simulateSpaceBar()
            }
        }, time)

        level += 1
        document.getElementById("level").textContent = ""
        document.getElementById("level").textContent = level
    }
}