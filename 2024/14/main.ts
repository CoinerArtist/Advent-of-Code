import { Grid, input, log, mod, output } from "utility"

// --- Part 1 --- //

type Bot = [[number, number], [number, number]]

const bots = input.matchAll(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/g).map(([_, x, y, vx, vy]) => [[parseInt(y), parseInt(x)], [parseInt(vy), parseInt(vx)]] as Bot).toArray()

function getBotPos([[y, x], [vy, vx]]: Bot, seconds: number){
    return [mod(y + seconds*vy, 103), mod(x + seconds*vx, 101)]
}

const quadrants = [0, 0, 0, 0]
for(const bot of bots){
    const [endY, endX] = getBotPos(bot, 100)

    const quadY = Math.sign(endY - 51) + 1
    const quadX = Math.sign(endX - 50) + 1
    if(quadY === 1 || quadX === 1) continue

    quadrants[quadX/2 + quadY] += 1
}

output(quadrants.reduce((acc, x) => x*acc))

// --- Part 2 --- //

outer:
for(let i=0; i<10000; i++){
    const grid = new Array(103).fill(0).map(_ => new Array(101).fill("."))

    for(const bot of bots){
        const [y, x] = getBotPos(bot, i)
        grid[y][x] = "#"
    }

    for(const line of grid){
        if(line.join("").includes("#".repeat(30))){
            log(grid.reduce((acc, x) => acc + x.join("") + "\n", ""))

            output(i)
            break outer
        }
    }
}