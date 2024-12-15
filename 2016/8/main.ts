import { Grid, input, log, mod, output } from "utility"

// --- Part 1 --- //

const instructions = input.matchAll(/(rect|rotate (?:row|column)).+?(\d+).+?(\d+)/g)
                          .map(([_, instr, a, b]) => [instr, parseInt(a), parseInt(b)] as [string, number, number])

const width = 50
const height = 6
const grid = Grid.fromValue(height, width, false)

for(const [instr, a, b] of instructions){
    if(instr === "rect"){
        for(let x=0; x<a; x++){
            for(let y=0; y<b; y++){
                grid.set(y, x, true)
            }
        }
    } else if(instr === "rotate row"){
        const newRow: boolean[] = []
        for(let x=0; x<width; x++) newRow.push(grid.get(a, mod(x-b, width))!)
        for(let x=0; x<width; x++) grid.set(a, x, newRow[x])
    } else {
        const newColumn: boolean[] = []
        for(let y=0; y<height; y++) newColumn.push(grid.get(mod(y-b, height), a)!)
        for(let y=0; y<height; y++) grid.set(y, a, newColumn[y])
    }

    log(grid.toString(value => value ? "#" : "."))
}

output(grid.count(value => value ? 1 : 0))

// --- Part 2 --- //

console.log("\n" + grid.toString(value => value ? "█" : " "))
output(prompt("Please input password: ")?.toUpperCase())