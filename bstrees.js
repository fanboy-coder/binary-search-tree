class Node {
	constructor (data = null, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

class Tree {
	constructor (array) {
		this.sortedArray = [...new Set(array)].sort((a, b) => a-b);
		this.root = this.buildTree;
	}

	// take an array and build a balanced tree
	buildTree(sortedArray) {
		if (sortedArray.length === 0) return null;
		let middleIndex = Math.floor(sortedArray.length / 2);
		const newNode = new Node(sortedArray[middleIndex]);

		const firstHalf = sortedArray.slice(0, middleIndex);
		const secondHalf = sortedArray.slice(middleIndex +1);
		newNode.left = this.buildTree(firstHalf);
		newNode.right = this.buildTree(secondHalf);

		return newNode;
	}
	
	// insert a value in the tree
	insert (value) {
		if (!this.root) {
			this.root = new Node(value);
		}
		else {
			this.root.insertNode(value);
		}
	}

	// delete a value in the tree
	delete (value) {
		if (this.root) {
			this.root = this.root.deleteNode(value);
		}
	}

	// return the node with a given value
	find (value) {
		if(this.root) {
			return this.root.findNode(value);
		}
	}

	//traverse the tree in breadth-first order and return an array of binary search tree values
	levelOrder(){
		if (this.root){
			return this.root.levelOrderNode(this.root.displayNodeData);
		}
	}

	//traverse the tree in depth-first (pre-order) order and return an array of binary search tree values
	preOrder(){
		if(this.root){
			return this.root.preOrderNode(this.root);
		}
	}

	//traverse the tree in depth-first (in-order) order and return an array of binary search tree values
	inOrder() {
		if (this.root) {
			return this.root.inOderNode(this.root);
		}
	}

	//traverse the tree in depth-first (post-order) order and return an array of binary search tree values
	postOrder() {
		if(this.root){
			return this.root.postOrderNode(this.root);
		}
	}

	// return the node's height
	height(node) {
		if(!this.root) return "This tree is empty";
		if (!node) return 0;
		if (!(node instanceof Node)) return "Data not found in this tree";
		const leavesArr = node.findLeavesNode(node);
		const nodeDepth = this.findDepth(node.data);
		return this.root.findHeightNode(leavesArr,nodeDepth);
	}

	// returns node depth
	findDepth(nodeData){
		if(!this.root) {
			return -1;
		}
		else return this.root.findDepthNode(nodeData);
	}

	// checks if a tree is balanced
	isBalanced () {
		if (this.root){
			return this.root.isBalancedNode(this, this.root);
		}
	}

	// rebalances a tree
	rebalance() {
		if(!this.root) {
			console.log("This tree is empty");
			return this;
		} else if (!this.isBalanced()) {
			const  treeNodes = this.preOrder();
			let balancedTree = new Tree(treeNodes);
			console.log(balancedTree);
			return balancedTree;
		}
		else {
			console.log("This tree is balanced");
			return this;
		}
	}

	// console.log the tree in a structered format (from The Odin Project)
	prettyPrint(node = this.root, prefix = "", isLeft = true) {
		if (node.right) {
		  this.prettyPrint(node.right, `${prefix}${isLeft ? "|   " : "    "}`, false);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
		if (node.left) {
		  this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "|   "}`, true);
		}
	  }
}

export default Tree;