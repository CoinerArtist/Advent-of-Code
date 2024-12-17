import { input, log, mod, output } from "utility"

// --- Part 1 --- //

const [registersRaw, instructionsRaw] = input.split("\n\n")

const registers = registersRaw.match(/\d+/g)!.map(x => parseInt(x))
const instructions = instructionsRaw.match(/\d+/g)!.map(x => parseInt(x))

function runProgram(registers: number[], instructions: number[]){
    let programCounter = 0
    const out: number[] = []

    function comboOperand(operand: number){
        if(operand < 4){
            return operand
        } else {
            return registers[operand - 4]
        }
    }

    while(programCounter < instructions.length){
        const opcode = instructions[programCounter]
        const operand = instructions[programCounter + 1]

        switch(opcode){
            case 0: { // adv
                registers[0] = Math.trunc(registers[0] / (2 ** comboOperand(operand)))
            } break
            case 1: { // bxl
                registers[1] = registers[1] ^ operand
            } break
            case 2: { // bst
                registers[1] = mod(comboOperand(operand), 8)
            } break
            case 3: { // jnz
                if(registers[0] !== 0) programCounter = operand - 2
            } break
            case 4: { // bxc
                registers[1] = registers[1] ^ registers[2]
            } break
            case 5: { // out
                out.push(mod(comboOperand(operand), 8))
            } break
            case 6: { // bdv
                registers[1] = Math.trunc(registers[0] / (2 ** comboOperand(operand)))
            } break 
            case 7: { // cdv
                registers[2] = Math.trunc(registers[0] / (2 ** comboOperand(operand)))
            } break 
        }
    
        programCounter += 2
    }

    return out
}

output(runProgram(registers, instructions).join(","))

// --- Part 2 --- //

function toString(instructions: number[]){
    const instr = [["adv ", 0], ["bxl ", 1], ["bst ", 0], ["jnz ", 1], ["bxc", 2], ["out ", 0], ["bdv ", 0], ["cdv ", 0]] as const
    const combo = ["0", "1", "2", "3", "A", "B", "C"]

    let str = ""

    for(let i=0; i<instructions.length; i+=2){
        const [opcode, operandMode] = instr[instructions[i]]

        str += opcode
        if(operandMode === 0) str += combo[instructions[i+1]]
        else if(operandMode === 1) str += instructions[i+1]
        str += "\n"
    }

    return str
}
log(toString(instructions))

const noLoopInstructions = instructions.slice(0, -2)

function solve(a=0, index=instructions.length-1): number{
    if(index < 0) return a

    const goal = instructions[index]
    for(let i=0; i<8; i++){
        if(runProgram([a*8 + i, 0, 0], noLoopInstructions)[0] === goal){
            const solution = solve(a*8 + i, index-1)
            if(solution !== Infinity) return solution
        }
    }

    return Infinity
}

const a = solve()

console.log(instructions.join(","))
console.log(runProgram([a, 0, 0], instructions).join(","))
output(a)