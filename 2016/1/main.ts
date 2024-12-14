import { input, output, directionsCardinal as directions, ObjectSet, mod } from "utility"

// --- Part 1 ---

const instructions = input.matchAll(/([LR])(\d+)/g).map(([_, turn, distance]) => [turn, parseInt(distance)] as const).toArray()

{
    let dir = 0

    let y = 0
    let x = 0

    for(const [turn, distance] of instructions){
        dir = mod(dir + (turn === "R" ? 1 : -1), 4)

        const direction = directions[dir]
        y += direction[0] * distance
        x += direction[1] * distance
    }

    output(Math.abs(y) + Math.abs(x))
}

// --- Part 2 ---

{
    let dir = 0

    let visited = new ObjectSet<[number, number]>([[0, 0]])

    let y = 0
    let x = 0

    outer:
    for(const [turn, distance] of instructions){
        dir = mod(dir + (turn === "R" ? 1 : -1), 4)

        const direction = directions[dir]
        for(let i=0; i<distance; i++){
            y += direction[0]
            x += direction[1]
            if(visited.has([y, x])){
                output(Math.abs(y) + Math.abs(x))
                break outer
            } 
            visited.add([y, x])
        }
    }
}