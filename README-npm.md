

# Copyright 2018 Jared Boice (MIT License / Open Source)

# List-Runner Documentation SUMMARY

get the [full documentation](https://github.com/jaredboice/list-runner) at gitHub.

**_this codebase has survived 65 unit tests_**

## Description

**List-Runner** is a lightweight _linked-list_ implementation that offers both _Singly_ _(next)_ 
and _Doubly_ data structures _(next and previous)_.

Nodes are referred to as cells and the list is referred to as a stem.

Singly cell instances have getNext() and setNext() methods. 
Doubly cell instances additionally have getPrev() and setPrev() methods.
All other operations are controlled by the Stem instance. There are two types of stems, one for singly data structures and one for doubly data structures.

## Install, Import & Instantiate

**Install**

`npm install --save list-runner`

**Import**

_importing the commonly needed classes_
```javascript  
import { CellSingly, CellDoubly, StemSingly, StemDoubly } from 'list-runner';
```

_importing the constants_
```javascript  
import { SENTINEL, CELL, SINGLY, DOUBLY } from 'list-runner';
```

_importing the sidekick functions_
```javascript    
import { initializeStem, findForward, findBackward, runForward, runBackward, countForward, countBackward } from 'list-runner';
```

_importing less commonly needed classes_
```javascript  
import { SentinelSingly, SentinelDoubly } from 'list-runner';
```

**Instantiate**

_solo instantiation_

```javascript
const cell = new CellDoubly();    
const stem = new StemDoubly(cell);
```

_connective instantiation_

```javascript
const cell1 = new CellDoubly();    
const cell2 = new CellDoubly();    
const cell3 = new CellDoubly();    
const stemCells = [cell1, cell2, cell3];    
const structureType = DOUBLY; // imported constant    
const stem = initializeStem(stemCells, structureType);
```

_examples_

```javascript

// assume the following are not strings
const baseline = 'some arbitrary cell on the stem'; // substitute a cell on the stem
const cell = 'some new cell'; // substitute a newly instantiated cell
const cells = 'an array of cells'; // substitute an array of unlinked cells

/* CELL OPERATIONS */
const nextCell = cell.getNext();
const prevCell = cell.getPrev(); // only DOUBLY data-structure

/* STEM OPERATIONS */
const head = stem.getHead();
const tail = stem.getTail(); // only DOUBLY data-structure
insert(cell, baseline);
extract(baseline);
unshift(cell);
shift();
push(cell); // only DOUBLY data-structure
pop(); // only DOUBLY data-structure
replace(cell, baseline);
delete(baseline);
```

```javascript
// assume the following are not strings
const comparator = 'a callback function that returns true when the right cell is found'; // receives each cell
const callBackParams 'any kind of parameters that you want to pass to the callBack function';
const callBack = 'a custom callback function that will receive each cell from a loop and also callBackParams'; // receives each cell and callBackParams

/* SIDEKICK FUNCTIONS */
interlink(cells);
const foundCell1 = findForward(baseline, comparator);
const foundCell2 = findBackward(baseline, comparator);
const lastCellInLoop1 = runForward(baseline, callBack, callBackParams);
const lastCellInLoop2 = runBackward(baseline, callBack, callBackParams);
const totalCount1 = countForward(baseline);
const totalCount2 = countBackward(baseline);

/* findForward / findBackward comparator callback examples */

// pure
export const findComparator1 = (cell) => {
  return cell.id === 'KD6-3.7';
};

// curried
export const findComparator2 = (id) => {
    return (cell) => {
        return cell.id === id;
    };
};

const myComparator = findComparator2('KD6-3.7');
const foundCell3 = findForward(baseline, myComparator);

/* runForward / runBackward callback examples */

// pure
export const runCallBack2 = (cell, callBackParams) => {
    return cell.id === id;

};

// curried
export const runCallBack2 = (id) => {
    return (cell, callBackParams) => {
        return cell.id === id;
    };
};

const myCallBack = runCallBack2('KD6-3.7', 'any other arbitrary parameters');
const lastCellInLoop3 = runForward(baseline, myCallBack, callBackParams);
```