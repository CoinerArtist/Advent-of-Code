import { Grid, input, log, output, directionsCardinal as directions } from "utility"

// --- Part 1 --- //

type Coord = [number, number]
function add([a, b]: Coord, [c, d]: Coord): Coord{
    return [a+c, b+d]
}

const defaultValue = {wall: true, dist: Infinity, id: -1}

const grid = Grid.fromFunction(71, 71, () => {
    return {wall: false, dist: Infinity, id: -1}
})

const bytes = input.matchAll(/(\d+),(\d+)/g).map(([_, y, x]) => [parseInt(y), parseInt(x)] as Coord).toArray()

for(let i=0; i<1024; i++){
    grid.get(...bytes[i])!.wall = true
}

let id = 0
function getDist(){
    const end = grid.get(70, 70)!
    end.dist = 0
    end.id = ++id

    const toExplore: Coord[] = [[70, 70]]
    
    while(toExplore.length){
        const pos = toExplore.shift()!
        const cell = grid.get(...pos)!

        for(const dir of directions){
            const otherPos = add(pos, dir)
            const otherCell = grid.get(...otherPos, defaultValue)

            if(!otherCell.wall && otherCell.id !== id){
                otherCell.dist = cell.dist + 1
                otherCell.id = id
                toExplore.push(otherPos)
            }
        }
    }

    const start = grid.get(0, 0)!
    return start.id === id ? start.dist : Infinity
}

output(getDist())

// --- Part 2 --- //

for(let i=1024;; i++){
    grid.get(...bytes[i])!.wall = true
    if(getDist() === Infinity){
        output(bytes[i].join(","))
        break
    }
}

log(grid.toString(({wall}) => wall ? "#" : "."))