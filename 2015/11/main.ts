import { input, output, alphabet, tebahpla } from "utility"

// --- Part 1 ---

function isValid(password: string){
    if(password.matchAll(/(.)\1/g).toArray().length >= 2 && !/[iol]/.test(password)){
        for(let i=0; i<password.length-2; i++){
            const code = alphabet[password[i]]
            if(code < 24 && tebahpla[code+1] == password[i+1] && tebahpla[code+2] == password[i+2]){
                return true
            }
        }
    }
    return false 
}

function increment(password: string, digit=7){
    if(password[digit] == "z") return increment(password, digit-1)
    return (password.substring(0, digit) + tebahpla[alphabet[password[digit]]+1]).padEnd(8, 'a')
}

let password = input
while(!isValid(password)) password = increment(password)

output(password)

// --- Part 2 ---

password = increment(password)
while(!isValid(password)) password = increment(password)

output(password)