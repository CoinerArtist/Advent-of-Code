import { input, output } from "utility";

// --- Part 1 ---

const boxes = input.split("\n").map(x => x.split("x").map(y => parseInt(y)))

let wrapping = 0
for(const [l, w, h] of boxes){
    wrapping += 2*(l*w + w*h + l*h) + Math.min(l*w, w*h, l*h)
}

output(wrapping)

// --- Part 2 ---

let ribbon = 0
for(const [l, w, h] of boxes){
    ribbon += l*w*h + 2*Math.min(l+w, w+h, l+h)
}

output(ribbon)