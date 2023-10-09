import { ElementStates } from "../../../types/element-states";

export type Node<T> = {
  value: string;
  state: ElementStates;
  next: Node<T> | null;
};

export class LinkedListNode<T> implements Node<T> {
  constructor(
    public value: string,
    public state: ElementStates,
    public next: Node<T> | null = null,
  ) {}
}

export type NodeList<T> = {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;
};

export class LinkedList<T> implements NodeList<T> {
  public head: LinkedListNode<T> | null = null;
  public tail: LinkedListNode<T> | null = null;

  constructor(private container: { value: string; state: ElementStates }[]) {
    container.forEach(item => this.append(item.value, item.state));
  }

  public prepend(value: string, color: ElementStates): LinkedList<T> {
    const newNode = new LinkedListNode(value, color, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  public append(value: string, color: ElementStates): LinkedList<T> {
    const newNode = new LinkedListNode(value, color);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;

    this.tail = newNode;

    return this;
  }

  public delete(index: number): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    if (index === 0) return (this.head = this.head.next);

    let check: number = 0;
    let dummyHead = new LinkedListNode("0", ElementStates.Default, this.head);
    let curr = dummyHead;

    while (curr && curr.next && check <= index) {
      let prev = curr;
      curr = curr.next;

      if (check === index && curr.next) {
        curr = prev;
        curr.next = curr.next!.next;
      }
      if (check === index && !curr.next) {
        curr = prev;
        curr.next = null;
      }
      check++;
    }

    return dummyHead.next;
  }

  public add(
    index: number,
    value: string,
    color: ElementStates,
  ): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    let check: number = 0;
    let dummyHead = new LinkedListNode("0", ElementStates.Default, this.head);
    let curr = dummyHead;

    while (curr && curr.next && check <= index) {
      curr = curr.next;

      if (check === index) {
        let save = { ...curr };
        curr.value = value;
        curr.state = color;
        curr.next = { ...save };
      }
      check++;
    }

    return dummyHead.next;
  }

  public find(index: number): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    let check: number = 0;
    let dummyHead = new LinkedListNode("0", ElementStates.Default, this.head);
    let curr = dummyHead;

    while (curr && curr.next && check <= index) {
      curr = curr.next;

      if (check === index && curr.next) {
        return curr;
      }
      check++;
    }

    return curr;
  }

  public deleteTail(): LinkedListNode<T> | null {
    if (!this.tail) {
      return null;
    }

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }

    let currentNode = this.head;
    while (currentNode && currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  public deleteHead(): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  public toArray(): LinkedListNode<T>[] {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push({ value: currentNode.value, state: currentNode.state });
      currentNode = currentNode.next;
    }

    return nodes as LinkedListNode<T>[];
  }
}
