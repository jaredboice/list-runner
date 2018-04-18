import { SentinelSingly } from './SentinelSingly';
import { SENTINEL } from '../constants';

class SentinelDoubly extends SentinelSingly {
    constructor(next = null, prev = null, type = SENTINEL) {
        super(next, type);
        this.prev = prev;
    }
    getPrev() {
        return this.prev;
    }
    setPrev(cell) {
        this.prev = cell;
    }
}

export { SentinelDoubly }; // eslint-disable-line import/prefer-default-export
