import { input, ObjectSet, output } from "utility"

// --- Part 1 ---

const directions: Record<string, [number, number]> = {">": [1, 0], "<": [-1, 0], "^": [0, 1], "v": [0, -1]}

function translate(a: [number, number], b: [number, number]){
    a[0] += b[0]
    a[1] += b[1]
}

{
    const visited = new ObjectSet([[0, 0]])
    const santa: [number, number] = [0, 0]

    for(const dir of input){
        translate(santa, directions[dir])
        visited.add(santa)
    }

    output(visited.size)
}

// --- Part 2 ---

{
    const visited = new ObjectSet([[0, 0]])
    const santa: [number, number] = [0, 0]
    const roboSanta: [number, number] = [0, 0]

    for(let i=0; i<input.length; i++){
        const target = i%2 == 0 ? santa : roboSanta
        translate(target, directions[input[i]])
        visited.add(target)
    }

    output(visited.size)
}