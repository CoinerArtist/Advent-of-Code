import { input, output } from "utility"

// --- Part 1 ---

const goal = parseInt(input)

{
    const knownSolution = goal/10
    const presents = new Array(knownSolution).fill(10)
    let min = knownSolution

    for(let i=2; i < min ; i++){
        for(let j=1; i*j < min; j++){
            presents[i*j] += i*10
            if(presents[i*j] >= goal) min = i*j
        }
    }

    output(min)
}

// --- Part 2 ---

{
    const knownSolution = Math.ceil(goal/11)
    const presents = new Array(knownSolution).fill(10)
    let min = knownSolution

    for(let i=2; i < min ; i++){
        for(let j=1; i*j < min && j <= 50; j++){
            presents[i*j] += i*11
            if(presents[i*j] >= goal) min = i*j
        }
    }

    output(min)
}




