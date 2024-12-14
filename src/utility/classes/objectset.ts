export class ObjectSet<T>{
    set: Set<string>

    constructor(iterable?: Iterable<T> | null)
    constructor(value: readonly T[] | null)
    constructor(arg: Iterable<T> | readonly T[] | null | undefined){
        this.set = new Set()
        if(arg){
            for(const v of arg){
                this.add(v)
            }
        }
    }

    get size(){ return this.set.size }

    add(value: T){
        this.set.add(JSON.stringify(value))
    }

    has(value: T){
        return this.set.has(JSON.stringify(value))
    }

    clear(){
        this.set.clear()
    }

    delete(value: T){
        this.set.delete(JSON.stringify(value))
    }
}