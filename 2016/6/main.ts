import { CountRecord, input, output } from "utility"

// --- Part 1 ---

const signals = input.split('\n')
const length = signals[0].length

const occ: CountRecord[] = new Array(length).fill(null).map(() => {return new CountRecord()})

for(const signal of signals){
    for(let i=0; i<length; i++){
        const letter = signal[i]
        occ[i].increment(letter)
    }
}

function findMax(obj: CountRecord){
    let max = 0
    let maxLetter = ""
    for(const [letter, value] of obj.entries()){
        if(value > max){
            max = value
            maxLetter = letter
        }
    }
    return maxLetter
}

output(occ.map(x => findMax(x)).join(""))

// --- Part 2 ---

function findMin(obj: CountRecord){
    let min = Infinity
    let minLetter = ""
    for(const [letter, value] of obj.entries()){
        if(value < min){
            min = value
            minLetter = letter
        }
    }
    return minLetter
}

output(occ.map(x => findMin(x)).join(""))