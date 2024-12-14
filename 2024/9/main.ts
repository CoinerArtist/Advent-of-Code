import { input, log, output } from "utility";

// --- Part 1 ---

const fileBlocks: number[] = []
const files: {id: number, space: number}[] = []

for(let i=0; i<input.length; i++){
    const space = parseInt(input[i])
    const id = i%2 === 1 ? -1 : i/2

    if(space !== 0){
        files.push({id, space})
    }

    for(let j=0; j<space; j++) fileBlocks.push(id)
}

{
    let i = 0
    let j = fileBlocks.length - 1
    while(i < j){
        if(fileBlocks[i] !== -1) i++
        else if(fileBlocks[j] === -1) j--
        else {
            fileBlocks[i] = fileBlocks[j]
            fileBlocks[j] = -1
            i++
            j--
        }
    }

    let checksum = 0
    for(let i=0; i<fileBlocks.length; i++){
        if(fileBlocks[i] === -1) break
        checksum += i * fileBlocks[i] 
    }
    
    output(checksum)
}


// --- Part 2 ---

{
    let j = files.length - 1
    while(j > 0){
        const target = files[j]

        if(target.id !== -1){
            for(let i=0; i<j; i++){
                const empty = files[i]

                if(empty.id === -1){
                    if(empty.space === target.space){
                        empty.id = target.id
                        target.id = -1
                        break
                    } else if(empty.space > target.space){
                        files.splice(i, 0, {id: target.id, space: target.space})
                        empty.space -= target.space
                        target.id = -1
                        j++
                        break
                    }
                }
            }
        }
        j--
    }

    let checksum = 0
    let pos = 0
    for(const {id, space} of files){
        if(id !== -1){
            for(let i=0; i<space; i++) checksum += id * (pos + i)
        }
        pos += space
    }

    output(checksum)
}