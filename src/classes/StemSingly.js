import { SentinelSingly } from "./SentinelSingly";

/* 
  description:  controls a system of cells interlinked within 
                cells interlinked within cells interlinked within one stem.
                each cell contains methods for accessing next
  constructor: 
    head: starting cell for the stem-cell sequence
*/
class StemSingly {
  constructor(head, sentinel = SentinelSingly) {
    this.sentinelHead = new sentinel(head);
    this.sentinelTail = new sentinel();
    head.setNext(this.sentinelTail);
  }

  // returns the head cell
  getHead() {
    return this.sentinelHead.getNext();
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
    const lastCellIndex = cells.length - 1;
    cells[lastCellIndex].setNext(this.sentinelTail);
  }

  // interlinks the chain of next pointers for the provided cells
  interlinkNext(cell1, cell2, cell3) {
    cell1.setNext(cell2);
    cell2.setNext(cell3);
  }

  // cell2 (the cell between cell1 and cell3) gets dereferenced (ie. cell2 is deleted from the stem)
  unlinkNext(cell1, cell3) {
    cell1.setNext(cell3);
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
    if (baseline === this.sentinelTail) {
      return false;
    }
    this.interlinkNext(baseline, cell, baseline.getNext());
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
    if (
      baseline === this.sentinelTail ||
      baseline.getNext() === this.sentinelTail
    ) {
      return false;
    }
    const extractionResult = baseline.getNext();
    this.unlinkNext(baseline, baseline.getNext().getNext());
    return extractionResult;
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
    // NOTE: if baseline is this.sentinelTail or the previous cell then we are at the end of the stem and cannot perform the replacement
    if (
      baseline === this.sentinelTail ||
      baseline.getNext() === this.sentinelTail
    ) {
      return false;
    }
    this.interlinkNext(baseline, cell, baseline.getNext().getNext());
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
    const newSentinel = new SentinelSingly();
    baseline.setNext(newSentinel);
    this.sentinelTail = newSentinel;
    return true;
  }
}

export { StemSingly };
