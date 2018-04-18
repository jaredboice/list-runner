import { SENTINEL } from '../constants';

class SentinelSingly {
    constructor(next = null, type = SENTINEL) {
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

export { SentinelSingly }; // eslint-disable-line import/prefer-default-export
