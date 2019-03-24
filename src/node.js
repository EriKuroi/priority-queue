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

	swapParentsPart(mom, grandmom, side, bro) {
		if (this.left) {};
		if (this.right) {};
		mom.setParent(this);
		this.parent = grandmom;
		if (grandmom) {};
		if (bro) {
			if (this.left === bro) {
				this.right = mom;
			} else {
				this.left = mom;
			}
		} else {
			this.left = mom;
		}

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
				if (mom.right === this) {
					this.left = bro;
				} else {
					this.right = bro;
				}

			}

			if (grandmom && grandmom.left === mom) {
				this.swapParentsPart(mom, grandmom, 'left', bro);

			} else if (grandmom) {
				this.swapParentsPart(mom, grandmom, 'right', bro);

			} else {
				this.swapParentsPart(mom, grandmom, 0, bro);
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

	sizeCount() {
		if (!this.left && !this.right) {
			return 1;
		} else {
			return (this.left ? this.left.sizeCount() : 0) + (this.right ? this.right.sizeCount() : 0) + 1;
		}		
	}
}

module.exports = Node;