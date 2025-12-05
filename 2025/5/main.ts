import { input, output } from "utility"

// --- Part 1 --- //

const [inp1, inp2] = input.split("\n\n")

const ranges = inp1.split("\n").map(x => x.split("-").map(x => parseInt(x)) as [number, number])
const ids = inp2.split("\n").map(y => parseInt(y))

let count = 0
for(const id of ids){
    count += ranges.some(([a, b]) => a<=id && id<=b) ? 1 : 0
}

output(count)

// --- Part 2 --- //

const mergedRanges: [number, number][] = []

for(let [a, b] of ranges){
    for(let i=0; i<mergedRanges.length; i++){
        const r = mergedRanges[i]

        if((r[0]<=a && a<=r[1]) || (r[0]<=b && b<=r[1]) || (a<=r[0] && r[0]<=b)){
            a = Math.min(a, r[0])
            b = Math.max(b, r[1])
            mergedRanges.splice(i, 1)
            i--
        }
    }

    mergedRanges.push([a, b])
}

output(mergedRanges.reduce((acc, [a, b]) => acc + (b-a+1), 0))