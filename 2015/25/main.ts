import { input, output } from "utility"

// --- Part 1 ---

const [_, row, column] = input.matchAll(/row (\d+), column (\d+)/g).toArray()[0].map(x => parseInt(x))

function iterNumber(row: number, column: number){
    const n = row + column - 1
    return (n * (n+1) / 2) - row
}

function iter(code: number){
    return (code * 252533) % 33554393
}

function getCode(row: number, column: number){
    let n = iterNumber(row, column)
    let code = 20151125
    for(let i=0; i<n; i++){
        code = iter(code)
    }
    return code
}

output(getCode(row, column))