import { input, numOfDigits, output } from "utility"

// --- Part 1 --- //

const inp = input.split(",").map(x => x.split("-").map(y => parseInt(y))) as [number, number][]

const invalidIds = new Set<number>()

function repeatedDigitsN(start: number, end: number, n: number){
    let repeat = Math.ceil(numOfDigits(start) / n)

    if(repeat < 2){
        repeat = Math.ceil(numOfDigits(end) / n)
        if(repeat <2) return 0
    }

    const pow = Math.pow(10, n)
    const top = Math.floor(start / Math.pow(pow, repeat-1))
    
    let incr = 1;
    for(let i=0; i<repeat-1; i++){
        incr = incr*pow + 1
    }
    
    const max = Math.min(Math.pow(pow, repeat), end)

    let min = Math.max(top, pow/10) * incr
    if(min < start) min += incr

    for(let i=min; i<=max; i+=incr){
        invalidIds.add(i)
    }
}

for(const [start, end] of inp){
    repeatedDigitsN(start, end, Math.ceil(numOfDigits(start) / 2))
}

output(invalidIds.values().reduce((acc, x) => acc+x))

// --- Part 2 --- //

function repeatedSingles(start: number, end: number){
    let repeat = Math.max(numOfDigits(start), 2)
    
    const top = Math.floor(start / Math.pow(10, repeat-1))

    let incr = 1;
    for(let i=0; i<repeat-1; i++){
        incr = incr*10 + 1
    }

    const change = Math.pow(10, repeat)

    let min = Math.max(top, 1) * incr
    if(min < start) min += incr

    for(let i=min; i<=end; i+=incr){
        if(i >= change){
            incr = incr*10 + 1
            i = incr
            if(i>end) break
        }

        invalidIds.add(i)
    }
}

for(const [start, end] of inp){
    const mid = Math.ceil(numOfDigits(start) / 2)

    for(let i=mid-1; i>1; i--){
        repeatedDigitsN(start, end, i)
    }
    repeatedSingles(start, end)
}

output(invalidIds.values().reduce((acc, x) => acc+x))