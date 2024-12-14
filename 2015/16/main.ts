import { input, output } from "utility"

// --- Part 1 ---

type Sue = Record<string, number>

const giftGiver: Sue = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
}

const sues: Sue[] = []

for(const line of input.split("\n")){
    const sue: Sue = {}
    for(const [_, obj, quantity] of line.matchAll(/(\w+): (\d+)/g)){
        sue[obj] = parseInt(quantity)
    }
    sues.push(sue)
}

for(const [i, sue] of sues.entries()){
    if(Object.keys(sue).every(k => sue[k] === giftGiver[k])){
        output(i+1)
        break
    }
}

// --- Part 2 ---

const greater = new Set(["cats", "trees"])
const lesser = new Set(["pomeranians", "goldfish"])
const uncertain = greater.union(lesser)

for(const [i, sue] of sues.entries()){
    if(Object.keys(sue).every(k => 
        (!uncertain.has(k) && sue[k] === giftGiver[k]) 
     || (greater.has(k) && sue[k] > giftGiver[k]) 
     || (lesser.has(k) && sue[k] < giftGiver[k]))
    ){
        output(i+1)
        break
    }
}





