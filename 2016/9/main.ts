import { input, output } from "utility"

// --- Part 1 --- //

let str = input

let len = 0
let match = str.match(/\((\d+)x(\d+)\)/)
while(match){
    len += match.index!
    len += parseInt(match[1]) * parseInt(match[2])
    
    str = str.substring(match.index! + match[0].length + parseInt(match[1]))

    match = str.match(/\((\d+)x(\d+)\)/)
}

output(len + str.length)

// --- Part 2 --- //

function decompress(str: string): number{
    let len = 0

    let match = str.match(/\((\d+)x(\d+)\)/)
    while(match){
        len += match.index!
        len += decompress(str.substring(match.index! + match[0].length, match.index! + match[0].length + parseInt(match[1]))) * parseInt(match[2])
        
        str = str.substring(match.index! + match[0].length + parseInt(match[1]))

        match = str.match(/\((\d+)x(\d+)\)/)
    }

    return len + str.length
}

output(decompress(input))