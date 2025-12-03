import { input, output } from "utility"

// --- Part 1 --- //

const inp = input.split("\n").map(x => x.split("").map(x => parseInt(x)))

function maxJoltage(bank: number[], digits: number, start=0, acc=0): number {
    let maxi = start
    for(let i=start; i<bank.length-digits; i++){
        if(bank[i] > bank[maxi]){
            maxi = i
        }
    }

    if(digits == 0){
        return bank[maxi] + acc*10
    } else {
        return maxJoltage(bank, digits-1, maxi+1, bank[maxi] + acc*10)
    }
}

let joltage2 = 0;
let joltage12 = 0;

for(const bank of inp){
    joltage2 += maxJoltage(bank, 1)
    joltage12 += maxJoltage(bank, 11)
}

output(joltage2)

// --- Part 2 --- //

output(joltage12)