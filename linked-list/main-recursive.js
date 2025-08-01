class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
    append =(value) => {
        // if(!this) {
        //     const node  = new Node (value, null)
        //     node.value
        //     return
        // }
        if(this.next === null) {
            const node  = new Node (value, null)
           this.next = node;
           return
        }
        this.append(value)
    }

}
// class LinkedList {
//     constructor() {
//         this.head = null;
//     }
// }

const node = new Node ("1")
node.append("10")