class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
    append = (newValue) => {
        if (this.next === null) {
            const node = new Node(newValue, null)
            this.next = node;
            return
        }
        this.append(newValue)

    }
    map = (cb) => {

        if (this.next === null) {
            const node = new Node(cb(value), null)
            this.next = node;
            return
        }
        this.map(cb)
    }
    forEach = (cb) => {
        while (this) {
            cb(this.value);
            new Node(this.next);
        }
    }

}
// class LinkedList {
//     constructor() {
//         this.head = null;
//     }
// }

const node = new Node("1")
node.append("10")
node.append("20")
node.forEach((x) => console.log(x))