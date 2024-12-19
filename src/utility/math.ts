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