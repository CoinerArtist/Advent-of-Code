import { Grid, input, log, output } from "utility"

// --- Part 1 --- //

const directions: Record<string, [number, number]> = {">": [0, 1], "<": [0, -1], "^": [-1, 0], "v": [1, 0]}

function add([a, b]: [number, number], [c, d]: [number, number]): [number, number]{
    return [a+c, b+d]
}

const [gridString, instructionsString] = input.split("\n\n")

const instructions = instructionsString.replaceAll("\n", "")

{
    let pos: [number, number] = [-1, -1]
    const grid = Grid.fromString(gridString, (value, y, x) => {
        if(value === "@"){
            pos = [y, x] 
            return "."
        }
        return value
    })

    function push(pos: [number, number], dir: [number, number]): boolean{
        const cell = grid.get(...pos, "#")

        if(cell === ".") return true
        if(cell === "#") return false

        const pushPos = add(pos, dir)

        if(push(pushPos, dir)){
            grid.set(...pushPos, cell)
            return true
        } else {
            return false
        }
    }

    for(const dir of instructions){
        let pushPos = add(pos, directions[dir])
        if(push(pushPos, directions[dir])){
            grid.set(...pushPos, ".")
            pos = pushPos
        }
    }

    log(grid.toString((value, y, x) => {
        if(y === pos[0] && x === pos[1]) return "@"
        else return value
    }))

    output(grid.count((value, y, x) => {
        if(value === "O") return y * 100 + x
        else return 0
    }))
}

// --- Part 2 --- //

{
    const newGridString = gridString.replaceAll(".", "..").replaceAll("@", "@.").replaceAll("#", "##").replaceAll("O", "[]")

    let pos: [number, number] = [-1, -1]
    const grid = Grid.fromString(newGridString, (value, y, x) => {
        if(value === "@"){
            pos = [y, x] 
            return "."
        }
        return value
    })

    function canPush(pos: [number, number], dir: [number, number]): boolean{
        const cell = grid.get(...pos, "#")

        if(cell === ".") return true
        if(cell === "#") return false

        const pushPos = add(pos, dir)
        const otherPushPos = add(pushPos, cell === "[" ? [0, 1] : [0, -1])

        return canPush(pushPos, dir) && (dir[0] === 0 || canPush(otherPushPos, dir))
    }

    function push(pos: [number, number], dir: [number, number]){
        const cell = grid.get(...pos, "#")

        if(cell === ".") return

        const pushPos = add(pos, dir)
        
        push(pushPos, dir)
        grid.set(...pushPos, cell)
        grid.set(...pos, ".")

        if(dir[0] !== 0){
            const otherHalf: [number, number] = cell === "[" ? [0, 1] : [0, -1]
            push(add(pushPos, otherHalf), dir)
            grid.set(...add(pushPos, otherHalf), cell === "[" ? "]" : "[")
            grid.set(...add(pos, otherHalf), ".")
        }
    }

    for(const dir of instructions){
        let pushPos = add(pos, directions[dir])
        if(canPush(pushPos, directions[dir])){
            push(pushPos, directions[dir])
            pos = pushPos
        }
    }

    log(grid.toString((value, y, x) => {
        if(y === pos[0] && x === pos[1]) return "@"
        else return value
    }))

    output(grid.count((value, y, x) => {
        if(value === "[") return y * 100 + x
        else return 0
    }))
}