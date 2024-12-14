import { input, output } from "utility"

// --- Part 1 ---

const [bossFullHealth, bossAttack] = input.matchAll(/\d+/g).map(x => parseInt(x[0]))

{
    let min = Infinity
    function simulate(health = 50, mana = 500, manaCost = 0, bossHealth = bossFullHealth, effects: [number, number, number] = [0, 0, 0]){
        for(let i=0; i<5; i++){
            let newHealth = health
            let newMana = mana
            let newManaCost = manaCost
            let newBossHealth = bossHealth
            let newEffects: [number, number, number] = [...effects]

            // Player Turn

            switch(i){
                case 0: {
                    newBossHealth -= 4
                    newMana -= 53
                    newManaCost += 53
                } break
                case 1: {
                    newBossHealth -= 2
                    newHealth += 2
                    newMana -= 73
                    newManaCost += 73
                } break
                case 2: {
                    if(newEffects[0] > 0) continue
                    newEffects[0] = 6
                    newMana -= 113
                    newManaCost += 113
                } break
                case 3: {
                    if(newEffects[1] > 0) continue
                    newEffects[1] = 6
                    newMana -= 173
                    newManaCost += 173
                } break
                case 4: {
                    if(newEffects[2] > 0) continue
                    newEffects[2] = 5
                    newMana -= 229
                    newManaCost += 229
                } break
            }
            if(newManaCost >= min) continue
            if(newMana < 0) continue

            // Boss Turn

            const shield = newEffects[0] > 0 ? 7 : 0
            if(newEffects[1] > 0) newBossHealth -= 3
            if(newEffects[2] > 0) newMana += 101

            if(newBossHealth <= 0){
                if(newManaCost < min) min = newManaCost
                continue
            }

            newEffects[0]--
            newEffects[1]--
            newEffects[2]--

            newHealth -= Math.max(1, bossAttack - shield)
            if(newHealth <= 0) continue

            if(newEffects[1] > 0) newBossHealth -= 3
            if(newEffects[2] > 0) newMana += 101

            newEffects[0]--
            newEffects[1]--
            newEffects[2]--

            if(newBossHealth <= 0){
                if(newManaCost < min) min = newManaCost
                continue
            }

            simulate(newHealth, newMana, newManaCost, newBossHealth, newEffects)
        }
    }

    simulate()
    output(min)
}

// --- Part 2 ---

{
    let min = Infinity
    function simulate(health = 50, mana = 500, manaCost = 0, bossHealth = bossFullHealth, effects: [number, number, number] = [0, 0, 0]){
        if(health <= 1) return
        for(let i=0; i<5; i++){
            let newHealth = health - 1 
            let newMana = mana
            let newManaCost = manaCost
            let newBossHealth = bossHealth
            let newEffects: [number, number, number] = [...effects]

            // Player Turn

            switch(i){
                case 0: {
                    newBossHealth -= 4
                    newMana -= 53
                    newManaCost += 53
                } break
                case 1: {
                    newBossHealth -= 2
                    newHealth += 2
                    newMana -= 73
                    newManaCost += 73
                } break
                case 2: {
                    if(newEffects[0] > 0) continue
                    newEffects[0] = 6
                    newMana -= 113
                    newManaCost += 113
                } break
                case 3: {
                    if(newEffects[1] > 0) continue
                    newEffects[1] = 6
                    newMana -= 173
                    newManaCost += 173
                } break
                case 4: {
                    if(newEffects[2] > 0) continue
                    newEffects[2] = 5
                    newMana -= 229
                    newManaCost += 229
                } break
            }
            if(newManaCost >= min) continue
            if(newMana < 0) continue

            // Boss Turn

            const shield = newEffects[0] > 0 ? 7 : 0
            if(newEffects[1] > 0) newBossHealth -= 3
            if(newEffects[2] > 0) newMana += 101

            if(newBossHealth <= 0){
                if(newManaCost < min) min = newManaCost
                continue
            }

            newEffects[0]--
            newEffects[1]--
            newEffects[2]--

            newHealth -= Math.max(1, bossAttack - shield)
            if(newHealth <= 0) continue

            if(newEffects[1] > 0) newBossHealth -= 3
            if(newEffects[2] > 0) newMana += 101

            newEffects[0]--
            newEffects[1]--
            newEffects[2]--

            if(newBossHealth <= 0){
                if(newManaCost < min) min = newManaCost
                continue
            }

            simulate(newHealth, newMana, newManaCost, newBossHealth, newEffects)
        }
    }

    simulate()
    output(min)
}