import { Grid, input, log, output, directions } from "utility"

// --- Part 1 ---

type Light = [number, number]

{
    const lights = Grid.fromData<Light>(input.split("\n").map(line => line.split("").map(light => light === "#" ? [0, 1] : [0, 0])))
    
    for(let i=0; i<100; i++){
        const state = i%2
        const lastState = (i+1)%2
        for(const [light, y, x] of lights.iterate()){
            let neighbors = 0
            for(const [dy, dx] of directions){
                neighbors += lights.get(y+dy, x+dx, [0, 0] as Light)[lastState]
            }
    
            light[state] = neighbors === 3 || (light[lastState] === 1 && neighbors === 2) ? 1 : 0
        }
    
        // log(lights.toString(x => x[state] === 1 ? "#" : "."))
    }

    output(lights.count(x => x[1]))
}

// --- Part 2 ---

{
    const lights = Grid.fromData<Light>(input.split("\n").map(line => line.split("").map(light => light === "#" ? [0, 1] : [0, 0])))
    
    lights.set(0, 0, [1, 1])
    lights.set(lights.height-1, 0, [1, 1])
    lights.set(0, lights.width-1, [1, 1])
    lights.set(lights.height-1, lights.width-1, [1, 1])

    for(let i=0; i<100; i++){
        const state = i%2
        const lastState = (i+1)%2
        for(const [light, y, x] of lights.iterate()){
            let neighbors = 0
            for(const [dy, dx] of directions){
                neighbors += lights.get(y+dy, x+dx, [0, 0] as Light)[lastState]
            }
    
            light[state] = neighbors === 3 || (light[lastState] === 1 && neighbors === 2) ? 1 : 0
        }

        lights.set(0, 0, [1, 1])
        lights.set(lights.height-1, 0, [1, 1])
        lights.set(0, lights.width-1, [1, 1])
        lights.set(lights.height-1, lights.width-1, [1, 1])
    
        log(lights.toString(x => x[state] === 1 ? "#" : "."))
    }
    
    output(lights.count(x => x[1]))
}