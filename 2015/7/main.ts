import { input, log, output } from "utility"

// --- Part 1 ---

const instructions = input.matchAll(/([a-z0-9]*) ?([A-Z]*) ?([a-z0-9]*) -> ([a-z]+)/g).toArray()
                          .map(([_, in1, instr, in2, out]) => {return {in1, in2, instr, out}})

type Wire = {
    value: null | number
    subscribed: Gate[]
    label: string
}

const wires: Record<string, Wire> = {}
const constantWires: Wire[] = []

function createWire(label: string){
    if(wires[label] === undefined){
        const isConstant = Number.isInteger(parseInt(label))

        wires[label] = {
            subscribed: [],
            value: isConstant ? parseInt(label) : null,
            label
        }

        if(isConstant) constantWires.push(wires[label])
    }
}

type Gate = {
    instr: string
    in1?: Wire
    in2?: Wire
    out: Wire
}

const toRun: Gate[] = []

function runGate({instr, in1, in2, out}: Gate){
    if(out.value !== null) return

    switch(instr){
        case "": {
            if(in1!.value !== null) out.value = in1!.value
        } break
        case "NOT": {
            if(in2!.value !== null) out.value = (~in2!.value) & 65535
        } break
        case "AND": {
            if(in1!.value !== null && in2!.value !== null) out.value = in1!.value & in2!.value
        } break
        case "OR": {
            if(in1!.value !== null && in2!.value !== null) out.value = in1!.value | in2!.value
        } break
        case "RSHIFT": {
            if(in1!.value !== null && in2!.value !== null) out.value = in1!.value >> in2!.value
        } break
        case "LSHIFT": {
            if(in1!.value !== null && in2!.value !== null) out.value = (in1!.value << in2!.value) & 65535
        } break
    }

    if(out.value !== null){
        toRun.push(...out.subscribed)
    }
}

for(const {in1, in2, instr, out} of instructions){
    createWire(out)

    const gate: Gate = {
        instr,
        out: wires[out]
    }

    if(in1){
        createWire(in1)
        gate.in1 = wires[in1]
        wires[in1].subscribed.push(gate)
    }
    if(in2){
        createWire(in2)
        gate.in2 = wires[in2]
        wires[in2].subscribed.push(gate)
    }
}

for(const wire of constantWires){
    toRun.push(...wire.subscribed)
}

while(toRun.length){
    runGate(toRun.shift()!)
}

for(const k of Object.keys(wires)) log(`${k}: ${wires[k].value}`, "values1")
output(wires["a"].value)

// --- Part 2 ---

const a = wires["a"].value

for(const k of Object.keys(wires)){
    if(!Number.isInteger(parseInt(k))) wires[k].value = null
}

wires["b"].value = a

for(const wire of constantWires){
    toRun.push(...wire.subscribed)
}
toRun.push(...wires["b"].subscribed)

while(toRun.length){
    runGate(toRun.shift()!)
}

for(const k of Object.keys(wires)) log(`${k}: ${wires[k].value}`, "values2")
output(wires["a"].value)