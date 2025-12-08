import { input, output, PriorityQueue } from "utility"

// --- Part 1 --- //

class Junction{
    x: number
    y: number
    z: number

    parent: Junction | null = null

    constructor(x: number, y: number, z: number){
        this.x = x
        this.y = y
        this.z = z
    }

    distance(j: Junction){
        return Math.sqrt( (this.x - j.x)*(this.x - j.x) + (this.y - j.y)*(this.y - j.y) + (this.z - j.z)*(this.z - j.z) )
    }

    getGroup(): Junction {
        if(this.parent === null){
            return this
        } else {
            const group = this.parent.getGroup()
            this.parent = group
            return group
        }
    }

    connect(j: Junction){
        this.getGroup().parent = j.getGroup()
    }
}

const junctions = input.split("\n").map(str => {
    const [x, y, z] = str.split(",").map(a => parseInt(a))
    return new Junction(x, y, z)
})

const queue = new PriorityQueue<[Junction, Junction]>()

for(let i=0; i<junctions.length; i++){
    for(let j=i+1; j<junctions.length; j++){
        const a = junctions[i]
        const b = junctions[j]
        queue.push(-a.distance(b), [a, b])
    }
}


let connections = 0
while(queue.size && connections < 1000){
    const [a, b] = queue.pop()

    if(a.getGroup() !== b.getGroup()){
        a.connect(b)
    }

    connections++
}

const map = new Map<Junction, number>()

for(const j of junctions){
    const group = j.getGroup()
    map.set(group, (map.get(group) || 0) + 1)
}

const sizes = map.values().toArray().sort((a, b) => b-a)

output(sizes[0] * sizes[1] * sizes[2])

// --- Part 2 --- //

let lastA: Junction
let lastB: Junction
while(queue.size){
    const [a, b] = queue.pop()

    if(a.getGroup() !== b.getGroup()){
        a.connect(b)
        lastA = a
        lastB = b
    }
}

output(lastA!.x * lastB!.x)