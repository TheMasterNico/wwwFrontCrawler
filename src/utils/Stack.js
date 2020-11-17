class Node {

	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

export default class Stack {

	constructor() {
		this.top = new Node();
		this.size = 0
	}

	isEmpty() {
		return this.size === 1; // because the first item is the main categories
	}

	getTop() {
		if (this.isEmpty()) {
			return null;
		}
		return this.top; //:::::::::::::
	}

	push(data) {
		let node = new Node(data);
		node.next = this.top; // bajamos el top
		this.top = node;//sube el top al nuevo
		this.size++;
	}

	pop() {
		let temp;

		if (this.isEmpty()) {
			return null;
		}

		temp = this.top;
		this.top = this.top.next;
		this.size--;

		return temp;
	}	
}