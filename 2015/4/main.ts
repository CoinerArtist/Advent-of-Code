import { input, output } from "utility"
import { md5 } from "jsr:@takker/md5"
import { encodeHex } from "jsr:@std/encoding@1/hex"

// --- Part 1 ---

let i=1
while(!encodeHex(md5(`${input}${i}`)).startsWith("00000")) i++

console.log(encodeHex(md5(`${input}${i}`)))
output(i)

// --- Part 2 ---

while(!encodeHex(md5(`${input}${i}`)).startsWith("000000")) i++

console.log(encodeHex(md5(`${input}${i}`)))
output(i)