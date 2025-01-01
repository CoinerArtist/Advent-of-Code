import { input, output } from "utility"

// --- Part 1 --- //

const bots: Record<string, number[]> = {}
const rules: Record<string, [string, string]> = {}

function createBot(k: string){
    if(bots[k] === undefined){
        bots[k] = []
    }
}

for(const [_, value, k] of input.matchAll(/value (\d+) goes to (\w+ \d+)/g)){
    createBot(k)
    bots[k].push(parseInt(value))
}

for(const [_, bot, low, high] of input.matchAll(/(\w+ \d+) gives low to (\w+ \d+) and high to (\w+ \d+)/g)){
    createBot(bot)
    createBot(low)
    createBot(high)
    rules[bot] = [low, high]
}

function runBot(bot: string){
    const holding = bots[bot]
    if(holding.length === 2){
        const [low, high] = rules[bot]
        holding.sort((a, b) => a - b)

        if(holding[0] === 17 && holding[1] === 61){
            output(parseInt(bot.match(/\d+/)![0]))
        }
        
        bots[high].push(holding.pop()!)
        bots[low].push(holding.pop()!)
        
        runBot(low)
        runBot(high)
    }
}

runBot(Object.keys(bots).find(k => bots[k].length === 2)!)

// --- Part 2 --- //

output(bots["output 0"][0] * bots["output 1"][0] * bots["output 2"][0])