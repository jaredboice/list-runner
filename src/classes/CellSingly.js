import { CELL } from '../constants';

class CellSingly {
    constructor(next = null, type = CELL) {
        this.type = type;
        this.next = next;
    }

    getNext() {
        return this.next;
    }
    setNext(cell){
        this.next = cell;
    }
}

export default CellSingly;