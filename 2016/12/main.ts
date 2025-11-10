import { input, output } from "utility"

// --- Part 1 --- //

const instr = input.split("\n").map(x => x.split(" ").map(y => isNaN(parseInt(y)) ? y : parseInt(y)))
let registers: Record<string, number> = {a:0, b:0, c:0, d:0}
let pc = 0

function getValue(x: number | string){
    if(typeof(x) === "string"){
        return registers[x]
    } else {
        return x
    }
}

function run(){
    while(pc < instr.length){
        const [op, x, y] = instr[pc]
        switch(op){
            case "inc":
                registers[x]++
                break
            case "dec":
                registers[x]--
                break
            case "cpy":
                registers[y] = getValue(x)
                break
            case "jnz":
                if(getValue(x) != 0){
                    pc += getValue(y) - 1
                }
        }
        pc++
    }
}

run()
output(registers["a"])

// --- Part 2 --- //

registers = {a:0, b:0, c:1, d:0}
pc = 0

run()
output(registers["a"])