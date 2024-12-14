import { input, log, output } from "utility"

// --- Part 1 ---

type Deer = {
    distance: number
    speed: number
    maxFly: number
    maxRest: number
    timer: number
    isFlying: boolean 
    score: number
}

const deers: Deer[]  = []

for(const [_, _deer, speed, maxFly, maxRest] of input.matchAll(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+)/g)){
    deers.push({
        speed: parseInt(speed),
        maxFly: parseInt(maxFly), 
        maxRest: parseInt(maxRest),
        distance: 0,
        timer: parseInt(maxFly),
        isFlying: true,
        score: 0
    })
}

for(let i=0; i<2503; i++){
    for(const deer of deers){
        if(deer.timer === 0){
            deer.isFlying = !deer.isFlying
            deer.timer = deer.isFlying ? deer.maxFly : deer.maxRest
        }

        if(deer.isFlying){
            deer.distance += deer.speed
        } 

        deer.timer--
    }

    let maxDist = -Infinity
    let maxDeers: Deer[] = []
    for(const deer of deers){
        if(deer.distance > maxDist){
            maxDist = deer.distance
            maxDeers = [deer]
        } else if(deer.distance === maxDist){
            maxDeers.push(deer)
        }
    }

    for(const deer of maxDeers) deer.score++
}

log(deers)

output(Math.max(...deers.map(x => x.distance)))

// --- Part 2 ---

output(Math.max(...deers.map(x => x.score)))