export class ObjectMap<K, V>{
    map: Map<string, V>
    stringify: (x:K) => string

    constructor()
    constructor(iterable: Iterable<[K,V]>, stringify?: (x:K) => string)
    constructor(value: readonly [K,V][], stringify?: (x:K) => string)
    constructor(arg: Iterable<[K,V]> | readonly [K,V][] = [], stringify: (x:K) => string = JSON.stringify){
        this.map = new Map()
        this.stringify = stringify
        for(const [k,v] of arg){
            this.set(k,v)
        }
    }

    get size(){ return this.map.size }

    set(key: K, value: V){
        this.map.set(this.stringify(key), value)
    }

    has(key: K){
        return this.map.has(this.stringify(key))
    }
    get(key: K){
        return this.map.get(this.stringify(key))!
    }

    clear(){
        this.map.clear()
    }

    delete(key: K){
        this.map.delete(this.stringify(key))
    }
}