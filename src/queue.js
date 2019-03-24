const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if (maxSize){
			this.maxSize = maxSize;
		}else this.maxSize = 30;
		this.heap = new MaxHeap();
		
	}

	push(data, priority) {
		if (this.size() === this.maxSize){
			 throw(Error);
		}else {
			this.heap.push(data, priority);
			
		}

	}

	shift() {
		if(this.size() > 0){
			return this.heap.pop();
		}else throw(Error);

	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		//console.log(this.size, (this.size === 0));
		return (this.size() === 0);
	}
}

module.exports = PriorityQueue;
