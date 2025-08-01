class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }

}
class LinkedList {
    constructor() {
        this.head = null;
    }

    prepend(value) {
        const node = !this.head ? 
            new Node(value, null):
            new Node(value, head);
        this.head = node;
    }

    append(value) {
        const node = new Node(value, null);
        if(!this.head) {
            this.head = node;
            return;
        }
        let current = this.head;
        while(current.next) {
            current = current.next;
        }
        current.next = node;
    }

    map(cb) {
        const mappedLinkedList = new LinkedList();
        let current = this.head;
        while(current) {
            mappedLinkedList.append(cb(current.value));
            current = current.next;
        }
        return mappedLinkedList;
    }

    size() {
        let counter = 0;
        let current = this.head;
        while(current) {
            counter++;
            current = current.next;
        }
        return counter;
    }

    at(index) {
        let current = this.head;
        let counter = 0;
        while(current && index != counter) {
            counter++;
            current = current.next;
        }
        if(!current) {
            throw new Error("There isn't this index in Linked list");
        } else {
            return current.value;
        }

    }

    join(other) {
        let current = this.head;
        if(!this.head) {
            this.head = other.head;
            return;
        }
        while(current.next) {
            current = current.next;
        }
      
        current.next = other.head;
    }

    filter(cb) {
        const filteredLinklist = new LinkedList();
        let current = this.head;
        while(current) {
            if(cb(current.value)) {
                filteredLinklist.append(current.value);
            }
            current = current.next;
        }
        return filteredLinklist;
    }

    /***
     * Run an operation for each member of linkedList
     * Example 
     * newList.forEach((x) => console.log(x))
    ***/

    forEach(cb) { 
        let current = this.head;
        while(current) {
            cb(current.value);
            current = current.next;
        }
    }
}
