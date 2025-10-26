import { input, log, output } from "utility";

// --- Part 1 ---

const directions: [number, number][] = [[-1, 0], [0, 1], [1, 0], [0, -1]]
const dirSymbol = ["^", ">", "v", "<"]

let position: [number, number] = [0, 0]
let dir = 0
let blockId = 0

let visited = 0
let loops = 0

const map = input.split("\n").map((a, y) => a.split("").map((b, x) => {
    if(b === "^") position = [y, x]
    return {solid: b === "#", visited: false, visitDir: [] as number[], blockId: -1, blockDir: [] as number[]}
}))

function add(a: [number, number], b: [number, number]): [number, number]{
    return [a[0]+b[0], a[1]+b[1]]
}

function read([y, x]: [number, number]){
    return map[y] ? map[y][x] : undefined
}

function checkLoop(){
    let newBlock = read(add(position, directions[dir]))!
    let otherPos = position
    let otherDir = (dir + 1)%4

    newBlock.solid = true

    while(true){
        const nextPos = add(otherPos, directions[otherDir])
        const nextCell = read(nextPos)
    
        if(nextCell === undefined){
            newBlock.solid = false
            return 0
        } else if(nextCell.solid) {
            otherDir = (otherDir + 1)%4
            read(nextPos)!.blockDir.push(otherDir)
        } else {
            if(nextCell.visited && nextCell.visitDir.includes(otherDir)){
                newBlock.solid = false
                return 1
            } else if(nextCell.blockId === blockId){
                if(nextCell.blockDir.includes(otherDir)){
                    newBlock.solid = false
                    return 1
                } else {
                    nextCell.blockDir.push(otherDir)
                }
            } else{
                nextCell.blockId = blockId
                nextCell.blockDir = [otherDir]
            }

            otherPos = nextPos
        }
    }
}

while(true){
    const nextPos = add(position, directions[dir])
    const nextCell = read(nextPos)

    if(nextCell === undefined){
        break
    } else if(nextCell.solid) {
        dir = (dir + 1)%4
        read(position)!.visitDir.push(dir)
    } else {        
        if(!nextCell.visited){
            loops += checkLoop()
            blockId++
            visited++
            nextCell.visited = true
        }
        
        nextCell.visitDir.push(dir)
        position = nextPos
    }
}

let str = ""
for(const line of map){
    for(const {solid, visited, visitDir} of line){
        if(solid) str += "#"
        else if(visited) str += visitDir.length === 1 ? dirSymbol[visitDir[0]] : "+"
        else str += " "
    }
    str += '\n'
}
log(str)

output(visited)

// --- Part 2 ---

output(loops)