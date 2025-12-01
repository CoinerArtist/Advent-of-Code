import { input, mod, output } from "utility"

// --- Part 1 --- //

const inp = input.split("\n").map(x => x.match(/(R|L)(\d+)/)!).map(([_, dir, amount]) => parseInt(amount) * (dir=="R" ? 1 : -1))

let part1 = 0
let part2 = 0

let dial = 50
for(const change of inp){
    if(change > 0) part2 += Math.floor((dial + change) / 100)
    if(change < 0) part2 += Math.floor((mod(-dial, 100) - change) / 100)

    dial = mod(dial + change, 100)
    if(dial == 0) part1++
}

output(part1)

// --- Part 2 --- //

output(part2)








