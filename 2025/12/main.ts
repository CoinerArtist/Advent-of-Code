import { floorTo, input, output } from "utility"

// --- Part 1 --- //

const inp = input.split("\n\n")

class Shape{
    str: string
    size = 0

    constructor(str: string){
        this.str = str
        for(let i=0; i<str.length; i++) this.size += str[i] === "#" ? 1 : 0
    }

    isFilled(x: number, y: number){
        return this.str[x + y*3] === "#"
    }
}

const shapes: Shape[] = []

for(let i=0; i<inp.length-1; i++){
    shapes.push(new Shape(inp[i].split("\n").slice(1).join("")))
}

class Region{
    width: number
    height: number
    shapes: number[]

    constructor(a: number, b: number, shapes: number[]){
        this.width = Math.max(a, b)
        this.height = Math.min(a, b)
        this.shapes = shapes
    }
}

let regions: Region[] = []

for(const r of inp.at(-1)!.split("\n")){
    const [_, a, b, shapes] = r.match(/(\d+)x(\d+): ([0-9 ]+)/)!;
    regions.push(new Region(parseInt(a), parseInt(b), shapes.split(" ").map(x => parseInt(x))))
}
console.log("Region listed :", regions.length)

regions = regions.filter(r => r.width * r.height >= r.shapes.reduce((acc, x, i) => acc + x*shapes[i].size, 0))
console.log("After removing trivially impossible :", regions.length)

let count = regions.filter(r => floorTo(r.width, 3)*floorTo(r.height, 3) >= r.shapes.reduce((acc, x) => acc + x)*9).length
regions = regions.filter(r => floorTo(r.width, 3)*floorTo(r.height, 3) < r.shapes.reduce((acc, x) => acc + x)*9)
console.log("After counting trivially possible :", regions.length)

if(regions.length !== 0){
    console.log("You have unlocked hard mode.")
} else {
    output(count)
}