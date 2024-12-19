export function cache<T, U extends any[]>(funct: (...args: U) => T){
    const c: Map<string, T> = new Map()

    return function(...args: Parameters<typeof funct>){
        const k = JSON.stringify(args)
        if(!c.has(k)) c.set(k, funct(...args))
        return c.get(k)!
    }
}