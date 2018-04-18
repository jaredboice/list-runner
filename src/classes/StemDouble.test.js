/* eslint-env jest */
import { CellDoubly } from './CellDoubly';
import { findBackward, runBackward, countBackward } from '../sidekick';
import { SENTINEL, DOUBLY } from '../constants';
import { findFunction, loopFunction, initializeTestData } from './StemSingly.test';

let stem1;
const cells = [];
let newCell1;
let targetCell1;
const parameters = {
    idCounter: 0
};

const generateCell = () => {
    return new CellDoubly();
};

const initTestData = () => {
    return initializeTestData(generateCell, parameters, cells, DOUBLY);
};

describe('doubly: basic navigation', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('doubly: basic navigation => test complete');
    });
    it('getHead should return the  head cell (cells[0])', () => {
        targetCell1 = cells[0];
        expect(stem1.getHead()).toEqual(targetCell1);
    });
    it("calling the head cell's getNext function should return cells[1]", () => {
        targetCell1 = cells[1];
        expect(stem1.getHead().getNext()).toEqual(targetCell1);
    });
    it('calling cells[4].getPrev() should return cells[3]', () => {
        targetCell1 = cells[3];
        expect(cells[4].getPrev()).toEqual(cells[3]);
    });
    it('getTail should return the tail cell (cells[4])', () => {
        targetCell1 = cells[4];
        expect(stem1.getTail()).toEqual(targetCell1);
    });
    it("the head cell's getPrev() should return SENTINEL", () => {
        targetCell1 = SENTINEL;
        expect(stem1.getHead().getPrev().type).toBe(targetCell1);
    });
    it("the tail cell's getNext() should return SENTINEL", () => {
        targetCell1 = SENTINEL;
        expect(stem1.getTail().getNext().type).toBe(targetCell1);
    });
});

describe('doubly: inserts', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
        newCell1 = new CellDoubly();
        newCell1.id = parameters.idCounter++;
    });
    afterEach(() => {
        console.log('doubly: inserts => test complete'); // eslint-disable-line no-console
    });
    it('inserting a cell after sentinelHead should interlink properly', () => {
        targetCell1 = newCell1;
        stem1.insert(newCell1, stem1.sentinelHead);
        expect(stem1.getHead()).toEqual(targetCell1);
        expect(stem1.getHead().getNext().id).toBe(0);
        expect(stem1.getHead().getPrev().type).toBe(SENTINEL);
    });
    it('inserting a cell after the tail should interlink properly', () => {
        targetCell1 = newCell1;
        stem1.insert(newCell1, stem1.getTail());
        expect(stem1.getTail()).toEqual(targetCell1);
        expect(stem1.getTail().getPrev().id).toBe(4);
        expect(stem1.getTail().getNext().type).toBe(SENTINEL);
    });
    it('inserting a cell after sentinelTail should return false', () => {
        targetCell1 = newCell1;
        const result = stem1.insert(newCell1, stem1.sentinelTail);
        expect(result).toBe(false);
    });
});

describe('doubly: extracts', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('doubly: extracts => test complete');
    });
    it('extracting the head cell should interlink properly', () => {
        stem1.extract(stem1.sentinelHead);
        expect(stem1.getHead()).toEqual(cells[1]);
        expect(stem1.getHead().getNext()).toEqual(cells[2]);
        expect(stem1.getHead().getPrev().type).toBe(SENTINEL);
    });
    it('extracting the tail cell should interlink properly', () => {
        stem1.extract(cells[3]);
        expect(stem1.getTail()).toEqual(cells[3]);
        expect(stem1.getTail().getPrev().id).toBe(2);
        expect(stem1.getTail().getNext().type).toBe(SENTINEL);
    });
    it('extracting sentinelTail should return false', () => {
        const result = stem1.extract(stem1.getTail());
        expect(result).toBe(false);
    });
    it('extracting a cell after sentinelTail should return false', () => {
        targetCell1 = newCell1;
        const result = stem1.extract(stem1.sentinelTail);
        expect(result).toBe(false);
    });
});

