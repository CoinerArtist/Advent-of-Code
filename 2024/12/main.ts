import { input, output, directionsCardinal as directions, Grid, mod } from "utility"

// --- Part 1 --- //

function add([a, b]: [number, number], [c, d]: [number, number]): [number, number]{
    return [a+c, b+d]
}

const defaultCell = {plant: "", visited: true}

const grid = Grid.fromString(input, value => {
    return {
        plant: value,
        visited: false
    }
})

function getAreaAndPerimeter(plant: string, [y, x]: [number, number]): [number, number] {
    const cell = grid.get(y, x, defaultCell)

    if(cell.plant !== plant) return [0, 1]
    if(cell.visited) return [0, 0]

    cell.visited = true

    let sum: [number, number] = [1, 0]
    for(const dir of directions){
        sum = add(sum, getAreaAndPerimeter(plant, add([y, x], dir)))
    }
    return sum
}

output(grid.count(({plant}, y, x) => {
    const [area, perimeter] = getAreaAndPerimeter(plant, [y, x])
    return area * perimeter
}))


// --- Part 2 --- //

for(const [cell] of grid.iterate()) cell.visited = false

function isCorner(plant: string, [y, x]: [number, number], dir: number){
    const otherDir = mod(dir + 1, 4)
    const cell = grid.get(...add([y, x], directions[dir]), defaultCell)
    const otherCell = grid.get(...add([y, x], directions[otherDir]), defaultCell)
    const cornerCell = grid.get(...add([y, x], add(directions[dir], directions[otherDir])), defaultCell)

    if(cell.plant !== plant && otherCell.plant !== plant){
        return 1
    } else if(cell.plant === plant && otherCell.plant === plant && cornerCell.plant !== plant){
        return 1
    } else {
        return 0
    }
}

function getAreaAndCorners(plant: string, [y, x]: [number, number]): [number, number] {
    const cell = grid.get(y, x, defaultCell)

    if(cell.visited || cell.plant !== plant) return [0, 0]

    cell.visited = true

    let sum: [number, number] = [1, 0]
    for(const [i, dir] of directions.entries()){
        sum = add(sum, getAreaAndCorners(plant, add([y, x], dir)))
        sum[1] += isCorner(plant, [y, x], i)
    }
    return sum
}

output(grid.count(({plant}, y, x) => {
    const [area, sides] = getAreaAndCorners(plant, [y, x])
    return area * sides
}))