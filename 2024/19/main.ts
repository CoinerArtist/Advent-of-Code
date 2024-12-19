import { cache, count, input, output } from "utility"

// --- Part 1 --- //

const [towelsRaw, designsRaw] = input.split("\n\n")

const towels = new Set(towelsRaw.split(", "))
const designs = designsRaw.split("\n")

const minTowels = new Set(towels)
for(const towel of Array.from(minTowels.values())){
    minTowels.delete(towel)
    if(!isPossible(towel)) minTowels.add(towel)
}
console.log(Array.from(minTowels).join(", "))

function isPossible(design: string): boolean{
    if(minTowels.has(design)) return true

    for(const towel of minTowels){
        if(design.startsWith(towel) && isPossible(design.substring(towel.length))) return true
    }
    return false
}

const possibleDesigns: string[] = []

for(const design of designs){
    if(isPossible(design)) possibleDesigns.push(design)
}

output(possibleDesigns.length)

// --- Part 2 --- //

const getPossibilities = cache((design: string): number =>  {
    if(design === "") return 1

    let sum = 0
    for(const towel of towels){
        if(design.startsWith(towel)) sum += getPossibilities(design.substring(towel.length))
    }
    return sum
})

output(count(possibleDesigns, design => getPossibilities(design)))