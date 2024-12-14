import { input, output } from "utility";

// --- Part 1 ---

const ips = input.split("\n")

let tls = 0
for(const ip of ips){
    if(/([a-z])(?!\1)([a-z])\2\1/g.test(ip) && !/\[[a-z]*([a-z])(?!\1)([a-z])\2\1[a-z]*\]/g.test(ip)) tls++
}

output(tls)

// --- Part 2 ---

let ssl = 0
for(const ip of ips){
    if(/([a-z])(?!\1)([a-z])\1[a-z]*(?=\[).*\[[a-z]*\2\1\2|([a-z])(?!\3)([a-z])\3[a-z]*(?=\]).*\][a-z]*\4\3\4/g.test(ip)) ssl++
}

output(ssl)