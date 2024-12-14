import { input, output } from "utility"

// --- Part 1 ---

const instructions = input.matchAll(/(\w+) ([ab])?(?:, )?([+-]\d+)?/g)
                          .map(([_, instr, reg, offset]) => [instr, reg === "a" ? 0 : 1, parseInt(offset)] as [string, number, number]).toArray()

const registers = [0, 0]
let programCounter = 0

function execute(instr: string, reg: number, offset: number){
    switch(instr){
        case "hlf": {
            registers[reg] = Math.floor(registers[reg] / 2)
            programCounter++
        } break
        case "tpl": {
            registers[reg] = registers[reg]*3
            programCounter++
        } break
        case "inc": {
            registers[reg]++
            programCounter++
        } break
        case "jmp": {
            programCounter += offset
        } break
        case "jie": {
            if(registers[reg]%2 === 0){
                programCounter += offset 
            } else {
                programCounter++
            }
        } break
        case "jio": {
            if(registers[reg] === 1){
                programCounter += offset 
            } else {
                programCounter++
            }
        } break
    }
}

while(programCounter >= 0 && programCounter < instructions.length){
    execute(...instructions[programCounter])
}

output(registers[1])

// --- Part 2 ---

programCounter = 0
registers[0] = 1
registers[1] = 0

while(programCounter >= 0 && programCounter < instructions.length){
    execute(...instructions[programCounter])
}

output(registers[1])