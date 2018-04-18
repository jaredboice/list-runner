import { SentinelSingly } from './SentinelSingly';

class StemSingly {
    constructor(head, Sentinel = SentinelSingly) {
        this.sentinelHead = new Sentinel(head);
        this.sentinelTail = new Sentinel();
        head.setNext(this.sentinelTail);
    }

    getHead() {
        return this.sentinelHead.getNext();
    }

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

    insert(cell, baseline) {
        // NOTE: if the baseline cell is this.sentinelTail then we are at the end of the stem and cannot insert the new cell
        if (baseline === this.sentinelTail) {
            return false;
        }
        this.interlinkNext(baseline, cell, baseline.getNext());
        return true;
    }

    extract(baseline) {
        if (baseline === this.sentinelTail || baseline.getNext() === this.sentinelTail) {
            return false;
        }
        const extractionResult = baseline.getNext();
        this.unlinkNext(baseline, baseline.getNext().getNext());
        return extractionResult;
    }

    unshift(cell) {
        return this.insert(cell, this.sentinelHead);
    }

    shift() {
        return this.extract(this.sentinelHead);
    }

    replace(cell, baseline) {
        // NOTE: if baseline is this.sentinelTail or the previous cell then we are at the end of the stem and cannot perform the replacement
        if (baseline === this.sentinelTail || baseline.getNext() === this.sentinelTail) {
            return false;
        }
        this.interlinkNext(baseline, cell, baseline.getNext().getNext());
        return true;
    }

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

export { StemSingly }; // eslint-disable-line import/prefer-default-export
