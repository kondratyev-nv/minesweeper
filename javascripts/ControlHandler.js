'use strict';

function ControlHandler() {
    this.openTile = Event();
    this.markTile = Event();
}

ControlHandler.prototype = {
    constructor: ControlHandler,
    openTile: null,
    markTile: null,
};
