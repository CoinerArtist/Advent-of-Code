import { cache, Grid, input, log, output } from "utility"

// --- Part 1 --- //

const grid = Grid.fromString(input, x => x)

const [_, startY ,startX] = grid.find(x => x === "S")!
grid.set(startY, startX, ".")

const toExplore: [number, number][] = [[startY, startX]]
let split = 0

while(toExplore.length){
    const [y, x] = toExplore.pop()!
    const char = grid.get(y, x, "x")

    if(char === "."){
        grid.set(y, x, "|")
        toExplore.push([y+1, x])
    } else if(char === "^"){
        split++
        toExplore.push([y, x-1], [y, x+1])
    }
}

log(grid.toString(x => x))
output(split)

// --- Part 2 --- //

const timelines = cache((y: number, x: number): number => {
    while(grid.get(y, x, "x") === "|") y++

    if(grid.get(y, x, "x") === "^"){
        return timelines(y, x-1) + timelines(y, x+1)
    } else {
        return 1
    }
})

output(timelines(startY, startX))







