const parent = (i: number) => ((i + 1) >>> 1) - 1;
const left = (i: number) => (i << 1) + 1;
const right = (i: number) => (i + 1) << 1;

export class PriorityQueue<T>{
    private heap: number[] = []
    private valueHeap: T[] = []
    
    get size(){
        return this.heap.length
    }

    peek(){
        return this.valueHeap[0]
    }

    push(priority: number, value: T){
        this.heap.push(priority)
        this.valueHeap.push(value)
        this.siftup()
    }

    pop(){
        if(this.heap.length === 0){
            throw new Error("Can't pop. Queue is empty.")
        }
        this.swap(0, this.heap.length - 1)

        this.heap.pop()
        const value = this.valueHeap.pop()!
        this.siftdown()

        return value
    }

    private swap(i: number, j: number){
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
        [this.valueHeap[i], this.valueHeap[j]] = [this.valueHeap[j], this.valueHeap[i]]
    }

    private siftup(){
        let i = this.heap.length - 1
        while(i > 0 && this.heap[i] > this.heap[parent(i)]){
            this.swap(i, parent(i))
            i = parent(i)
        }
    }

    private siftdown(){
        let i=0
        while((left(i) < this.heap.length && this.heap[left(i)] > this.heap[i]) || (right(i) < this.heap.length && this.heap[right(i)] > this.heap[i])){
            let maxi = (right(i) < this.heap.length && this.heap[right(i)] > this.heap[left(i)]) ? right(i) : left(i)
            this.swap(i, maxi)
            i = maxi
        }
    }


}