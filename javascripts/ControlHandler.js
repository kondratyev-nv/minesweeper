
'use strict';

function ControlHandler() {
    this.openTile = new Event();
    this.markTile = new Event();
}

ControlHandler.prototype = {
    constructor: ControlHandler,
    openTile: null,
    markTile: null,
};
