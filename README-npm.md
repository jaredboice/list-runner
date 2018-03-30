

# Copyright 2018 Jared Boice (MIT License / Open Source)

# List-Runner Documentation SUMMARIZED

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
`import { CellSingly, CellDoubly, StemSingly, StemDoubly } from 'list-runner';`

_importing the constants_  
`import { SENTINEL, CELL, SINGLY, DOUBLY } from 'list-runner';`

_importing the sidekick functions  
`import { initializeStem, findForward, findBackward, loopForward, loopBackward, countForward, countBackward } from 'list-runner';`

_importing less commonly needed classes_  
`import { SentinelSingly, SentinelDoubly } from 'list-runner';`

**Instantiate**

_solo instantiation_

`const cell = new CellDoubly();    
const stem = new StemDoubly(cell);`

_connective instantiation_

`const cell1 = new CellDoubly();    
const cell2 = new CellDoubly();    
const cell3 = new CellDoubly();    
const stemCells = [cell1, cell2, cell3];    
const structureType = DOUBLY;    
const stem = initializeStem(stemCells, structureType);`

## Classes

### CellSingly

consumption model:
  + methods
    + getNext()

SENTINEL.next --> CELL.next --> CELL.next --> CELL.next --> SENTINEL.next --> null

**Constructor**

new CellSingly(next)

_note_: cells do not require constructor parameters. They can be instantiated and then later linked to other cells at any time. Type can be CELL || SENTINEL || [custom] _(do not use SENTINEL without a full understanding of the codebase)_

### CellDoubly

consumption model:
  + methods
    + getNext()
    + getPrev()

null <-- prev.SENTINEL.next <--> prev.CELL.next <--> prev.CELL.next <--> prev.SENTINEL.next --> null

**Constructor**

new CellDoubly(next, prev)

_note_: cells do not require constructor parameters. They can be instantiated and then later linked to a stem at any time. Type can be CELL || SENTINEL || [custom] _(do not use SENTINEL without a full understanding of the codebase)_

### StemSingly

class: StemSingly
  + description:  a node list that interlinks other nodes by their next properties. controls a system of cells interlinked within cells interlinked within cells interlinked within one stem. each cell contains methods for accessing next
  + constructor: 
    + head: starting cell for the stem-cell sequence

consumption model:
  + methods
    + getHead()
    + interlink(cells)
    + insert(cell, baseline)
    + extract(baseline)
    + unshift(cell)
    + shift()
    + replace(cell, baseline)
    + delete(baseline)

SENTINEL.next --> CELL.next --> CELL.next --> CELL.next --> SENTINEL.next --> null

**Constructor**

new StemSingly(head)

parameters:
  + head: the head cell _(required)_

_note_: stems require at least one cell. The head cell can be solo or linked to a chain of cells by its next property.

### StemDoubly

class: StemDoubly
  + description:  a node list that interlinks other nodes by their next and prev properties. controls a system of cells interlinked within cells interlinked within cells interlinked within one stem. each cell contains methods for accessing prev and next
  + constructor: 
    + head: starting cell for the stem-cell sequence

consumption model:
  + methods
    + getHead()
    + interlink(cells)
    + insert(cell, baseline)
    + extract(baseline)
    + unshift(cell)
    + shift()
    + push(cell)
    + pop()
    + replace(cell, baseline)
    + delete(baseline)

null <-- prev.SENTINEL.next <--> prev.CELL.next <--> prev.CELL.next <--> prev.SENTINEL.next --> null

**Constructor**

new StemDoubly(head)

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