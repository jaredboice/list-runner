

# Copyright 2018 Jared Boice (MIT License / Open Source)

# List-Runner Documentation

## Description

**List-Runner** is a lightweight _linked-list_ implementation that offers both _Singly_ _(next)_ 
and _Doubly_ data structures _(next and previous)_.

Nodes are referred to as cells and the list is referred to as a stem.

Singly cell instances have getNext() and setNext() functions. 
Doubly cell instances additionally have getPrev() and setPrev() functions.
All other operations are controlled by the Stem instance. There are two types of stems for both singly and doubly data structures.

## Summary

find "consumption model" to see the consumable methods for each class.

## Install, Import && Instantiate

**Install**

npm install --save list-runner

**Import**

_importing the commonly needed classes_
  + import { CellSingly, CellDoubly, StemSingly, StemDoubly } from 'list-runner';

_importing the constants_
  + import { SENTINEL, CELL, SINGLY, DOUBLY } from 'list-runner';

_importing the sidekick functions
  + import { initializeStem, findForward, findBackward, loopForward, loopBackward, countForward, countBackward } from 'list-runner';

_importing less commonly needed classes_
  + import { SentinelSingly, SentinelDoubly } from 'list-runner';

**Instantiate**

_solo instantiation_

const cell = new CellDoubly();
const stem = new StemDoubly(cell);

_connective instantiation_

const cell1 = new CellDoubly();
const cell2 = new CellDoubly();
const cell3 = new CellDoubly();
const stemCells = [cell1, cell2, cell3];
const structureType = DOUBLY;
const stem = initializeStem(stemCells, structureType);

## Classes

### CellSingly

consumption model:
  + methods
    + getNext()

SENTINEL.next --> CELL.next --> CELL.next --> CELL.next --> SENTINEL.next --> null

description: a node that connects uni-directionally to one other node by its next property

**Constructor**

new CellSingly(next)

parameters:
  + next: _(optional: defaults to null)_
  + type: _(not required: defaulted for you by stem modification operations)_

_note_: cells do not require constructor parameters. They can be instantiated and then later linked to other cells at any time. Type can be CELL || SENTINEL || [custom] _(do not use SENTINEL without a full understanding of the codebase)_

**Private Fields**

_note_: the following fields should be considered private. Only modify them with a full undertanding of the codebase.

type: "Sentinel" || "Cell" _(Sentinel cells guard the head and tail of the stem from illegal modifications)_
next: next cell instance

**Public Methods**

getNext(): 
  + description: returns the next cell
  + parameters: none
  + returns: the next cell in the stem

**Private Methods**

_note_: the following methods should be considered private. Only use them with a full undertanding of the codebase.

setNext(cell): 
  + description: sets the next cell
  + parameters: 
    + cell: the next cell to be linked

### CellDoubly

consumption model:
  + methods
    + getNext()
    + getPrev()

null <-- prev.SENTINEL.next <--> prev.CELL.next <--> prev.CELL.next <--> prev.SENTINEL.next --> null

description: a node that connects bi-directionally between two other node by its next and prev properties
inherits: all fields and methods from CellSingly

**Constructor**

new CellDoubly(next, prev)

+ parameters:
  + next: _(optional: defaults to null)_
  + prev: _(optional: defaults to null)_
  + type: _(not required: defaulted for you by stem modification operations)_

_note_: cells do not require constructor parameters. They can be instantiated and then later linked to a stem at any time. Type can be CELL || SENTINEL || [custom] _(do not use SENTINEL without a full understanding of the codebase)_

**Private Fields**

_note_: the following fields should be considered private. Only modify them with a full undertanding of the codebase.

type: "Sentinel" || "Cell" _(Sentinel cells guard the head and tail of the stem from illegal modifications)_
next: next cell instance
prev: previous cell instance 

**Public Methods**

getNext(): 
  + description: returns the next cell
  + parameters: none
  + returns: the next cell in the stem

getPrev(): 
  + description: returns the previous cell
  + parameters: none
  + returns: the previous cell in the stem

**Private Methods**

_note_: the following methods should be considered private. Only use them with a full undertanding of the codebase.

setNext(cell): 
  + description: sets the next cell. 
  + parameters: 
    + cell: the next cell to be linked

setPrev(cell): 
  + description: sets the previous cell
  + parameters: 
    + cell: the previous cell to be linked

### StemSingly

consumption model:
  + methods
    + getHead()
    + interlink(cells)
    + insert(cell)
    + extract(baseline)
    + unshift(cell)
    + shift()
    + replace(cell, baseline)
    + delete(baseline)

SENTINEL.next --> CELL.next --> CELL.next --> CELL.next --> SENTINEL.next --> null

description: a node list that interlinks other nodes by their next properties.

**Constructor**

new StemSingly(head)

parameters:
  + head: the head cell _(required)_

_note_: stems require at least one cell. The head cell can be solo or linked to a chain of cells by its next property.

**Private Fields**

_note_: the following fields should be considered private. Only modify them with a full undertanding of the codebase.

sentinelHead: guards the head of the stem. the next cell is the head
sentinelTail: guards the tail of the stem. the prev cell is the tail

**Public Methods**

getHead():
+ description: returns the cell at the head of the stem
+ parameters: none
+ returns: the head cell

interlink(cells): 
  + description: takes an array of instantiated cells and interlinks them into a stem _(chronologically)_
  + parameters: array of instantiated cells

