import { input, output } from "utility"

// --- Part 1 ---

const strings = input.split("\n")

{
    let nice = 0
    for(const str of strings){
        if(
            str.matchAll(/[aeiou]/g).toArray().length >= 3 
            && /(.)\1/.test(str) 
            && !/(ab)|(cd)|(pq)|(xy)/.test(str)
        ){
            nice++
        }
    }

    output(nice)
}


// --- Part 2 ---

{
    let nice = 0
    for(const str of strings){
        if(
            /(.)(.).*\1\2/.test(str)
            && /(.).\1/.test(str)
        ){
            nice++
        }
    }
    
    output(nice)
}