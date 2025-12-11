export function cache<T, U extends any[]>(funct: (...args: U) => T, stringify = (...x: Parameters<typeof funct>) => JSON.stringify(x)){
    const c: Map<string, T> = new Map()

    return function(...args: Parameters<typeof funct>){
        const k = stringify(...args)
        if(!c.has(k)) c.set(k, funct(...args))
        return c.get(k)!
    }
}

export function cacheByRef<T, U extends Object>(funct: (arg: U) => T){
    const c: WeakMap<U, T> = new WeakMap()

    return function(arg: U){
        if(!c.has(arg)) c.set(arg, funct(arg))
        return c.get(arg)!
    }
}