/* eslint-env jest */
import { CellSingly } from './CellSingly';
import { initializeStem, findForward, runForward, countForward } from '../sidekick';
import { SENTINEL, SINGLY } from '../constants';

let stem1;
const cells = [];
let newCell1;
let targetCell1;
const parameters = {
    idCounter: 0
};

export const findFunction = (id) => {
    return (cell) => {
        return cell.id === id;
    };
};

export const loopFunction = (id) => {
    return (cell) => {
        return cell.id === id;
    };
};

const generateCell = () => {
    return new CellSingly();
};

export const addProperties = (cell, params) => {
    cell.id = params.idCounter++;
};

export const objectify = (createCell, params) => {
    const cell = createCell();
    addProperties(cell, params);
    return cell;
};

export const initializeTestData = (createCell, params, stemCells, structureType) => {
    for (let looper = 0; looper < 5; looper++) {
        stemCells[looper] = objectify(createCell, params);
    }
    const transientStem = initializeStem(stemCells, structureType);
    return transientStem;
};

const initTestData = () => {
    return initializeTestData(generateCell, parameters, cells, SINGLY);
};

describe('singly: basic navigation', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('singly: basic navigation => test complete'); // eslint-disable-line no-console
    });
    it('getHead should return the  head cell (cells[0])', () => {
        targetCell1 = cells[0];
        expect(stem1.getHead()).toEqual(targetCell1);
    });
    it("calling the head cell's getNext function should return cells[1]", () => {
        targetCell1 = cells[1];
        expect(stem1.getHead().getNext()).toEqual(targetCell1);
    });
    it("the tail cell's getNext() should return SENTINEL", () => {
        targetCell1 = SENTINEL;
        expect(cells[4].getNext().type).toBe(targetCell1);
    });
});

describe('singly: inserts', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
        newCell1 = new CellSingly();
        newCell1.id = parameters.idCounter++;
    });
    afterEach(() => {
        console.log('singly: inserts => test complete'); // eslint-disable-line no-console
    });
    it('inserting a cell after sentinelHead should interlink properly', () => {
        targetCell1 = newCell1;
        stem1.insert(newCell1, stem1.sentinelHead);
        expect(stem1.getHead()).toEqual(targetCell1);
        expect(stem1.getHead().getNext().id).toBe(0);
    });
    it('inserting a cell after the tail should interlink properly', () => {
        targetCell1 = newCell1;
        stem1.insert(newCell1, cells[4]);
        expect(cells[4].getNext()).toEqual(targetCell1);
        expect(cells[4].getNext().getNext().type).toBe(SENTINEL);
    });
    it('inserting a cell after sentinelTail should return false', () => {
        targetCell1 = newCell1;
        const result = stem1.insert(newCell1, stem1.sentinelTail);
        expect(result).toBe(false);
    });
});

describe('singly: extracts', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('singly: extracts => test complete'); // eslint-disable-line no-console
    });
    it('extracting the head cell should interlink properly', () => {
        stem1.extract(stem1.sentinelHead);
        expect(stem1.getHead()).toEqual(cells[1]);
        expect(stem1.getHead().getNext()).toEqual(cells[2]);
    });
    it('extracting the tail cell should interlink properly', () => {
        stem1.extract(cells[3]);
        expect(cells[3].getNext().type).toBe(SENTINEL);
    });
    it('extracting sentinelTail should return false', () => {
        const result = stem1.extract(cells[4]);
        expect(result).toBe(false);
    });
    it('extracting a cell after sentinelTail should return false', () => {
        targetCell1 = newCell1;
        const result = stem1.extract(cells[4].getNext());
        expect(result).toBe(false);
    });
});

describe('singly: replaces', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
        newCell1 = new CellSingly();
        newCell1.id = parameters.idCounter++;
    });
    afterEach(() => {
        console.log('singly: replaces => test complete'); // eslint-disable-line no-console
    });
    it('replacing the cell after sentinelHead should interlink properly', () => {
        stem1.replace(newCell1, stem1.sentinelHead);
        expect(stem1.getHead()).toEqual(newCell1);
        expect(stem1.getHead().getNext()).toEqual(cells[1]);
    });
    it('replacing the tail should interlink properly', () => {
        targetCell1 = newCell1;
        stem1.replace(newCell1, cells[3]);
        expect(cells[3].getNext()).toEqual(targetCell1);
        expect(cells[3].getNext().getNext().type).toBe(SENTINEL);
    });
    it('replacing sentinelTail should return false', () => {
        targetCell1 = newCell1;
        const result = stem1.replace(newCell1, cells[4]);
        expect(result).toBe(false);
    });
});

describe('singly: unshifting', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
        newCell1 = new CellSingly();
        newCell1.id = parameters.idCounter++;
    });
    afterEach(() => {
        console.log('singly: unshifting => test complete'); // eslint-disable-line no-console
    });
    it('unshifting a cell onto the stem should interlink properly', () => {
        stem1.unshift(newCell1);
        expect(stem1.getHead()).toEqual(newCell1);
        expect(stem1.getHead().getNext()).toEqual(cells[0]);
    });
});

describe('singly: shifting', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('singly: shifting => test complete'); // eslint-disable-line no-console
    });
    it('shifting a a cell off the stem should interlink properly', () => {
        stem1.shift();
        expect(stem1.getHead()).toEqual(cells[1]);
        expect(stem1.getHead().getNext()).toEqual(cells[2]);
    });
});

describe('singly: deleting', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('singly: deleting => test complete'); // eslint-disable-line no-console
    });
    it('deleting a cell from the stem should interlink properly', () => {
        stem1.delete(cells[3]);
        expect(cells[3].getNext().type).toBe(SENTINEL);
    });
});

describe('singly: findForward', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('singly: findForward => test complete'); // eslint-disable-line no-console
    });
    it('finds a cell with id === 3', () => {
        const match = findForward(stem1.getHead(), findFunction(3));
        expect(cells[3]).toEqual(match);
    });
});

describe('singly: runForward', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('singly: runForward => test complete'); // eslint-disable-line no-console
    });
    it('finds a cell with id === 3', () => {
        const cell = runForward(stem1.getHead(), loopFunction(3));
        // the last cell instance upon loop termination
        expect(cells[4]).toEqual(cell);
    });
});

describe('singly: runForward off the edge of the stem', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('singly: runForward off the edge of the stem => test complete'); // eslint-disable-line no-console
    });
    it('does not find an id', () => {
        const cell = runForward(stem1.getHead(), loopFunction(9));
        // the last cell instance upon loop termination
        expect(cell.type).toBe(SENTINEL);
    });
});

describe('singly: countForward', () => {
    beforeEach(() => {
        parameters.idCounter = 0;
        stem1 = initTestData();
    });
    afterEach(() => {
        console.log('singly: countForward => test complete'); // eslint-disable-line no-console
    });
    it('counts a total of 5 cells', () => {
        const count = countForward(cells[0]);
        expect(count).toBe(5);
    });
});
