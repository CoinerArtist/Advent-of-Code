import { input, log, output } from "utility";

// --- Part 1 ---

const [rulesRaw, updatesRaw] = input.split("\n\n")

// Pages that should be after
const rules: Record<string, Set<string>> = {}

for(const [_, a, b] of rulesRaw.matchAll(/([0-9]+)\|([0-9]+)/g)){
    if(rules[a] === undefined) rules[a] = new Set()
    rules[a].add(b)
}

function checkPage(update: string[], i: number){
    const rule = rules[update[i]] 
    for(let j=0; j<i; j++){
        if(rule.has(update[j])) return false
    }
    return true
}

let middlePages = 0
let incorrectUpdate: string[][] = []

for(const update of updatesRaw.split("\n").map(x => x.split(","))){
    if(update.every((_, i) => checkPage(update, i))){
        middlePages += parseInt(update[(update.length-1)/2])
    } else {
        incorrectUpdate.push(update)
    }
}

output(middlePages)

// --- Part 2 ---

log(incorrectUpdate)

function findError(update: string[], i: number){
    const rule = rules[update[i]] 
    for(let j=0; j<i; j++){
        if(rule.has(update[j])){
            const temp = update.splice(j, 1)[0]
            update.splice(i, 0, temp)
            return true
        }
    }
    return false
}

let middlePages2 = 0

for(const update of incorrectUpdate){
    for(let i=0; i<update.length; i++){
        if(findError(update, i)) i=0
    }

    middlePages2 += parseInt(update[(update.length-1)/2])
}

log(incorrectUpdate)
output(middlePages2)