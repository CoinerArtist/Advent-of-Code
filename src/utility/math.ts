export function clamp(lower: number, higher: number, value: number){
    return Math.max(lower, Math.min(higher, value))
}

export function mod(a: number, b: number){
    return (a%b + b) % b
}

export function count<T>(iterator: Iterable<T>, counter: (value: T) => number){
    let sum = 0
    for(const value of iterator){
        sum += counter(value)
    }
    return sum
}

export function numOfDigits(n: number){
    return Math.floor(Math.log10(n)) + 1
}

export function factorial(n: number){
    let mul = n
    for(let i=n-1; i>1; i--){
        mul *= i
    }
    return mul
}