import StemSingly from './classes/StemSingly';
import StemDoubly from './classes/StemDoubly';
import { SINGLY, DOUBLY, SENTINEL } from './constants';

/* function: interlinkStem()
    description: takes an array of instantiated cells and interlinks them into a newly instantiated stem
    parameters: 
        cells: array of instantiated cells
        structureType: SINGLY || DOUBLY
    returns: Stem instance
*/
export const initializeStem = (cells, structureType = SINGLY) => {
    let Stem; 
    switch(structureType){
        case SINGLY:
            Stem = StemSingly;
            break;
        case DOUBLY:
            Stem = StemDoubly;
            break;
    }
    const transientStem = new Stem(cells[0]);
    transientStem.interlink(cells);
    return transientStem;
};

/* function: findForward()
    description: traverses forward through a stem from the provided baseline in search of a specific cell
    parameters: 
        baseline: the cell at which to begin the search
        comparator: custom callback function that returns true || false when comparing a cell for a match against custom criteria
    returns: found cell || false
*/
export const findForward = (baseline, comparator) => {
    let breakLoop = false;
    let cell = baseline;
    do {
        breakLoop = comparator(cell);
        if(breakLoop) return cell;
        cell = cell.getNext();
    } while(cell.type !== SENTINEL);
    return false;
};

/* function: findBackward()
    description: traverses backward through a stem from the provided baseline in search of a specific cell
    parameters: 
        baseline: the cell at which to begin the search
        comparator: custom callback function that returns true || false when comparing a cell for a match against custom criteria
    returns: found cell || false
*/
export const findBackward = (baseline, comparator) => {
    let breakLoop = false;
    let cell = baseline;
    do {
        breakLoop = comparator(cell);
        if(breakLoop) return cell;
        cell = cell.getPrev();
    } while(cell.type !== SENTINEL);
    return false;
};

/* function: runForward()
    description: traverses forward through a stem and executes a callback (until the callback returns true or the loop reaches the edge)
    parameters: 
        baseline: the cell at which to begin the traversal
        callBack: custom function that returns true when the traversal should be shortCircuited and terminated
        callBackParams: the callback function gets passed the current cell and then callBackParams as a 2nd parameter
    returns: the last cell instance upon loop termination
*/
export const runForward = (baseline, callBack, callBackParams) => {
    let cell = baseline;
    let shortCircuit = null;
    do {
        shortCircuit = callBack(cell, callBackParams);
        cell = cell.getNext();
    } while(cell != null && cell.type !== SENTINEL  && !shortCircuit);
    return cell;
};

/* function: runBackward()
    description: traverses backward through a stem and executes a callback (until the callback returns true or the loop reaches the edge)
    parameters: 
        baseline: the cell at which to begin the traversal
        callBack: custom function that returns true when the traversal should be shortCircuited and terminated
        callBackParams: the callback function gets passed the current cell and then callBackParams as a 2nd parameter
    returns: the last cell instance upon loop termination
*/
export const runBackward = (baseline, callBack, callBackParams) => {
    let cell = baseline;
    let shortCircuit = null;
    do {
        shortCircuit = callBack(cell, callBackParams);
        cell = cell.getPrev();
    } while(cell != null && cell.type !== SENTINEL  && !shortCircuit);
    return cell;
};

/* function: countForward(baseline)
    description: traverses forward through a stem, starting with baseline, and returns the total count of cells.
    parameters: 
        baseline: the cell at which to begin the counting process
    returns: the total count of all interlinked cells
*/
export const countForward = (baseline) => {
    let count = 0;
    let nextCell = baseline;
    do {
        count++;
        nextCell = nextCell.getNext();
    }
    while(nextCell != null && nextCell.type !== SENTINEL);
    return count;
};

/* function: countBackward(baseline)
    description: traverses backward through a stem, starting with baseline, and returns the total count of cells.
    parameters: 
        baseline: the cell at which to begin the counting process
    returns: the total count of all interlinked cells
*/
export const countBackward = (baseline) => {
    let count = 0;
    let nextCell = baseline;
    do {
        count++;
        nextCell = nextCell.getPrev();
    }
    while(nextCell != null && nextCell.type !== SENTINEL);
    return count;
}; 
