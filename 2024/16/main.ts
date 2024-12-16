import { Grid, input, output, directionsCardinal as directions, mod, log } from "utility"

// --- Part 1 --- //

type Coord = [number, number]
function add([a, b]: Coord, [c, d]: Coord): Coord{
    return [a+c, b+d]
}

let start: Coord = [-1, -1]
let end: Coord = [-1, -1] 

const grid = Grid.fromString(input, (value, y, x) => {
    if(value === "S") start = [y, x]
    if(value === "E") end = [y, x]
    return {
        char: value,
        dist: [Infinity, Infinity, Infinity, Infinity],
        onBestPath: false
    }
})

{
    const toExplore: [Coord, number, number][] = [[start, 0, 1]]
    function push(pos: Coord, dist: number, dir: number){
        for(let i=0; i<toExplore.length; i++){
            if(dist <= toExplore[i][1]){
                toExplore.splice(i, 0, [pos, dist, dir])
                return
            }
        }
        toExplore.push([pos, dist, dir])
    }

    function explore([pos, dist, dir]: [Coord, number, number]){
        const cell = grid.get(...pos)!
        if(cell.dist[dir] !== Infinity) return
        cell.dist[dir] = dist

        for(const i of [-1, 0, 1]){
            const otherDir = mod(dir + i, 4)
            const otherPos = add(pos, directions[otherDir])
            const otherCell = grid.get(...otherPos)!
            const otherDist = i === 0 ? 1 : 1001

            if(otherCell.char !== "#" && otherCell.dist[otherDir] === Infinity){
                push(otherPos, dist + otherDist, otherDir)
            }
        }
    }

    while(toExplore.length){
        explore(toExplore.shift()!)
    }
}

const minScore = Math.min(...grid.get(...end)!.dist)
output(minScore)

// --- Part 2 --- //

{
    function explore(pos: Coord, score: number){
        const cell = grid.get(...pos)!
        if(cell.onBestPath || cell.char === "#") return
        cell.onBestPath = true

        for(const [i, dir] of directions.entries()){
            const step = score - cell.dist[mod(i+2, 4)]
            if(step === 1 || step === 1001){
                explore(add(pos, dir), cell.dist[mod(i+2, 4)])
            }
        }
    }

    explore(end, minScore+1)

    log(grid.toString(({char, onBestPath}) => onBestPath ? "O" : char))
    output(grid.count(({onBestPath}) => onBestPath ? 1 : 0))
}