describe('doubly: replaces', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
        newCell1 = new CellDoubly();
        newCell1.id = parameters.idCounter++;
    });
    afterEach(() => {
        console.log('doubly: replaces => test complete');
    });
    it('replacing the cell after sentinelHead should interlink properly', () => {
        stem1.replace(newCell1, stem1.sentinelHead);
        expect(stem1.getHead()).toEqual(newCell1);
        expect(stem1.getHead().getNext()).toEqual(cells[1]);
        expect(stem1.getHead().getPrev().type).toBe(SENTINEL);
    });
    it('replacing the tail should interlink properly', () => {
        targetCell1 = newCell1;
        stem1.replace(newCell1, cells[3]);
        expect(stem1.getTail()).toEqual(targetCell1);
        expect(stem1.getTail().getPrev().id).toBe(3);
        expect(stem1.getTail().getNext().type).toBe(SENTINEL);
    });
    it('replacing sentinelTail should return false', () => {
        targetCell1 = newCell1;
        const result = stem1.replace(newCell1, stem1.getTail());
        expect(result).toBe(false);
    });
});

describe('doubly: unshifting', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
        newCell1 = new CellDoubly();
        newCell1.id = parameters.idCounter++;
    });
    afterEach(() => {
        console.log('doubly: unshifting => test complete'); // eslint-disable-line no-console
    });
    it('unshifting a cell onto the stem should interlink properly', () => {
        stem1.unshift(newCell1);
        expect(stem1.getHead()).toEqual(newCell1);
        expect(stem1.getHead().getNext()).toEqual(cells[0]);
        expect(stem1.getHead().getPrev().type).toBe(SENTINEL);
    });
});

describe('doubly: shifting', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('doubly: shifting => test complete'); // eslint-disable-line no-console
    });
    it('shifting a a cell off the stem should interlink properly', () => {
        stem1.shift();
        expect(stem1.getHead()).toEqual(cells[1]);
        expect(stem1.getHead().getNext()).toEqual(cells[2]);
        expect(stem1.getHead().getPrev().type).toBe(SENTINEL);
    });
});

describe('doubly: pushing', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
        newCell1 = new CellDoubly();
        newCell1.id = parameters.idCounter++;
    });
    afterEach(() => {
        console.log('doubly: pushing => test complete'); // eslint-disable-line no-console
    });
    it('pushing a cell onto the stem should interlink properly', () => {
        stem1.push(newCell1);
        expect(stem1.getTail()).toEqual(newCell1);
        expect(stem1.getTail().getPrev()).toEqual(cells[4]);
        expect(stem1.getTail().getNext().type).toBe(SENTINEL);
    });
});

describe('doubly: popping', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('doubly: popping => test complete'); // eslint-disable-line no-console
    });
    it('popping a cell off the stem should interlink properly', () => {
        stem1.pop();
        expect(stem1.getTail()).toEqual(cells[3]);
        expect(stem1.getTail().getPrev()).toEqual(cells[2]);
        expect(stem1.getTail().getNext().type).toBe(SENTINEL);
    });
});

describe('doubly: deleting', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('doubly: deleting => test complete'); // eslint-disable-line no-console
    });
    it('deleting a cell from the stem should interlink properly', () => {
        stem1.delete(cells[3]);
        expect(stem1.getTail()).toEqual(cells[3]);
        expect(stem1.getTail().getPrev()).toEqual(cells[2]);
        expect(stem1.getTail().getNext().type).toBe(SENTINEL);
        // confirm that SentinelTail's getPrev() points to the tail cell
        expect(stem1.sentinelTail.getPrev()).toEqual(cells[3]);
    });
});

describe('doubly: findBackward', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('doubly: findBackward => test complete'); // eslint-disable-line no-console
    });
    it('finds a cell with id === 1', () => {
        const match = findBackward(stem1.getTail(), findFunction(1));
        expect(cells[1]).toEqual(match);
    });
});

describe('doubly: runBackward', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('doubly: runBackward => test complete'); // eslint-disable-line no-console
    });
    it('finds a cell with id === 2', () => {
        const cell = runBackward(stem1.getTail(), loopFunction(2));
        // the last cell instance upon loop termination
        expect(cells[1]).toEqual(cell);
    });
});

describe('doubly: runBackward off the edge of the stem', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('doubly: runBackward off the edge fo the stem => test complete'); // eslint-disable-line no-console
    });
    it('does not find an id', () => {
        const cell = runBackward(stem1.getTail(), loopFunction(9));
        // the last cell instance upon loop termination
        expect(cell.type).toBe(SENTINEL);
    });
});

describe('doubly: countBackward', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('doubly: countBackward => test complete'); // eslint-disable-line no-console
    });
    it('counts a total of 5 cells', () => {
        const count = countBackward(cells[4]);
        expect(count).toBe(5);
    });
});
