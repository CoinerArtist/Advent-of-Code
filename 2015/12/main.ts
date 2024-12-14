import { input, output } from "utility"

// --- Part 1 ---

output(input.matchAll(/-?\d+/g).reduce((acc, x) => acc + parseInt(x[0]), 0))

// --- Part 2 ---

const obj = JSON.parse(input)

type Rec = Object | string | number | Rec[]

function sum(obj: Rec){
    if(typeof(obj) === "object"){
        if(Array.isArray(obj) === false && Object.values(obj).includes("red")) return 0
        return Object.values(obj).reduce((acc, x) => acc + sum(x), 0)
    } else if(typeof(obj) === "number"){
        return obj
    }
    return 0
}

output(sum(obj))