import { input, log, output } from "utility"

// --- Part 1 ---

type Node = {
    distance: Record<string, number>
    visited: boolean
}

const graph: Record<string, Node> = {}

for(const [_, target, sign, value, source] of input.matchAll(/(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)/g)){
    if(graph[target] === undefined) graph[target] = {distance: {}, visited: false}
    graph[target].distance[source] = parseInt(value) * (sign === "gain" ? 1 : -1 )
}

function getLongestPath(start: string, first: string){
    const startNode = graph[start]
    startNode.visited = true

    let maxDist = -Infinity
    for(const neighbour of Object.keys(graph[start].distance)){
        if(!graph[neighbour].visited){
            const dist = getLongestPath(neighbour, first) + graph[start].distance[neighbour] + graph[neighbour].distance[start]
            if(dist > maxDist) maxDist = dist
        }
    }

    if(maxDist === -Infinity && Object.keys(graph).every(k => graph[k].visited)){
        startNode.visited = false
        return graph[start].distance[first] + graph[first].distance[start]
    }

    startNode.visited = false
    return maxDist
}

const start = Object.keys(graph)[0]
output(getLongestPath(start, start))

// --- Part 2 ---

graph["You"] = {distance: {}, visited: false}
for(const k of Object.keys(graph)){
    if(k !== "You"){
        graph["You"].distance[k] = 0
        graph[k].distance["You"] = 0
    }
}

log(graph)

output(getLongestPath(start, start))