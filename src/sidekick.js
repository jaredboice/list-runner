import { StemSingly } from './classes/StemSingly';
import { StemDoubly } from './classes/StemDoubly';
import { SINGLY, DOUBLY, SENTINEL } from './constants';

export const initializeStem = (cells, structureType = SINGLY) => {
    let Stem;
    switch (structureType) {
    case SINGLY:
        Stem = StemSingly;
        break;
    case DOUBLY:
        Stem = StemDoubly;
        break;
    default:
        break;
    }
    const transientStem = new Stem(cells[0]);
    transientStem.interlink(cells);
    return transientStem;
};

export const findForward = (baseline, comparator) => {
    let breakLoop = false;
    let cell = baseline;
    do {
        breakLoop = comparator(cell);
        if (breakLoop) return cell;
        cell = cell.getNext();
    } while (cell.type !== SENTINEL);
    return false;
};

export const findBackward = (baseline, comparator) => {
    let breakLoop = false;
    let cell = baseline;
    do {
        breakLoop = comparator(cell);
        if (breakLoop) return cell;
        cell = cell.getPrev();
    } while (cell.type !== SENTINEL);
    return false;
};

export const runForward = (baseline, callBack, callBackParams) => {
    let cell = baseline;
    let shortCircuit = null;
    do {
        shortCircuit = callBack(cell, callBackParams);
        cell = cell.getNext();
    } while (cell != null && cell.type !== SENTINEL && !shortCircuit);
    return cell;
};

export const runBackward = (baseline, callBack, callBackParams) => {
    let cell = baseline;
    let shortCircuit = null;
    do {
        shortCircuit = callBack(cell, callBackParams);
        cell = cell.getPrev();
    } while (cell != null && cell.type !== SENTINEL && !shortCircuit);
    return cell;
};

export const countForward = (baseline) => {
    let count = 0;
    let nextCell = baseline;
    do {
        count++;
        nextCell = nextCell.getNext();
    } while (nextCell != null && nextCell.type !== SENTINEL);
    return count;
};

export const countBackward = (baseline) => {
    let count = 0;
    let nextCell = baseline;
    do {
        count++;
        nextCell = nextCell.getPrev();
    } while (nextCell != null && nextCell.type !== SENTINEL);
    return count;
};
