export class ChapterQueue<T> {
  Queue: any;
  constructor() {
    this.Queue = new Array(3);
  }

  addToEnd(item: any) {
    if (!this.Queue[2]) {
      this.Queue[2] = item;
      return;
    }

    this.Queue[0] = this.Queue[1];
    this.Queue[1] = this.Queue[2];
    this.Queue[2] = item;
  }

  addToStart(item: any) {
    if (!this.Queue[0]) {
      this.Queue[0] = item;
      return;
    }

    this.Queue[2] = this.Queue[1];
    this.Queue[1] = this.Queue[0];
    this.Queue[0] = item;
  }

  clear() {
    this.Queue = [...this.Queue.map((_: any) => undefined)];
  }

  setQueue(queue: Array<T>) {
    queue.map((item, index) => {
      this.Queue[index] = item;
    });

    if (!queue[1]) {
      throw "no target item";
    }
  }

  getQueue() {
    return this.Queue;
  }
}
