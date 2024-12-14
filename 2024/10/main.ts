import { Grid, input, log, output } from "utility";

// --- Part 1 ---

const grid = Grid.fromString(input, x => {return {height: parseInt(x), visited: -1}})

{
    let newId = 0
    function getScore(y: number, x: number, level=0, id=newId++): number{
        const cell = grid.get(y, x)
        if(!cell || cell.visited === id || cell.height !== level) return 0
        cell.visited = id
        if(level === 9) return 1
    
        return getScore(y+1, x, level+1, id) + getScore(y-1, x, level+1, id) + getScore(y, x+1, level+1, id) + getScore(y, x-1, level+1, id)
    }
    
    output(grid.count((_, y, x) => getScore(y, x)))
}

// --- Part 2 ---

{
    function getScore(y: number, x: number, level=0): number{
        const cell = grid.get(y, x)
        if(!cell || cell.height !== level) return 0
        if(level === 9) return 1
    
        return getScore(y+1, x, level+1) + getScore(y-1, x, level+1) + getScore(y, x+1, level+1) + getScore(y, x-1, level+1)
    }
    
    output(grid.count((_, y, x) => getScore(y, x)))
}