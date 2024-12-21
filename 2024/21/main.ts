import { input, output, cache, count } from "utility"

// --- Part 1 --- //

type Coord = [number, number]
function sub([a, b]: Coord, [c, d]: Coord): Coord{
    return [a-c, b-d]
}

const codes = input.split("\n")

const doorKeypadString = 
`789
456
123
#0A`

const botKeypadString = 
`#^A
<v>`

const doorKeypad: Record<string, Coord> = {}
for(const [y, line] of doorKeypadString.split("\n").entries()){
    for(let x=0; x<line.length; x++){
        doorKeypad[line[x]] = [y, x]
    }
}

const botKeypad: Record<string, Coord> = {}
for(const [y, line] of botKeypadString.split("\n").entries()){
    for(let x=0; x<line.length; x++){
        botKeypad[line[x]] = [y, x]
    }
}

function getPressesY([y, _]: Coord){
    return y < 0 ? "^".repeat(-y) : "v".repeat(y)
}
function getPressesX([_, x]: Coord){
    return x < 0 ? "<".repeat(-x) : ">".repeat(x)
}

const getMinForMove = cache((start: Coord, end: Coord, bots: number, isFirst: boolean): number => {
    const diff = sub(end, start)
    
    if(bots === 0) return Math.abs(diff[0]) + Math.abs(diff[1]) + 1

    const dy = getPressesY(diff)
    const dx = getPressesX(diff)

    if(isFirst){
        if(start[0] === 3 && end[1] === 0) return getMinForCode(dy + dx + "A", bots-1)
        if(end[0] === 3 && start[1] === 0) return getMinForCode(dx + dy + "A", bots-1)
    } else {
        if(start[0] === 0 && end[1] === 0) return getMinForCode(dy + dx + "A", bots-1)
        if(end[0] === 0 && start[1] === 0) return getMinForCode(dx + dy + "A", bots-1)
    }

    return Math.min(getMinForCode(dy + dx + "A", bots-1), getMinForCode(dx + dy + "A", bots-1))
})

function getMinForCode(code: string, bots: number, isFirst=false): number {
    const keypad = isFirst ? doorKeypad : botKeypad 
    let lastPress = "A"

    return count(code, char => {
        const min = getMinForMove(keypad[lastPress], keypad[char], bots, isFirst)
        lastPress = char
        return min
    })
}

output(count(codes, code => parseInt(code.substring(0, code.length-1)) * getMinForCode(code, 2, true)))

// --- Part 2 --- //

output(count(codes, code => parseInt(code.substring(0, code.length-1)) * getMinForCode(code, 25, true)))