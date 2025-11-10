import { input, ObjectSet, output } from "utility"

// --- Part 1 --- //

const generators: Record<string, number> = {}
const chips: Record<string, number> = {}

for(const [i, line] of input.split("\n").entries()){
    for(const [_, isotope] of line.matchAll(/(\w+?) generator/g)){
        generators[isotope] = i
    }
    for(const [_, isotope] of line.matchAll(/(\w+?)-compatible microchip/g)){
        chips[isotope] = i
    }
}

type State = {
    floor: number
    generators: number[]
    chips: number[]
    depth: number
}

// --- //

function toKey(state: State){
    const arr = state.generators.map((x,i) => x*10 + state.chips[i]).sort()
    return `${state.floor}|${arr}`
}

function isWinState(state: State){
    return state.generators.every(x => x===3) && state.chips.every(x => x===3)
}

function isValidState(state: State){
    return state.chips.every((x, i) => state.generators[i] === x || !state.generators.some(y => x === y))
}

function findMinimumSteps(startState: State){
    const seen = new ObjectSet([startState], toKey);
    const toExplore = [startState]
    
    function exploreNeighbourState(state: State, dir: number, iso: number, chipOrGen: boolean, iso2=-1, chipOrGen2=false){
        const floor = state.floor + dir
        if(floor < 0 || floor >= 4 ){ return }
    
        const generators = [...state.generators]
        const chips = [...state.chips]
    
        const target = chipOrGen ? chips : generators
        if(target[iso] !== state.floor){ return }
        target[iso] += dir
    
        if(iso2 >= 0){
            const target2 = chipOrGen2 ? chips : generators
            if(target2[iso2] !== state.floor){ return }
            target2[iso2] += dir
        }
    
        const newState: State = {floor, generators, chips, depth: state.depth+1}
    
        if(!seen.has(newState)){
            seen.add(newState)
            if(isValidState(newState)){
                toExplore.push(newState)
            }
        }
    }
    
    while(toExplore.length){
        const state = toExplore.shift()!
    
        if(isWinState(state)){
            output(state.depth)
            break
        }
    
        for(const dir of [1, -1]){
            for(let i=0; i<isotopes.length; i++){
                exploreNeighbourState(state, dir, i, true)
                exploreNeighbourState(state, dir, i, false)
                exploreNeighbourState(state, dir, i, false, i, true)
            }
        }

        for(let i=0; i<isotopes.length; i++){
            for(let j=i+1; j<isotopes.length; j++){
                exploreNeighbourState(state, 1, i, true, j, true)
                exploreNeighbourState(state, 1, i, false, j, false)
            }
        }
    }
}

// --- //

let isotopes = Object.keys(generators)
findMinimumSteps({floor: 0, generators: isotopes.map(x => generators[x]), chips: isotopes.map(x => chips[x]), depth: 0})

// --- Part 2 --- //

generators["elerium"] = 0
chips["elerium"] = 0
generators["dilithium"] = 0
chips["dilithium"] = 0

isotopes = Object.keys(generators)
findMinimumSteps({floor: 0, generators: isotopes.map(x => generators[x]), chips: isotopes.map(x => chips[x]), depth: 0})