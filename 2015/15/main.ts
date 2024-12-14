import { input, log, output } from "utility"

// --- Part 1 ---

const ingredients = input.matchAll(/\w+: capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/g)
                    .map(([_, capacity, durability, flavor, texture, calories]) => {return {
                        capacity: parseInt(capacity), durability: parseInt(durability), 
                        flavor: parseInt(flavor), texture: parseInt(texture), calories: parseInt(calories)}
                    }).toArray()

log(ingredients)

let maxScore1 = 0
let maxScore2 = 0

for(let i=0; i<=100; i++){
    for(let j=0; j<=100-i; j++){
        for(let k=0; k<=100-i-j; k++){
            const l=100-i-j-k
            const capacity   = Math.max(0, ingredients[0].capacity*i   + ingredients[1].capacity*j   + ingredients[2].capacity*k   + ingredients[3].capacity*l  )
            const durability = Math.max(0, ingredients[0].durability*i + ingredients[1].durability*j + ingredients[2].durability*k + ingredients[3].durability*l)
            const flavor     = Math.max(0, ingredients[0].flavor*i     + ingredients[1].flavor*j     + ingredients[2].flavor*k     + ingredients[3].flavor*l    )
            const texture    = Math.max(0, ingredients[0].texture*i    + ingredients[1].texture*j    + ingredients[2].texture*k    + ingredients[3].texture*l   )
            const calories   = Math.max(0, ingredients[0].calories*i   + ingredients[1].calories*j   + ingredients[2].calories*k   + ingredients[3].calories*l  )
            const score = capacity * durability * flavor * texture
            if(score>maxScore1) maxScore1 = score
            if(calories === 500 && score>maxScore2) maxScore2 = score
        }
    }
}

output(maxScore1)

// --- Part 2 ---

output(maxScore2)