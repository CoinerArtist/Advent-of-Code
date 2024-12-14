import { input, output } from "utility";

// --- Part 1 ---

const reports = input.split("\n").map(x => x.split(" ").map(y => parseInt(y)))

function isSafe(report: number[]){
    const sign = Math.sign(report[1] - report[0])
    for(let i=0; i<report.length-1; i++){
        const diff = report[i+1] - report[i]
        if(Math.sign(diff) != sign || Math.abs(diff) < 1 || Math.abs(diff) > 3){
            return i
        }
    }
    return -1
}

{
    let safe = 0
    for(const report of reports){
        if(isSafe(report) === -1) safe++
    }

    output(safe)
}


// --- Part 2 ---

function withoutIndex<T>(arr: T[], index: number){
    const copy = [...arr]
    copy.splice(index, 1)
    return copy
}

{
    let safe = 0
    for(const report of reports){
        const index = isSafe(report)
        if(index === -1 || isSafe(withoutIndex(report, index)) === -1 || isSafe(withoutIndex(report, index+1)) === -1 || isSafe(withoutIndex(report, 0)) === -1){
            safe++
        }
    }

    output(safe)
}