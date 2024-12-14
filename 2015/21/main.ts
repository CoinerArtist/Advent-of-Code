import { input, output } from "utility"

// --- Part 1 ---

function format(str: string){
    return str.matchAll(/[^+](\d+)\s+(\d+)\s+(\d+)/g)
           .map(([_, gold, damage, armor]) => {return {gold: parseInt(gold), damage: parseInt(damage), armor: parseInt(armor)}})
}

const weopons = format(`
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0
`.trim()).toArray()

const armor = format(`
Nothing       0     0       0
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5
`.trim()).toArray()

const rings = format(`
Nothing       0     0       0
Nothing       0     0       0
Damage +1    25     1       0
Damage +2    50     2       0
Damage +3   100     3       0
Defense +1   20     0       1
Defense +2   40     0       2
Defense +3   80     0       3
`.trim()).toArray()

const [bossFullHealth, bossAttack, bossDefense] = input.matchAll(/\d+/g).map(x => parseInt(x[0]))

function simulate(attack: number, defense: number){
    let health = 100
    let bossHealth = bossFullHealth

    const attackToBoss = Math.max(1, attack - bossDefense)
    const attackToPlayer = Math.max(1, bossAttack - defense)

    while(true){
        bossHealth -= attackToBoss
        if(bossHealth <= 0) return true
        health -= attackToPlayer
        if(health <= 0) return false
    }
}

let min = Infinity
for(const wea of weopons){
    for(const arm of armor){
        for(let i=0; i<rings.length-1; i++){
            for(let j=i; j<rings.length; j++){
                const gold = wea.gold + arm.gold + rings[i].gold + rings[j].gold
                if(gold < min && simulate(wea.damage + arm.damage + rings[i].damage + rings[j].damage, wea.armor + arm.armor + rings[i].armor + rings[j].armor)){
                    min = gold
                }
            }
        }
    }
}

output(min)

// --- Part 2 ---

let max = 0
for(const wea of weopons){
    for(const arm of armor){
        for(let i=0; i<rings.length-1; i++){
            for(let j=i; j<rings.length; j++){
                const gold = wea.gold + arm.gold + rings[i].gold + rings[j].gold
                if(gold > max && !simulate(wea.damage + arm.damage + rings[i].damage + rings[j].damage, wea.armor + arm.armor + rings[i].armor + rings[j].armor)){
                    max = gold
                }
            }
        }
    }
}

output(max)