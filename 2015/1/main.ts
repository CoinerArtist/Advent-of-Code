import { input, output } from "utility"

// --- Part 1 ---

{
    let floor = 0
    for(const instr of input){
        floor += (instr == "(") ? 1 : -1
    }

    output(floor)
}

// --- Part 2 ---

{
    let floor = 0
    for(let i=0; i<input.length; i++){
        floor += (input[i] == "(") ? 1 : -1
        if(floor == -1){
            output(i+1)
            break
        }
    }
}