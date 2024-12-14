import { clamp, Grid, input, output } from "utility"

// --- Part 1 ---

function coordToKey(y: number, x: number){
    return y*3 + x + 1
}

const directions: Record<string, [number, number]> = {
    U: [-1, 0],
    D: [1, 0],
    L: [0, -1],
    R: [0, 1]
}

const instr = input.split("\n")

{
    let y = 1
    let x = 1

    let code = ""

    for(const line of instr){
        for(const dir of line){
            const move = directions[dir]
            y = clamp(0, 2, y+move[0])
            x = clamp(0, 2, x+move[1])
        }
        code += coordToKey(y, x).toString()
    }

    output(code)
}

// --- Part 2 ---

{
    let keypad = Grid.fromData(["..1..", ".234.", "56789", ".ABC.", "..D.."])

    let y = 2
    let x = 0

    let code = ""

    for(const line of instr){
        for(const dir of line){
            const move = directions[dir]
            if(keypad.get(y+move[0], x+move[1], ".") !== "."){
                y = y+move[0]
                x = x+move[1]
            }
        }
        code += keypad.get(y, x, "?")
    }

    output(code)
}