import { Grid, input, output, directionsCardinal as directions, CountRecord, log, count } from "utility"

// --- Part 1 --- //

type Coord = [number, number]
function add([a, b]: Coord, [c, d]: Coord): Coord{
    return [a+c, b+d]
}

let start: Coord = [-1, -1]
let end: Coord = [-1, -1] 
let id = 0
const defaultValue = {wall: true, dist: Infinity, id: -1}

const grid = Grid.fromString(input, (value, y, x) => {
    if(value === "S") start = [y, x]
    if(value === "E") end = [y, x]
    return {
        wall: value === "#",
        dist: value === "E" ? 0 : Infinity,
        id: -1
    }
})

const toExplore: Coord[] = [end]

while(toExplore.length){
    const pos = toExplore.shift()!
    const cell = grid.get(...pos)!

    for(const dir of directions){
        const otherPos = add(pos, dir)
        const otherCell = grid.get(...otherPos, defaultValue)

        if(!otherCell.wall && otherCell.dist === Infinity){
            otherCell.dist = cell.dist + 1
            toExplore.push(otherPos)
        }
    }
}
console.log(grid.get(...start)!.dist)

const cheats = new CountRecord()
function passThroughWalls(pos: Coord, maxSteps: number){
    id++
    defaultValue.id = id

    const startDist = grid.get(...pos, defaultValue).dist

    const toPass: [Coord, number][] = [[pos, 0]]
    while(toPass.length){
        const [currentPos, steps] = toPass.shift()!
        const currentCell = grid.get(...currentPos, defaultValue)
        if(currentCell.id !== id){
            currentCell.id = id

            if(!currentCell.wall && currentCell.dist < startDist - steps){
                cheats.increment((startDist - currentCell.dist - steps).toString())
            }

            if(steps < maxSteps){
                for(const dir of directions){
                    const otherPos = add(currentPos, dir)
                    toPass.push([otherPos, steps+1])
                }
            }
        }
    }
}

toExplore.push(start)
while(toExplore.length){
    const pos = toExplore.shift()!
    const cell = grid.get(...pos)!

    passThroughWalls(pos, 2)

    for(const dir of directions){
        const otherPos = add(pos, dir)
        const otherCell = grid.get(...otherPos, defaultValue)

        if(!otherCell.wall && otherCell.dist < cell.dist){
            toExplore.push(otherPos)
        }
    }
}

log(cheats, "part1")
output(count(cheats.entries(), ([k, value]) => parseInt(k) >= 100 ? value : 0))

// --- Part 2 --- //

cheats.clear()

toExplore.push(start)
while(toExplore.length){
    const pos = toExplore.shift()!
    const cell = grid.get(...pos)!

    passThroughWalls(pos, 20)

    for(const dir of directions){
        const otherPos = add(pos, dir)
        const otherCell = grid.get(...otherPos, defaultValue)

        if(!otherCell.wall && otherCell.dist < cell.dist){
            toExplore.push(otherPos)
        }
    }
}

log(cheats, "part2")
output(count(cheats.entries(), ([k, value]) => parseInt(k) >= 100 ? value : 0))