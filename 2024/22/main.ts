import { count, input, mod, output } from "utility"

// --- Part 1 --- //

const secrets = input.split("\n").map(x => parseInt(x))

function iter(secret: number){
    let a = secret * 64
    secret = secret ^ a
    secret = mod(secret, 16777216)

    let b = Math.floor(secret / 32)
    secret = secret ^ b
    secret = mod(secret, 16777216)

    let c = secret * 2048
    secret = secret ^ c
    secret = mod(secret, 16777216)

    return secret
}

function iterNtimes(secret: number, n: number){
    for(let i=0; i<n; i++){
        secret = iter(secret)
    }
    return secret
}

output(count(secrets, x => iterNtimes(x, 2000)))

// --- Part 2 --- //

const sequences: Record<string, Record<number, number>> = {}

function iterMonkey(secret: number, id: number){
    const priceChange: number[] = []
    for(let i=0; i<2000; i++){
        const nextSecret = iter(secret)
        priceChange.push((nextSecret % 10) - (secret % 10))

        if(priceChange.length === 4){
            const k = priceChange.join(",")

            if(sequences[k] === undefined) sequences[k] = {}
            if(sequences[k][id] === undefined) sequences[k][id] = (nextSecret % 10)

            priceChange.shift()
        }

        secret = nextSecret
    }
}

for(let i=0; i<secrets.length; i++){
    iterMonkey(secrets[i], i)
}

let maxBananas = 0
for(const sequence of Object.values(sequences)){
    maxBananas = Math.max(maxBananas, count(Object.values(sequence), x => x))
}

output(maxBananas)