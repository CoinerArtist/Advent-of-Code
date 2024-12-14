import { Grid, input, log, output } from "utility";

// --- Part 1 ---

type Antenna = {
    freq: string
    isAntinode: boolean
}

function add(a: [number, number], b: [number, number]): [number, number]{
    return [a[0]+b[0], a[1]+b[1]]
}
function sub(a: [number, number], b: [number, number]): [number, number]{
    return [a[0]-b[0], a[1]-b[1]]
}

const antennas: Record<string, [number, number][]> = {}

const grid = Grid.fromString<Antenna>(input, (value, y, x) => {
    if(value !== "."){
        if(antennas[value] === undefined) antennas[value] = []
        antennas[value].push([y, x])
    }
    return { freq: value, isAntinode: false }
})

for(const k of Object.keys(antennas)){
    const positions = antennas[k]
    for(let i=0; i<positions.length; i++){
        for(let j=i+1; j<positions.length; j++){
            const antinodeA = grid.get(...add(sub(positions[i], positions[j]), positions[i]))
            const antinodeB = grid.get(...add(sub(positions[j], positions[i]), positions[j]))
            if(antinodeA) antinodeA.isAntinode = true
            if(antinodeB) antinodeB.isAntinode = true
        }
    }
}

output(grid.count(({isAntinode}) => isAntinode ? 1 : 0))

// --- Part 2 ---

for(const k of Object.keys(antennas)){
    const positions = antennas[k]
    for(let i=0; i<positions.length; i++){
        for(let j=i+1; j<positions.length; j++){
            {
                const dir = sub(positions[i], positions[j])
                let pos = positions[i]
                while(grid.isInside(...pos)){
                    grid.get(...pos)!.isAntinode = true
                    pos = add(dir, pos)
                }
            }
            {
                const dir = sub(positions[j], positions[i])
                let pos = positions[j]
                while(grid.isInside(...pos)){
                    grid.get(...pos)!.isAntinode = true
                    pos = add(dir, pos)
                }
            }
        }
    }
}

output(grid.count(({isAntinode}) => isAntinode ? 1 : 0))