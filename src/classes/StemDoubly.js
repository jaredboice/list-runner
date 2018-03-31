import { StemSingly } from "./StemSingly";
import { SentinelDoubly } from "./SentinelDoubly";

/* 
  class: StemDoubly
  description:  controls a system of cells interlinked within 
                cells interlinked within cells interlinked within one stem.
                each cell contains methods for accessing prev and next
  constructor: 
    head: starting cell for the stem-cell sequence
*/
class StemDoubly extends StemSingly {
  constructor(head) {
    super(head, SentinelDoubly);
    head.setNext(this.sentinelTail);
    head.setPrev(this.sentinelHead);
    this.sentinelTail.setPrev(head);
  }

  // returns the tail cell
  getTail() {
    return this.sentinelTail.getPrev();
  }

  /* method: interlink()
      description: takes an array of instantiated cells and interlinks them into a stem
      parameters: 
        cells: array of instantiated cells
    */
  interlink(cells) {
    let looper;
    for (looper = 0; looper < cells.length - 1; looper++) {
      cells[looper].setNext(cells[looper + 1]);
    }
    for (looper = 1; looper < cells.length; looper++) {
      cells[looper].setPrev(cells[looper - 1]);
    }
    const lastCellIndex = cells.length - 1;
    this.sentinelTail.setPrev(cells[lastCellIndex]);
    cells[lastCellIndex].setNext(this.sentinelTail);
  }

  // interlinks the chain of prev pointers for the provided cells
  interlinkPrev(cell1, cell2, cell3) {
    cell3.setPrev(cell2);
    cell2.setPrev(cell1);
  }

  // cell2 (the cell between cell1 and cell3) gets dereferenced (ie. cell2 is deleted from the stem)
  unlinkPrev(cell1, cell3) {
    cell3.setPrev(cell1);
  }

  /* 
    method: insert
      description: inserts a new cell after baseline and displaces the following cells forward
      parameters: 
        cell: new cell to be inserted
        baseline: the cell preceding the insertion point for the new cell
      returns: true if successful 
    */
  insert(cell, baseline) {
    // NOTE: if the baseline cell is this.sentinelTail then we are at the end of the stem and cannot insert the new cell
    if (!super.insert(cell, baseline)) {
      return false;
    }
    this.interlinkPrev(
      baseline,
      baseline.getNext(),
      baseline.getNext().getNext()
    );
    return true;
  }

  /* 
    method: extract
      description: extracts the cell after baseline and displaces the following cells backward
      parameters: 
        baseline: the cell preceding the extraction point
      returns: the extracted cell if successful
    */
  extract(baseline) {
    const extractionResult = super.extract(baseline);
    if (!extractionResult) {
      return false;
    }
    // what was previously getNext().getNext() is now getNext() due to CellSingly unlinkNext
    this.unlinkPrev(baseline, baseline.getNext());
    return extractionResult;
  }

  /*
      method: push
      description: inserts a new cell after the tail of the stem
      parameters: 
        cell: the cell to insert
      returns: true if successful 
    */
  push(cell) {
    return this.insert(cell, this.sentinelTail.getPrev());
  }

  /*
      method: pop
      description: extracts the tail of the stem
      parameters: none
      returns: the extracted cell if successful 
    */
  pop() {
    return this.extract(this.sentinelTail.getPrev().getPrev());
  }

  /*
      method: unshift
      description: inserts a new cell after sentinelHead and displaces the following cells forward  
      parameters: 
        cell: the cell to insert
      returns: true if successful 
    */
  unshift(cell) {
    return this.insert(cell, this.sentinelHead);
  }

  /*
      method: shift
      description: extracts the head of the stem and displaces the following cells backward
      parameters: none
      returns: the extracted cell if successful
    */
  shift() {
    return this.extract(this.sentinelHead);
  }

  /*
      method: replace
      description: replaces the cell after baseline with a new cell (no cells are displaced) 
      parameters: 
        cell: the replacement cell
        baseline: the cell preceding the one to be replaced
      returns: true if successful 
    */
  replace(cell, baseline) {
    const result = super.replace(cell, baseline);
    // NOTE: if baseline is this.sentinelTail or the previous cell then we are at the end of the stem and cannot perform the replacement
    if (!super.replace(cell, baseline)) {
      return false;
    }
    this.interlinkPrev(
      baseline,
      baseline.getNext(),
      baseline.getNext().getNext()
    );
    return true;
  }

  /*
      method: delete
      description: severs the entire portion of the stem following baseline 
      parameters: 
        baseline: the cell preceding the point of deletion
      returns: true if successful 
    */
  delete(baseline) {
    if (baseline === this.sentinelHead || baseline === this.sentinelTail) {
      return false;
    }
    const newSentinel = new SentinelDoubly();
    baseline.setNext(newSentinel);
    newSentinel.setPrev(baseline);
    this.sentinelTail = newSentinel;
    return true;
  }
}

export { StemDoubly };