insert(cell):
  + description: inserts a new cell after baseline and displaces the following cells forward
  + parameters: 
    + cell: new cell to be inserted
    + baseline: the cell preceding the insertion point for the new cell
  + returns: true if successful 
  
extract(baseline):
  + description: extracts the cell after baseline and displaces the following cells backward
  + parameters: 
    + baseline: the cell preceding the extraction point
  + returns: the extracted cell if successful
  
unshift(cell):
  + description: inserts a new cell after sentinelHead and displaces the following cells forward
  + parameters: 
    + cell: the cell to insert
  + returns: true if successful 
  
shift():
  + description: extracts the head of the stem and displaces the following cells backward
  + parameters: none
  + returns: the extracted cell if successful 
  
replace(cell, baseline):
  + description: replaces the cell after baseline with a new cell (no cells are displaced)  
  + parameters: 
    + cell: the replacement cell
    + baseline: the cell preceding the one to be replaced
  + returns: true if successful 
  
delete(baseline):
  + description: severs the entire portion of the stem following baseline  
  + parameters: 
    + baseline: the cell preceding the point of deletion
  returns: true if successful 

**Private Methods** 

_note_: the following methods should be considered private. Only use them with a full undertanding of the codebase.

interlinkNext(cell1, cell2, cell3):
  + description: interlinks the chain of next pointers for the provided cells _(chronologically)_
  + parameters:
    + cell1
    + cell2
    + cell3
  
unlinkNext(cell1, cell3):
  + description: cell2 (the cell between cell1 and cell3) gets dereferenced _(ie. cell2 is deleted from the stem)_
  + parameters:
    + cell1
    + cell3

### StemDoubly

consumption model:
  + methods
    + getHead()
    + interlink(cells)
    + insert(cell)
    + extract(baseline)
    + unshift(cell)
    + shift()
    + push(cell)
    + pop()
    + replace(cell, baseline)
    + delete(baseline)

null <-- prev.SENTINEL.next <--> prev.CELL.next <--> prev.CELL.next <--> prev.SENTINEL.next --> null

description: a node list that interlinks other nodes by their next and prev properties.
inherits: all fields and methods from StemSingly

**Constructor**

new StemDoubly(head)

parameters:
  + head: the head cell _(required)_

**Public Methods** _(in addition to the methods inherited from StemSingly)_

getTail():
+ description: returns the cell at the tail of the stem
+ parameters: none
+ returns: the tail cell

push(cell):
  + description: inserts a new cell after the tail of the stem
  + parameters: 
    + cell: the cell to insert
  + returns: true if successful 

pop():
  + description: extracts the tail of the stem
  + parameters: none
  + returns: the extracted cell if successful 

**Private Methods** 

_note_: the following methods should be considered private. Only use them with a full undertanding of the codebase.

interlinkPrev(cell1, cell2, cell3):
  + description: interlinks the chain of prev pointers for the provided cells _(chronologically)_
  + parameters:
    + cell1
    + cell2
    + cell3
  
unlinkPrev(cell1, cell3):
  + description: cell2 (the cell between cell1 and cell3) gets dereferenced when applied with unlinkNext() 
  + parameters:
    + cell1
    + cell3

### SentinelSingly && SentinelDoubly

_note_: the head doubly sentinel is instantiated with prev pointing to null.
both the singly and doubly tail sentinels are instantiated with next pointing to null. 

_(see codebase)_

## Sidekick _(helper functions)_

interlinkStem():
  + description: takes an array of instantiated cells and interlinks them into a newly instantiated stem
  + parameters: 
    + cells: array of instantiated cells
    + structureType: SINGLY || DOUBLY
  + returns: Stem instance

findForward(baseline, comparator):
  + description: traverses forward through a stem from the provided baseline in search of a specific cell
  + parameters: 
    + baseline: the cell at which to begin the search
    + comparator: custom callback function that returns true || false when comparing a cell for a match against custom criteria
  + returns: found cell || false

function: findBackward(baseline, comparator): _(for doubly structures only)_
  + description: traverses backward through a stem from the provided baseline in search of a specific cell
  + parameters: 
    + baseline: the cell at which to begin the search
    + comparator: custom callback function that returns true || false when comparing a cell for a match against custom criteria
  + returns: found cell || false

loopForward(baseline, callBack, callBackParams):
  + description: traverses forward through a stem and executes a callback _(until the callback returns true or the loop reaches the edge)_
    parameters: 
    + baseline: the cell at which to begin the traversal
    + callBack: custom function that returns true when the traversal should be shortCircuited and terminated
    + callBackParams: the callback function gets passed the current cell and then callBackParams as a 2nd parameter
  + returns: the last cell instance upon loop termination

loopBackward(baseline, callBack, callBackParams): _(for doubly structures only)_
  + description: traverses backward through a stem and executes a callback _(until the callback returns true or the loop reaches the edge)_
    parameters: 
    + baseline: the cell at which to begin the traversal
    + callBack: custom function that returns true when the traversal should be shortCircuited and terminated
    + callBackParams: the callback function gets passed the current cell and then callBackParams as a 2nd parameter
  + returns: the last cell instance upon loop termination

countForward(baseline)
  + description: traverses forward through a stem, starting with baseline, and returns the total count of cells.
  + parameters: 
    + baseline: the cell at which to begin the counting process
  + returns: the total count of all interlinked cells

countBackward(baseline)
  + description: traverses backward through a stem, starting with baseline, and returns the total count of cells.
  + parameters: 
    + baseline: the cell at which to begin the counting process
  + returns: the total count of all interlinked cells