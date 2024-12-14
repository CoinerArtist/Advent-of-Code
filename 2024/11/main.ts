import { input, log, output, CountRecord } from "utility";

// --- Part 1 ---

const startStones = input.split(" ")

function mulString(str: string, n=1){
    return (parseInt(str) * n).toString()
}

{
    let stones = startStones

    for(let i=0; i<25; i++){
        const newStones: string[] = []
        for(const stone of stones){
            if(stone === "0"){
                newStones.push("1")
            } else if(stone.length % 2 === 0){
                newStones.push(stone.substring(0, stone.length/2))
                newStones.push(mulString(stone.substring(stone.length/2)))
            } else {
                newStones.push(mulString(stone, 2024))
            } 
        }
        stones = newStones
    }

    output(stones.length)
}

// --- Part 2 ---

{
    let stones = new CountRecord()
    for(const stone of startStones) stones.set(stone, 1)

    for(let i=0; i<75; i++){
        const newStones = new CountRecord()
        for(const [stone, value] of stones.entries()){
            if(stone === "0"){
                newStones.increment("1", value)
            } else if(stone.length % 2 === 0){
                newStones.increment(stone.substring(0, stone.length/2), value)
                newStones.increment(mulString(stone.substring(stone.length/2)), value)
            } else {
                newStones.increment(mulString(stone, 2024), value)
            } 
        }
        stones = newStones
    }

    output(stones.count())
}