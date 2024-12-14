import { input, output } from "utility"

// --- Part 1 ---

const weights = input.split("\n").map(x => parseInt(x))
const totalWeight = weights.reduce((acc, x) => acc+x)

function getMinEntanglement(numOfContainers: number){
    const targetWeight = totalWeight / numOfContainers

    let minSize = Infinity
    let minEntanglement = Infinity
    function stable(acc=0, size=0, entanglement=1, i=0){
        if(acc > targetWeight || size > minSize || (size === minSize && entanglement > minEntanglement)) return
        if(acc === targetWeight){
            minSize = size
            minEntanglement = entanglement
        } else if(i < weights.length){
            const pack = weights[i]
            stable(acc+pack, size+1, entanglement*pack, i+1)
            stable(acc, size, entanglement, i+1)
        }
    }

    stable()
    return minEntanglement
}

output(getMinEntanglement(3))

// --- Part 2 ---

output(getMinEntanglement(4))