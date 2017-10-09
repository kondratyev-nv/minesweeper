'use strict';

var Event = require('./Event.js');

function ControlHandler() {
    this.openTile = Event();
    this.markTile = Event();
}

ControlHandler.prototype = {
    constructor: ControlHandler,
    openTile: null,
    markTile: null,
};

module.exports = ControlHandler;
