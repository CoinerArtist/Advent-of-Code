import { input, output } from "utility"

// --- Part 1 ---

const strings = input.split("\n")

{
    let difference = 0
    for(const str of strings){
        difference += 2
        const match = str.substring(1, str.length-1).matchAll(/\\\\|\\\"|\\x[0-9a-f]{2}/g)
        for(const m of match) difference += m[0].length - 1
    }

    output(difference)
}

// --- Part 2 ---

{
    let difference = 0
    for(const str of strings){
        const match = str.matchAll(/\\|\"/g).toArray()
        difference += match.length + 2
    }

    output(difference)
}