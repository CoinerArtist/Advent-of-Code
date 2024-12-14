import { input, log, output } from "utility";

// --- Part 1 ---

const listA: number[] = []
const listB: number[] = []

input.split("\n").forEach(line => {
    const [a, b] = line.split('   ')
    listA.push(parseInt(a))
    listB.push(parseInt(b))
})

listA.sort()
listB.sort()

let difference = 0
for(let i=0; i<listA.length; i++){
    difference += Math.abs(listA[i] - listB[i])
}

output(difference)

// --- Part 2 ---

const setA = new Set(listA)
const occ: Record<number, number> = {}

for(const id of setA){
    occ[id] = 0
}

for(const id of listB){
    if(occ[id] !== undefined) occ[id]++
}

let similarity = 0
for(const k of Object.keys(occ)){
    const key = parseInt(k)
    similarity += key * occ[key]
}

output(similarity)