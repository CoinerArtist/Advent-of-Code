import { alphabet, CountRecord, input, mod, output, tebahpla } from "utility"

// --- Part 1 ---

const rooms = input.matchAll(/([-a-z]+)-([0-9]+)\[([a-z]+)\]/g).map(([_, name, id, checksum]) => [name, checksum, parseInt(id)] as const)
const correctRooms: [string, number][] = []

let totalIds = 0
for(const [name, checksum, id] of rooms){
    const occ = new CountRecord()
    for(const letter of name.replaceAll("-", "")) occ.increment(letter)

    const letters = occ.keys().sort((a, b) => {
        const diff = occ.get(b) - occ.get(a)
        if(diff === 0) return a < b ? -1 : 1
        else return diff
    })
    
    if(letters.slice(0, 5).join("") === checksum){
        totalIds += id
        correctRooms.push([name, id])
    }
}

output(totalIds)

// --- Part 2 ---

function shift(word: string, n: number){
    let newWord = ""
    for(const letter of word){
        if(alphabet[letter] !== undefined) newWord += tebahpla[mod(alphabet[letter] + n, 26)]
        else newWord += letter
    }
    return newWord
}

const keyword = "northpole"
const shiftedKeyword = []
for(let i=0; i<26; i++){
    shiftedKeyword.push(shift(keyword, i))
}

outer:
for(const [name, id] of correctRooms){
    for(let i=0; i<26; i++){
        if(name.includes(shiftedKeyword[i])){
            output(id)
            break outer
        }
    }
}