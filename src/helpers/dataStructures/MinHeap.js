const MAX = 1000000;
class MinHeap {
  constructor(len) {
    this.size = len;
    this.minHeap = [];
    this.indexOf = [];

    for (var i = 0; i < len; i++) {
      this.minHeap.push([MAX, i]);
      this.indexOf.push(i);
    }
  }

  swap = (ind1, ind2) => {
    this.indexOf[this.minHeap[ind1][1]] = ind2;
    this.indexOf[this.minHeap[ind2][1]] = ind1;

    const tmp = this.minHeap[ind1];
    this.minHeap[ind1] = this.minHeap[ind2];
    this.minHeap[ind2] = tmp;
  };

  parent = (ind) => {
    return Math.floor((ind - 1) / 2);
  };

  decreaseKey = (vertex, val) => {
    let index = this.indexOf[vertex];
    if (this.minHeap[index][0] <= val) return false;

    this.minHeap[index][0] = val;

    while (
      index !== 0 &&
      this.minHeap[index][0] < this.minHeap[this.parent(index)][0]
    ) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }

    return true;
  };

  extractMin = () => {
    if (this.size <= 0) return null;
    if (this.size == 1) {
      this.size = 0;
      this.indexOf[this.minHeap[0][1]] = -1;
      return this.minHeap[0][1];
    }

    const minElement = this.minHeap[0][1];
    this.indexOf[minElement] = -1;

    this.minHeap[0] = this.minHeap[this.size - 1];
    this.indexOf[this.minHeap[0][1]] = 0;

    this.size--;
    this.minHeapify(0);

    return minElement;
  };

  minHeapify = (par) => {
    const left = 2 * par + 1;
    const right = 2 * par + 2;
    let smallest = par;

    if (left < this.size && this.minHeap[left][0] < this.minHeap[smallest][0])
      smallest = left;
    if (right < this.size && this.minHeap[right][0] < this.minHeap[smallest][0])
      smallest = right;

    if (smallest != par) {
      this.swap(par, smallest);
      this.minHeapify(smallest);
    }
  };

  isEmpty = () => {
    if (this.size == 0) return true;
    else return false;
  };

  isPresent = (vertex) => {
    if (this.indexOf[vertex] === -1) return false;
    return true;
  };
}

export default MinHeap;
