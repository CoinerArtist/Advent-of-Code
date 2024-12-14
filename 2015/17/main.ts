import { input, output } from "utility"

// --- Part 1 ---

const containers = input.split("\n").map(x => parseInt(x))

function combinations(volume: number, i=0): number{
    if(volume === 0) return 1
    if(volume < 0 || i === containers.length) return 0
    return combinations(volume, i+1) + combinations(volume - containers[i], i+1)
}

output(combinations(150))

// --- Part 2 ---

function minContainers(volume: number, i=0, used=0): [min: number, numOfWays: number]{
    if(volume === 0) return [used, 1]
    else if(volume < 0 || i === containers.length) return [Infinity, 1]
    
    const [minA, waysA] = minContainers(volume, i+1, used)
    const [minB, waysB] = minContainers(volume - containers[i], i+1, used+1)
    
    if(minA === minB) return [minA, waysA + waysB]
    else if(minA < minB) return [minA, waysA]
    else return [minB, waysB]
}

output(minContainers(150)[1])