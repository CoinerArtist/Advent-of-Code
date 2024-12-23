import { count, input, output } from "utility"

// --- Part 1 --- //

const connections = input.matchAll(/(\w+)-(\w+)/g).map(([_, a, b]) => [a, b])

const computers: Record<string, Set<string>> = {}
for(const [a, b] of connections){
    if(computers[a] === undefined) computers[a] = new Set()
    if(computers[b] === undefined) computers[b] = new Set()
    computers[a].add(b)
    computers[b].add(a)
}

const triplets: Set<string> = new Set()
for(const k0 of Object.keys(computers)){
    for(const k1 of computers[k0]){
        const inter = computers[k0].intersection(computers[k1])
        for(const k2 of inter){
            triplets.add([k0, k1, k2].sort().join(","))
        }
    }
}

output(count(triplets, x => /t\w/.test(x) ? 1 : 0))

// --- Part 2 --- //

const orderedKeys = Object.keys(computers).sort()
const orderedComputers: Set<number>[] = []
for(const k of orderedKeys){
    const neighbours: Set<number> = new Set()
    for(const connected of computers[k]){
        const k1 = orderedKeys.indexOf(connected)
        if(k1 > orderedComputers.length) neighbours.add(k1)
    }
    orderedComputers.push(neighbours)
}

let maxGroup: number[] = []
function findGroups(k0: number, possibleComputers: Set<number> = orderedComputers[k0], acc: number[] = [k0]){
    const inter = orderedComputers[k0].intersection(possibleComputers)
    if(inter.size === 0){
        if(acc.length > maxGroup.length) maxGroup = [...acc]
    } else {
        for(const k1 of inter){
            acc.push(k1)
            findGroups(k1, inter, acc)
            acc.pop()
        }
    }
}

for(let k0=0; k0<orderedComputers.length; k0++){
    findGroups(k0)
}

output(maxGroup.map(x => orderedKeys[x]).join(","))