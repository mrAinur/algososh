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

  public prepend(value: string, color: ElementStates): LinkedList<T> {
    // Создаём новый узел, который будет новым head,
    // при создании передаем второй аргумент, который указывает
    // что его "next" будет текущий head,
    // так как новый узел будет стоять перед текущем head.

    const newNode = new LinkedListNode(value, color, this.head);

    // Переназначаем head на новый узел.
    this.head = newNode;

    // Если ещё нет tail, делаем новый узел tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    // Возвращаем весь список.
    return this;
  }

  public append(value: string, color: ElementStates): LinkedList<T> {
    // Создаём новый узел.
    const newNode = new LinkedListNode(value, color);

    // Если нет head или tail, делаем новым узлом head и tail.
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Присоединяем новый узел к концу связного списка.
    // Берём последний узел и указываем, что его next будет новым узлом.

    this.tail.next = newNode;

    // Переназначаем tail на новый узел.
    this.tail = newNode;

    return this;
  }

  public delete(index: number): LinkedListNode<T> | null {
    // Если нет head значит список пуст.
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
    // Если нет head значит список пуст.
    if (!this.head) {
      return null;
    }

    let check: number = 0;
    let dummyHead = new LinkedListNode("0", ElementStates.Default, this.head);
    let curr = dummyHead;

    while (curr && curr.next && check <= index) {
      curr = curr.next;

      if (check === index) {
        let save = curr;
        curr.value = value;
        curr.state = color;
        curr.next = save;
        console.log(`Вот получилось ${curr} and ${save}`);
      }
      check++;
    }

    return dummyHead.next;
  }

  public find(index: number): LinkedListNode<T> | null {
    // Если нет head значит список пуст.
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
    // Если нет tail, значит список пуст.

    if (!this.tail) {
      return null;
    }

    // Сохраняем значение последнего узла.
    const deletedTail = this.tail;

    // Если head и tail равны, значит в списке только один узел.
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }

    // Если в связном списке много узлов.
    // Перебираем все узлы и находим предпоследний узел,
    // убираем ссылку «next» на последний узел.

    let currentNode = this.head;
    while (currentNode && currentNode.next) {
      //
      // Если у следующего узла нет следующего узла,
      // значит текущий узел предпоследний.

      if (!currentNode.next.next) {
        // Убираем ссылку «next» на последний узел.
        currentNode.next = null;
      } else {
        // Перематываем на один узел вперед.
        currentNode = currentNode.next;
      }
    }

    // В данном случае currentNode - это предпоследний узел или head,
    // который становится последним узлом.

    this.tail = currentNode;

    return deletedTail;
  }

  public deleteHead(): LinkedListNode<T> | null {
    // Если нет head значит список пуст.
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    //
    // Если у head есть ссылка на следующий "next" узел
    // то делаем его новым head.

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      //
      // Если у head нет ссылки на следующий "next" узел
      // то мы удаляем последний узел.

      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  // Создаём массив из всех узлов
  public toArray(): LinkedListNode<T>[] {
    const nodes = [];

    let currentNode = this.head;

    // Перебираем все узлы и добавляем в массив.
    while (currentNode) {
      nodes.push({ value: currentNode.value, state: currentNode.state });
      currentNode = currentNode.next;
    }

    // Возвращаем массив из всех узлов.
    return nodes as LinkedListNode<T>[];
  }
}
