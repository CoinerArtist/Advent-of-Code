export class ObjectSet<T>{
    set: Set<string>
    stringify: (x:T) => string

    constructor()
    constructor(iterable: Iterable<T>, stringify?: (x:T) => string)
    constructor(value: readonly T[], stringify?: (x:T) => string)
    constructor(arg: Iterable<T> | readonly T[] = [], stringify: (x:T) => string = JSON.stringify){
        this.set = new Set()
        this.stringify = stringify
        for(const v of arg){
            this.add(v)
        }
    }

    get size(){ return this.set.size }

    add(value: T){
        this.set.add(this.stringify(value))
    }

    has(value: T){
        return this.set.has(this.stringify(value))
    }

    clear(){
        this.set.clear()
    }

    delete(value: T){
        this.set.delete(this.stringify(value))
    }
}