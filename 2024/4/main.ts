import { input, output, directions } from "utility";

// --- Part 1 ---

const grid = input.split("\n").map(x => x.split(""))

let xmas = 0
for(let y=0; y<grid.length; y++){
    for(let x=0; x<grid[0].length; x++){
        if(grid[y][x] === "X"){
            for(const dir of directions){
                if(
                    (y + dir[0]*3 >= 0 && y + dir[0]*3 < grid.length)
                    && grid[y + dir[0]*3][x + dir[1]*3] === "S"
                    && grid[y + dir[0]*2][x + dir[1]*2] === "A"
                    && grid[y + dir[0]][x + dir[1]] === "M"
                ){
                    xmas++
                }
            }
        }
    }
}

output(xmas)

// --- Part 2 ---

let mas = 0
for(let y=0; y<grid.length; y++){
    for(let x=0; x<grid[0].length; x++){
        if(
            grid[y][x] == "A" && y>=1 && y<grid.length-1
            && Number(grid[y-1][x-1] === "M" && grid[y+1][x+1] == "S") + Number(grid[y+1][x+1] === "M" && grid[y-1][x-1] === "S")
            + Number(grid[y-1][x+1] === "M" && grid[y+1][x-1] == "S") + Number(grid[y+1][x-1] === "M" && grid[y-1][x+1] === "S") === 2
        ){
            mas++
        }
    }
}

output(mas)