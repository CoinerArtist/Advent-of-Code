import { input, output } from "utility"

// --- Part 1 ---

const [rawRules, molecule] = input.split('\n\n')

const rules: Record<string, string[]> = {}
const reverseRules: Record<string, string> = {}

for(const [_, start, end] of rawRules.matchAll(/(\w+) => (\w+)/g)){
    if(!rules[start]) rules[start] = []
    rules[start].push(end)
    reverseRules[end] = start
}

const parts = molecule.matchAll(/[A-Z][a-z]?/g).toArray().map(x => x[0])

const possibleMolecules = new Set<string>()
for(let i=0; i<parts.length; i++){
    const part = parts[i]
    const rule = rules[part]
    if(rule !== undefined){
        for(const replacement of rule){
            parts[i] = replacement
            possibleMolecules.add(parts.join(""))
        }
        parts[i] = part
    }
}

output(possibleMolecules.size)

// --- Part 2 ---

function solve(str: string): number {
    if(str === "e") return 0

    const cut = str.indexOf("Ar")
    if(cut >= 0){
        const start = str.substring(0, cut+2)
        const end = str.substring(cut+2)
        for(const k of Object.keys(reverseRules)){
            if(start.includes(k)){
                const dist = solve(start.replace(k, reverseRules[k]) + end) + 1
                if(dist !== Infinity) return dist
            }
        }
    } else {
        for(const k of Object.keys(reverseRules)){
            if(str.includes(k)){
                const dist = solve(str.replace(k, reverseRules[k])) + 1
                if(dist !== Infinity) return dist
            }
        }    
    }
    return Infinity
}

output(solve(molecule))