import { StemSingly } from './StemSingly';
import { SentinelDoubly } from './SentinelDoubly';

class StemDoubly extends StemSingly {
    constructor(head) {
        super(head, SentinelDoubly);
        head.setNext(this.sentinelTail);
        head.setPrev(this.sentinelHead);
        this.sentinelTail.setPrev(head);
    }

    getTail() {
        return this.sentinelTail.getPrev();
    }

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

    insert(cell, baseline) {
        // NOTE: if the baseline cell is this.sentinelTail then we are at the end of the stem and cannot insert the new cell
        if (!super.insert(cell, baseline)) {
            return false;
        }
        this.interlinkPrev(baseline, baseline.getNext(), baseline.getNext().getNext());
        return true;
    }

    extract(baseline) {
        const extractionResult = super.extract(baseline);
        if (!extractionResult) {
            return false;
        }
        // what was previously getNext().getNext() is now getNext() due to CellSingly unlinkNext
        this.unlinkPrev(baseline, baseline.getNext());
        return extractionResult;
    }

    push(cell) {
        return this.insert(cell, this.sentinelTail.getPrev());
    }

    pop() {
        return this.extract(this.sentinelTail.getPrev().getPrev());
    }

    unshift(cell) {
        return this.insert(cell, this.sentinelHead);
    }

    shift() {
        return this.extract(this.sentinelHead);
    }

    replace(cell, baseline) {
        // NOTE: if baseline is this.sentinelTail or the previous cell then we are at the end of the stem and cannot perform the replacement
        if (!super.replace(cell, baseline)) {
            return false;
        }
        this.interlinkPrev(baseline, baseline.getNext(), baseline.getNext().getNext());
        return true;
    }

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

export { StemDoubly }; // eslint-disable-line import/prefer-default-export
