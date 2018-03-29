import CellSingly from './CellSingly';
import { CELL } from '../constants';

class CellDoubly extends CellSingly {
    constructor(next = null, prev = null, type = CELL) {
        super(next, type);
        this.prev = prev;
    }
    getPrev() {
        return this.prev;
    }

    setPrev(cell){
        this.prev = cell;
    }
}

export default CellDoubly;