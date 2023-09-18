type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  getContainer: () => T[];
  clearContainer: () => T[];
  peak: () => T | null;
};

export class Stack<T> implements TStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.container.length) return this.container[this.container.length - 1];
    return null;
  };

  getContainer = (): T[] => {
    return this.container;
  };

  clearContainer = () => {
    return (this.container = []);
  };
}
