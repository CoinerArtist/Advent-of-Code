import { input, output } from "utility"

// --- Part 1 --- //

const [startValuesRaw, gatesRaw] = input.split("\n\n")

const startValues = startValuesRaw.matchAll(/([\w\d]+): (\d)/g).map(([_, k, v]) => [k, v === "1" ? true : false] as [string, boolean])

type Gate = {
    in1: Wire
    in2: Wire
    out: Wire
    logic: string
    correct: boolean
}

type Wire = {
    value: boolean | null
    subscribed: Set<Gate>
    source: Gate| null,
    name: string
}

const gates: Gate[] = []
const wires: Record<string, Wire> = {}

function createWire(wire: string){
    if(wires[wire] === undefined){
        wires[wire] = {
            value: null,
            subscribed: new Set(),
            source: null,
            name: wire
        }
    }
}

for(const [_, in1, logic, in2, out] of gatesRaw.matchAll(/([\w\d]+) ([A-Z]+) ([\w\d]+) -> ([\w\d]+)/g)){
    createWire(in1)
    createWire(in2)
    createWire(out)

    const gate = {
        in1: wires[in1],
        in2: wires[in2],
        out: wires[out],
        logic: logic,
        correct: false
    }

    gate.in1.subscribed.add(gate)
    gate.in2.subscribed.add(gate)
    gate.out.source = gate

    gates.push(gate)
}

function runGate(gate: Gate){
    if(gate.in1.value !== null && gate.in2.value !== null){
        if(gate.logic === "AND") gate.out.value = gate.in1.value && gate.in2.value
        else if(gate.logic === "OR") gate.out.value = gate.in1.value || gate.in2.value
        else gate.out.value = gate.in1.value !== gate.in2.value

        for(const otherGate of gate.out.subscribed){
            runGate(otherGate)
        }
    }
}

for(const [wire, value] of startValues){
    wires[wire].value = value
    for(const gate of wires[wire].subscribed){
        runGate(gate)
    }
}

const zWires = Object.entries(wires).filter(([k]) => /z\d\d/.test(k)).sort(([k0], [k1]) => k1.localeCompare(k0))
output(zWires.reduce((acc, [_, v]) => acc*2 + (v.value ? 1 : 0), 0))

// --- Part 2 --- //

const xWires = Object.entries(wires).filter(([k]) => /x\d\d/.test(k)).sort(([k0], [k1]) => k0.localeCompare(k1)).map(([_, w]) => w)

const incorrect: Set<string> = new Set()

function connectToOut(wire: Wire){
    return wire.subscribed.size === 0
}
function connectToOR(wire: Wire){
    return wire.subscribed.size === 1
}
function connectToANDXOR(wire: Wire){
    return wire.subscribed.size === 2
}

function getXOR(wire: Wire){
    const subscribed = [...wire.subscribed]
    if(subscribed[0].logic === "XOR") return subscribed[0]
    else return subscribed[1]
}

// This finds most of the wrong wires
for(const wire of Object.values(wires)){
    if(connectToANDXOR(wire)){
        if(wire.source !== null && wire.source.logic === "AND" && getXOR(wire).out.name !== "z01"){
            incorrect.add(wire.name)
        }
    } else if(connectToOR(wire)){
        if(wire.source === null || wire.source.logic !== "AND"){
            incorrect.add(wire.name)
        }
    } else if(connectToOut(wire)){
        if(wire.source!.logic !== "XOR" && wire.name !== `z${zWires.length-1}`){
            incorrect.add(wire.name)
        }
    } else {
        console.error("Impossible.")
    }
}

// This finds wrong wires in the XORs of the adders.
for(let i=0; i<xWires.length; i++){
    const firstXor = getXOR(xWires[i])

    if(i===0 && firstXor.out.name === "z00") continue

    if(!connectToANDXOR(firstXor.out)){
        incorrect.add(firstXor.out.name)
    } else {
        const secondXor = getXOR(firstXor.out)
    
        const out = `z${i.toString().padStart(2, "0")}`
        if(secondXor.out.name !== out){
            incorrect.add(secondXor.out.name)
            incorrect.add(out)
        }
    }
}

// This may not work on some inputs.

output([...incorrect].sort().join(","))