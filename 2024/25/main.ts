import { input, output } from "utility"

// --- Part 1 --- //

const schematics = input.split("\n\n")

const keys: number[][] = []
const locks: number[][] = []

for(const schematic of schematics){
    const lines = schematic.split("\n")
    const heights = Array(lines[0].length).fill(0)

    for(const line of lines){
        for(let i=0; i<lines.length; i++){
            if(line[i] === "#") heights[i]++
        }
    }

    if(schematic[0] === "#"){
        locks.push(heights)
    } else {
        keys.push(heights)
    }
}

function correctFit(key: number[], lock: number[]){
    return key.every((v, i) => v + lock[i] <= 7)
}

let correctPairs = 0
for(const key of keys){
    for(const lock of locks){
        if(correctFit(key, lock)) correctPairs++
    }
}

output(correctPairs)