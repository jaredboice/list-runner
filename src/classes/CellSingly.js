import { CELL } from "../constants";

/* 
  class: CellSingly
  description: includes methods for accessing the next cell
  constructor: 
    next: next cell in the sequence
*/
class CellSingly {
  constructor(next = null, type = CELL) {
    this.type = type;
    this.next = next;
  }

  getNext() {
    return this.next;
  }
  setNext(cell) {
    this.next = cell;
  }
}

export { CellSingly };
