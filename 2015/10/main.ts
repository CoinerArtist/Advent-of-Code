import { input, output } from "utility"

// --- Part 1 ---

function iterate(seq: string){
    let result = ""
    for(const [run, digit] of seq.matchAll(/(.)\1*/g)){
        result += run.length.toString() + digit
    }
    return result
}

let inp = input
for(let i=0; i<40; i++){
    inp = iterate(inp)
}

output(inp.length)

// --- Part 2 ---

for(let i=0; i<10; i++){
    inp = iterate(inp)
}

output(inp.length)