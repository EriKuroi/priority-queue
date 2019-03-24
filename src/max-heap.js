const Node = require('./node');

class MaxHeap {
	constructor() {

		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		const nodeToPush = new Node(data, priority);
		this.insertNode(nodeToPush);
		this.shiftNodeUp(nodeToPush);
	}

	pop() {
		if (this.root != null) {
			const popped = this.root;
			const detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			return popped.data;

		}
	}

	detachRoot() {
		if(this.root){
			if (this.parentNodes.findIndex(el => el === this.root) >= 0) {
			this.parentNodes.splice(this.parentNodes.indexOf(this.root), 1);
		}
		const savedRoot = this.root;
		this.root = null;
		return savedRoot;}

	}

	restoreRootFromLastInsertedNode(detached) {
		if(detached && this.parentNodes.length){
		const lastIns = this.parentNodes[this.parentNodes.length - 1];
		this.parentNodes.pop();
		if (lastIns.parent) {
			if (this.parentNodes.findIndex(el => el === lastIns.parent) < 0 && detached != lastIns.parent) {
				this.parentNodes.unshift(lastIns.parent);
			}
		}
		lastIns.remove();
		this.root = lastIns;
		detached.left === lastIns ? this.root.left = detached.right : this.root.left = detached.left;
		detached.right === this.root.left ? this.right = null : this.root.right = detached.right;
		if (this.root.left) {
			this.root.left.parent = this.root;
		}
		if (this.root.right) {
			this.root.right.parent = this.root;
		}
		if (this.root.left === null || this.root.right === null) {
			this.parentNodes.unshift(this.root);
		}
}
	}

	size() {
		if (this.root === null) {
			return 0;
		} else {
			return this.root.sizeCount()
		}
	}

	isEmpty() {
		return this.root === null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			let firstParent = this.parentNodes[0];
			firstParent.appendChild(node);
			this.parentNodes.push(node);
			if (firstParent.right === node) {
				this.parentNodes.shift();
			}

		}

	}
	swapArrayPlaces(parent, node) {
		let parentPlace = this.parentNodes.findIndex(el => el === parent);
		let nodePlace = this.parentNodes.findIndex(el => el === node);
		if (parentPlace < 0) {
			if (nodePlace >= 0) {
				this.parentNodes.splice(nodePlace, 1, parent);
			}
		} else {
			this.parentNodes.splice(parentPlace, 1, node);
			this.parentNodes.splice(nodePlace, 1, parent);
		}
	}
	shiftNodeUp(node) {
		if (node.parent) {
			if (node.parent.priority < node.priority) {
				this.swapArrayPlaces(node.parent, node);
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		} else {
			this.root = node;
		}

	}

	assignSwapperRoot(swapper) {
		if (swapper.parent === null) {
			this.root = swapper;
		}
	}

	shiftNodeDown(node) {
		if(node){
			if (node.left) {
			if (node.left.priority > node.priority) {
				if (node.right && node.right.priority > node.left.priority) {

					const swapper = node.right;
					this.swapArrayPlaces(node, swapper);
					swapper.swapWithParent();
					this.assignSwapperRoot(swapper);
					this.shiftNodeDown(node);
				} else {
					const swapper = node.left;
					this.swapArrayPlaces(node, swapper);
					swapper.swapWithParent();
					this.assignSwapperRoot(swapper);
					this.shiftNodeDown(node);
				}
			}
		}}
	}
}

module.exports = MaxHeap;