import { input, log, output } from "utility"

// --- Part 1 --- //

const tiles = input.split("\n").map(x => x.split(",").map(x => parseInt(x)) as [number, number])

{
    let max = 0
    for(let i=0; i<tiles.length; i++){
        for(let j=i+1; j<tiles.length; j++){
            const dx = Math.abs(tiles[i][0] - tiles[j][0]) + 1
            const dy = Math.abs(tiles[i][1] - tiles[j][1]) + 1
            max = Math.max(max, dx*dy)
        }
    }
    
    output(max)
}

// --- Part 2 --- //

function rectLineIntersection([x1, y1]: [number, number], [x2, y2]: [number, number], [[a1, b1], [a2, b2]]: [[number, number], [number, number]]){
    const minX = Math.min(x1, x2)
    const maxX = Math.max(x1, x2)
    const minY = Math.min(y1, y2)
    const maxY = Math.max(y1, y2)

    if(a1 === a2){
        const maxB = Math.max(b1, b2)
        const minB = Math.min(b1, b2)

        return (minX < a1 && a1 < maxX) && (minY < maxB && minB < maxY)
    } else {
        const maxA = Math.max(a1, a2)
        const minA = Math.min(a1, a2)

        return (minY < b1 && b1 < maxY) && (minX < maxA && minA < maxX)
    }
}

const lines: [[number, number], [number, number]][] = []
for(let i=0; i<tiles.length; i++){
    const a = tiles.at(i-1)!
    const b = tiles.at(i)! 

    lines.push([a, b])
}

{
    let max = 0
    for(let i=0; i<tiles.length; i++){
        for(let j=i+1; j<tiles.length; j++){
            const dx = Math.abs(tiles[i][0] - tiles[j][0]) + 1
            const dy = Math.abs(tiles[i][1] - tiles[j][1]) + 1
            const area = dx*dy

            if(area > max && !lines.some(line => rectLineIntersection(tiles[i], tiles[j], line))){
                max = area
            }
        }
    }

    output(max)
}




