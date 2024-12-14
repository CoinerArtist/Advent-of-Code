import { input, output } from "utility";

// --- Part 1 ---

{
    const valid = input.matchAll(/mul\((\d+),(\d+)\)/g)

    let result = 0
    for(const [_, x, y] of valid){
        result += parseInt(x)*parseInt(y)
    }

    output(result)
}

// --- Part 2 ---

{
    const valid = input.matchAll(/(?:mul\((\d+),(\d+)\))|(?:do\(\))|(?:don't\(\))/g)

    let state = true
    let result = 0
    for(const [instr, x, y] of valid){
        if(instr == "do()"){
            state = true
        } else if(instr == "don't()"){
            state = false
        } else if(state){
            result += parseInt(x)*parseInt(y)
        }
    }

    output(result)
}