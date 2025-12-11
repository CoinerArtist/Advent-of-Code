import { cacheByRef, input, output } from "utility"

// --- Part 1 --- //

const inp = input.split("\n").map(x => x.split(" "))

type Device = Device[]
const devices: Record<string, Device> = {}

function getDevice(name: string){
    if(devices[name] === undefined) devices[name] = []
    return devices[name]
}

for(const links of inp){
    const input = getDevice(links[0].slice(0, -1))
    for(let i=1; i<links.length; i++){
        input.push(getDevice(links[i]))
    }
}

const out = devices["out"]
const you = devices["you"]

{
    const getPaths = cacheByRef((start: Device) => {
        if(start === out) return 1
    
        let sum = 0;
        for(const d of start){
            sum += getPaths(d)
        }
        return sum
    })
    
    output(getPaths(you))
}

// --- Part 2 --- //

const svr = devices["svr"]
const dac = devices["dac"]
const fft = devices["fft"]

{
    const getPaths = cacheByRef((start: Device): [number, number] => {
        if(start === out) return [0, 1]

        let level = 0
        let sum = 0
        for(const d of start){
            let [lvl, paths] = getPaths(d)
            if(lvl === level){
                sum += paths
            } else if(lvl > level){
                level = lvl
                sum = paths
            }
        }

        if(start === dac || start === fft){
            level++
        }

        return [level, sum]
    })

    output(getPaths(svr)[1])
}