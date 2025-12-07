export class Grid<T>{
    grid: T[][]
    height: number
    width: number

    // --- //

    private constructor(height: number, width: number){
        this.height = height
        this.width = width
        this.grid = []
        for(let i=0; i<height; i++) this.grid.push([])
    }

    static fromValue<T>(height: number, width: number, value: T){
        const grid = new Grid<T>(height, width)

        for(let i=0; i<height; i++){
            for(let j=0; j<width; j++) grid.grid[i].push(value)
        }

        return grid
    }

    static fromFunction<T>(height: number, width: number, funct: (y: number, x: number) => T){
        const grid = new Grid<T>(height, width)

        for(let i=0; i<height; i++){
            for(let j=0; j<width; j++) grid.grid[i].push(funct(i, j))
        }

        return grid
    }


    static fromData(data: string[]): Grid<string>
    static fromData<T>(data: T[][]): Grid<T>
    static fromData<T>(data: T[][] | string[]){
        const grid = new Grid<T>(data.length, data[0].length)

        for(const [i, row] of data.entries()){
            for(const x of row) grid.grid[i].push(x as T)
        }

        return grid
    }

    static fromString<T>(str: string, funct: (value: string, y: number, x: number) => T){
        const data = str.split("\n")
        const grid = new Grid<T>(data.length, data[0].length)

        for(let i=0; i<grid.height; i++){
            for(let j=0; j<grid.width; j++) grid.grid[i].push(funct(data[i][j], i, j))
        }

        return grid
    }

    // --- //

    get(y: number, x: number): T | undefined
    get<V>(y: number, x: number, def: V): T | V
    get<V>(y: number, x: number, def: V = undefined as V){
        if(y < 0 || y >= this.height || x < 0 || x >= this.width) return def
        else return this.grid[y][x]
    }

    set(y: number, x: number, value: T){
        if(y < 0 || y >= this.height || x < 0 || x >= this.width) throw new Error(`Tried to set outside of grid. {y: ${y}, x: ${x}}`)
        this.grid[y][x] = value
    }

    isInside(y: number, x: number){
        return y >= 0 && y < this.height && x >= 0 && x < this.width
    }

    find(predicate: (value: T, y: number, x: number) => boolean): [T, number, number] | undefined
    find<V>(predicate: (value: T, y: number, x: number) => boolean, def: V): [T, number, number] | V
    find<V>(predicate: (value: T, y: number, x: number) => boolean, def: V = undefined as V){
        for(let y=0; y<this.height; y++){
            for(let x=0; x<this.width; x++){
                if(predicate(this.grid[y][x], y, x)) return [this.grid[y][x], y, x]
            }
        }
        return def
    }

    findAll(predicate: (value: T, y: number, x: number) => boolean){
        const found: [T, number, number][] = []
        for(let y=0; y<this.height; y++){
            for(let x=0; x<this.width; x++){
                if(predicate(this.grid[y][x], y, x)) found.push([this.grid[y][x], y, x])
            }
        }
        return found
    }

    *iterate(): Generator<[value: T, y: number, x: number]>{
        for(let y=0; y<this.height; y++){
            for(let x=0; x<this.width; x++){
                yield [this.grid[y][x], y, x]
            }
        }
    }

    count(counter: (value: T, y: number, x: number) => number, start=0){
        let count = start
        for(const [value, y, x] of this.iterate()){
            count += counter(value, y, x)
        }
        return count
    }

    toString(formatter: (value: T, y: number, x: number) => string){
        let str = ""
        for(let y=0; y<this.height; y++){
            for(let x=0; x<this.width; x++){
                str += formatter(this.grid[y][x], y, x)
            }
            str += "\n"
        }
        return str
    }
}