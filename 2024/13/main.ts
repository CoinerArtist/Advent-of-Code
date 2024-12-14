import { input, output } from "utility"

// --- Part 1 --- //

const machines = input.split("\n\n").map(x => {
    const [_, xA, yA, xB, yB, prizeX, prizeY] = x.match(/Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/)!
    return [[parseInt(xA), parseInt(yA)], [parseInt(xB), parseInt(yB)], [parseInt(prizeX), parseInt(prizeY)]] as const
})


{
    let tokens = 0
    for(const [[xA, yA], [xB, yB], [prizeX, prizeY]] of machines){
        outer:
        for(let i=0; i<=100; i++){
            for(let j=0; j<=100; j++){
                if(i*xA + j*xB === prizeX && i*yA + j*yB === prizeY){ 
                    tokens += i*3 + j
                    break outer
                }
            }
        }
    }

    output(tokens)
}

// --- Part 2 --- //

{
    let tokens = 0
    for(const [[xA, yA], [xB, yB], [prizeX, prizeY]] of machines){
        const pX = prizeX + 10000000000000
        const pY = prizeY + 10000000000000

        const det = xA*yB - xB*yA

        let a = (pX*yB - pY*xB) / det
        let b = (-pX*yA + pY*xA) / det

        if(Number.isInteger(a) && Number.isInteger(b)){
            tokens += a*3 + b
        }
    }

    output(tokens)
}