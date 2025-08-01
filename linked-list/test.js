class Child {
    value = 10;

    increment() {
        this.value = this.value + 1;
    }
}

class Parent {
    value = 1;

    increment() {
        this.value = this.value + 1;
    }

    setChild(child) {
        this.child = child
    }

    incrementChild() {
        child.increment()
    }
}

const child = new Child()
const parent = new Parent()

parent.incrementChild(child)

console.log(child.value); //11
console.log(parent.value); //1

