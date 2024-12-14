export function clamp(lower: number, higher: number, value: number){
    return Math.max(lower, Math.min(higher, value))
}

export function mod(a: number, b: number){
    return (a%b + b) % b
}