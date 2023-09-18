type TQueue<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clearQueue: () => void;
  getContainer: () => (T | null)[];
  getHeadTask: () => T | null;
  getTailTask: () => T | null;
  checkEnd: () => boolean;
};

export class Queue<T> implements TQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  getContainer = () => {
    return this.container;
  };

  enqueue = (item: T) => {
    if (this.length >= this.size) throw new Error("Maximum length exceeded");
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) throw new Error("No elements in the queue");
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  getHeadTask = () => {
    return this.head <= this.tail && this.head < this.size
      ? this.container[this.head]
      : null;
  };

  getTailTask = () => {
    return this.tail <= this.size ? this.container[this.tail - 1] : null;
  };

  clearQueue = () => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  checkEnd = () => this.tail === this.size;
  isEmpty = () => this.length === 0;
}
