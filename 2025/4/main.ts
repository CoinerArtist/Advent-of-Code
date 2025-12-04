import { directions, Grid, input, log, output } from "utility"

// --- Part 1 --- //

const grid = Grid.fromData(input.split("\n"))

function canAccess(x: number, y: number){
    let rolls = 0
    for(const [dx, dy] of directions){
        rolls += grid.get(x+dx, y+dy, ".") === "@" ? 1 : 0
    }

    return rolls < 4
}

output( grid.count((val, x, y) => val === "@" && canAccess(x, y) ? 1 : 0) )

// --- Part 2 --- //

let total = 0

function tryToRemove(x: number, y: number){
    if(grid.get(x, y, ".") === "@" && canAccess(x, y)){
        total++
        grid.set(x, y, ".")
        for(const [dx, dy] of directions) tryToRemove(x+dx, y+dy)    
    }
}

for(const [_, x, y] of grid.iterate()) tryToRemove(x, y)

output(total)