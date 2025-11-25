import { directionsCardinal, input, log, ObjectSet, output } from "utility"

// --- Part 1 --- //

const layoutNumber = parseInt(input)
function isWall(x: number, y: number){
    const n = x*x + 3*x + 2*x*y + y + y*y + layoutNumber

    let sum = 0;
    for(let i=1; i<=n; i*=2){
        sum += (n & i) ? 1 : 0;
    }

    return (sum % 2) === 1
}

let str = ""
for(let y=0; y<=51; y++){
    for(let x=0; x<=51; x++){
        str += isWall(x, y) ? "#" : " "
    }   
    str += "\n"
}
log(str)

const target = [31, 39]
let found = false

const seen = new ObjectSet<[number, number]>([[1, 1]])
const toExplore = [[1, 1, 0]]

let count = 0

while(toExplore.length){
    const [x, y, dist] = toExplore.shift()!

    if(x === target[0] && y === target[1]){
        found = true
        output(dist)
    }

    if(dist <= 50){
        count++
    } else if(found){
        break
    }

    for(const [dx, dy] of directionsCardinal){
        if(!seen.has([x+dx, y+dy])){
            seen.add([x+dx, y+dy])
            if(x+dx >= 0 && y+dy >= 0 && !isWall(x+dx, y+dy)){ 
                toExplore.push([x+dx, y+dy, dist+1])
            }
        }
    }
}

// --- Part 2 --- //

output(count)








