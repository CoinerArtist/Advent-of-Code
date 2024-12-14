import { input, output } from "utility"

// --- Part 1 ---


const triangles = input.matchAll(/(\d+) +(\d+) +(\d+)/g).map(([_, a, b, c]) => [parseInt(a), parseInt(b), parseInt(c)]).toArray()

function isCorrect(trig: number[]){
    return trig[0] + trig[1] > trig[2] && trig[1] + trig[2] > trig[0] && trig[2] + trig[0] > trig[1]
}

output(triangles.reduce((acc, trig) => acc + (isCorrect(trig) ? 1 : 0), 0))

// --- Part 2 ---

const correctTriangles: number[][] = []

for(let i=0; i<triangles.length/3; i++){
    correctTriangles.push([triangles[i*3][0], triangles[i*3+1][0], triangles[i*3+2][0]])
    correctTriangles.push([triangles[i*3][1], triangles[i*3+1][1], triangles[i*3+2][1]])
    correctTriangles.push([triangles[i*3][2], triangles[i*3+1][2], triangles[i*3+2][2]])
}

output(correctTriangles.reduce((acc, trig) => acc + (isCorrect(trig) ? 1 : 0), 0))