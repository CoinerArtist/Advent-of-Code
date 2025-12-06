import { input, output } from "utility"

// --- Part 1 --- //

const inp = input.split("\n").map(x => x.trim().split(/ +/))
const operators = inp.at(-1)!

{
    const problems: number[][] = []
    
    for(let i=0; i<operators.length; i++){
        const p: number[] = []

        for(let j=0; j<inp.length-1; j++){
            p.push(parseInt(inp[j][i]))
        }

        problems.push(p)
    }   
    
    let count = 0
    for(let i=0; i<operators.length; i++){
        if(operators[i] === "+"){
            count += problems[i].reduce((acc, x) => acc + x)
        } else {
            count += problems[i].reduce((acc, x) => acc * x)
        }
    }
    output(count)
}

// --- Part 2 --- //

const inp2 = input.split("\n").slice(0, -1)
const len = inp2.reduce((acc, x) => Math.max(acc, x.length), 0)

{
    const problems: number[][] = []

    let x = 0
    while(x < len){
        const p: number[] = []

        let num = "-1"
        while(num !== "" && x < len){
            num = ""
            for(let y=0; y<inp2.length; y++){
                if(inp2[y][x] !== " ") num += inp2[y][x]
            }

            if(num !== "") p.push(parseInt(num))
            x++
        }

        problems.push(p)
    }

    let count = 0
    for(let i=0; i<operators.length; i++){
        if(operators[i] === "+"){
            count += problems[i].reduce((acc, x) => acc + x)
        } else {
            count += problems[i].reduce((acc, x) => acc * x)
        }
    }
    output(count)
}