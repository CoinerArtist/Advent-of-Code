import { input, log, output } from "utility";

// --- Part 1 ---

const problems = input.split("\n").map(x => {
    const [goal, eq] = x.split(": ")
    return {
        goal: parseInt(goal),
        eq: eq.split(" ").map(y => parseInt(y))
    }
})

{
    function isSolvable(goal: number, eq: number[], acc=eq[0], i=1): boolean{
        if(acc === goal && i === eq.length) return true
        if(acc > goal || i > eq.length) return false
    
        return isSolvable(goal, eq, acc + eq[i], i+1) || isSolvable(goal, eq, acc * eq[i], i+1)
    }
    
    let total = 0
    for(const {goal, eq} of problems){
        if(isSolvable(goal, eq)) total += goal
    }
    
    output(total)
}

// --- Part 2 ---

{
    function isSolvable(goal: number, eq: number[], acc=eq[0], i=1): boolean{
        if(acc === goal && i === eq.length) return true
        if(acc > goal || i > eq.length) return false
    
        return isSolvable(goal, eq, acc + eq[i], i+1) || isSolvable(goal, eq, acc * eq[i], i+1) || isSolvable(goal, eq, parseInt(`${acc}${eq[i]}`), i+1)
    }
    
    let total = 0
    for(const {goal, eq} of problems){
        if(isSolvable(goal, eq)) total += goal
    }
    
    output(total)
}