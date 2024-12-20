export class CountRecord{
    record: Record<string, number>
    defaultValue: number

    constructor(startValues: Record<string, number> = {}, defaultValue=0){
        this.record = startValues
        this.defaultValue = defaultValue
    }

    get(k: string){
        if(this.record[k] === undefined) return this.defaultValue
        else return this.record[k]
    }

    set(k: string, value: number){
        this.record[k] = value
    }

    increment(k: string, value=1){
        if(this.record[k] === undefined) this.record[k] = this.defaultValue + value
        else this.record[k] += value
    }

    keys(){ return Object.keys(this.record) }
    values(){ return Object.values(this.record) }
    entries(){ return Object.entries(this.record) }

    count(){ 
        return Object.values(this.record).reduce((acc, x) => acc + x) 
    }

    clear(){
        this.record = {}
    }
}