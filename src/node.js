class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	setParent(parentNode) {
		this.parent = parentNode;
	}

	appendChild(node) {
		debugger
		if (this.left === null) {
			this.left = node;
			node.setParent(this);
		} else if (this.right === null) {
			this.right = node;
			node.setParent(this);
		}
	}

	removeChild(node) {
		if (node === this.left) {
			this.left = null;
		} else if (node === this.right) {
			this.right = null;
		} else throw (Error);
		node.parent = null;
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}

	}

	swapParentsPart(mom, grandmom, side) {
		console.log(side);
		this.parent = grandmom;
		this.left = mom;
		mom.setParent(this);
		if (side) {
			grandmom[side] = this;
		}
	}

	swapWithParent() {
		if (this.parent) {
			const mom = this.parent;
			const grandmom = this.parent.parent;
			const brother = (me, mom) => mom.right === me ? mom.left : mom.right;
			const bro = brother(this, mom);
			const firstChild = this.left;
			const secondChild = this.right;

			if (bro) {
				bro.setParent(this);
				this.right = bro;
			}

			if (grandmom && grandmom.left === mom) {
				this.swapParentsPart(mom, grandmom, 'left');

			} else if (grandmom) {
				this.swapParentsPart(mom, grandmom, 'right');

			} else {
				this.swapParentsPart(mom, grandmom);
			}

			mom.left = firstChild;
			mom.right = secondChild;
			if (firstChild) {
				firstChild.parent = mom;
			}
			if (secondChild) {
				secondChild.parent = mom;
			}



		}
	}
}

module.exports = Node;