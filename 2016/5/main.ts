import { input, output } from "utility"
import { md5 } from "jsr:@takker/md5"
import { encodeHex } from "jsr:@std/encoding@1/hex"

// --- Part 1 ---

{
    let password = ""

    let i=0
    while(password.length < 8){
        while(!encodeHex(md5(`${input}${i}`)).startsWith("00000")) i++

        const hash = encodeHex(md5(`${input}${i}`))
        password += hash[5]
        console.log(hash, password.padEnd(8, "."))

        i++
    }

    output(password)
}

// --- Part 2 ---

{
    let password = Array(8).fill(".")

    let i=0
    while(password.includes(".")){
        while(!encodeHex(md5(`${input}${i}`)).startsWith("00000")) i++

        const hash = encodeHex(md5(`${input}${i}`))
        if(parseInt(hash[5]) < 8 && password[parseInt(hash[5])] === "."){
            password[parseInt(hash[5])] = hash[6]
        }
        console.log(hash, password.join(""))
        
        i++
    }

    output(password.join(""))
}