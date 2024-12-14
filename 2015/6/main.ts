import { input, output } from "utility"

// --- Part 1 ---

const instructions = input.matchAll(/(.+) (\d+),(\d+) through (\d+),(\d+)/g).toArray()
                          .map(([_, instr, x1, y1, x2, y2]) => {return {instr, start: [parseInt(x1), parseInt(y1)], end: [parseInt(x2), parseInt(y2)]}})

{
    const lights: number[][] = Array(1000).fill(0).map(_ => Array(1000).fill(0))
    
    for(const {instr, start, end} of instructions){
        for(let y=start[0]; y<=end[0]; y++){
            for(let x=start[1]; x<=end[1]; x++){
                if(instr === "toggle") lights[y][x] = (lights[y][x]+1)%2
                else lights[y][x] = instr === "turn on" ? 1 : 0
            }
        }
    }
    
    output(lights.reduce((acc, x) => acc + x.reduce((acc2, y) => acc2 + y), 0))
}

// --- Part 2 ---

{
    const lights: number[][] = Array(1000).fill(0).map(_ => Array(1000).fill(0))
    
    for(const {instr, start, end} of instructions){
        for(let y=start[0]; y<=end[0]; y++){
            for(let x=start[1]; x<=end[1]; x++){
                if(instr === "turn off") lights[y][x] = Math.max(lights[y][x]-1, 0)
                else lights[y][x] += instr === "turn on" ? 1 : 2
            }
        }
    }
    
    output(lights.reduce((acc, x) => acc + x.reduce((acc2, y) => acc2 + y), 0))
}