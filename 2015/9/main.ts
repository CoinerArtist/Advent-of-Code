import { input, log, output } from "utility"

// --- Part 1 ---

type Node = {
    distance: Record<string, number>
    visited: boolean
}

const graph: Record<string, Node> = {}

function createNode(node: string){
    if(graph[node] === undefined){
        graph[node] = {distance: {}, visited: false}
    }
}

for(const [_, a, b, distance] of input.matchAll(/(\w+) to (\w+) = (\d+)/g)){
    createNode(a)
    createNode(b)

    const dist = parseInt(distance)
    graph[a].distance[b] = dist
    graph[b].distance[a] = dist
}

log(graph)

function getShorthestPath(start: string){
    const startNode = graph[start]
    startNode.visited = true

    let minDist = Infinity
    for(const [neighbour, distance] of Object.entries(startNode.distance)){
        if(!graph[neighbour].visited){
            const dist = getShorthestPath(neighbour) + distance
            if(dist < minDist) minDist = dist
        }
    }

    if(minDist === Infinity && Object.values(graph).every(node => node.visited)){
        startNode.visited = false
        return 0
    }

    startNode.visited = false
    return minDist
}

let minDist = Infinity
for(const start of Object.keys(graph)){
    const dist = getShorthestPath(start)
    if(dist < minDist) minDist = dist
}

output(minDist)

// --- Part 2 ---

function getLongestPath(start: string){
    const startNode = graph[start]
    startNode.visited = true

    let maxDist = -Infinity
    for(const [neighbour, distance] of Object.entries(startNode.distance)){
        if(!graph[neighbour].visited){
            const dist = getLongestPath(neighbour) + distance
            if(dist > maxDist) maxDist = dist
        }
    }

    if(maxDist === -Infinity && Object.keys(graph).every(k => graph[k].visited)){
        startNode.visited = false
        return 0
    }

    startNode.visited = false
    return maxDist
}

let maxDist = 0
for(const start of Object.keys(graph)){
    const dist = getLongestPath(start)
    if(dist > maxDist) maxDist = dist
}

output(maxDist)