'use strict';

var ControlHandler = require('./ControlHandler.js')

function MouseControlHandler(canvas, nx, ny) {
    this.canvas = canvas;
    this.nx = nx;
    this.ny = ny;
    this.cw = this.canvas.clientWidth;
    this.ch = this.canvas.clientHeight;
    this.canvas.addEventListener('click', event => this.onLeftButtonClick(event), false);
    this.canvas.addEventListener('contextmenu', event => {
        event.preventDefault();
        this.onRightButtonClick(event);
    }, false);
}

MouseControlHandler.prototype = new ControlHandler();

MouseControlHandler.prototype.constructor = MouseControlHandler;

MouseControlHandler.prototype.getTile = function (x, y) {
    return {
        x: (this.nx * x / this.cw) | 0,
        y: (this.ny * y / this.ch) | 0
    };
}

MouseControlHandler.prototype.onLeftButtonClick = function (event) {
    var x = event.offsetX;
    var y = event.offsetY;
    var tile = this.getTile(x, y);
    this.openTile.notify(tile.x, tile.y);
};

MouseControlHandler.prototype.onRightButtonClick = function (event) {
    var x = event.offsetX;
    var y = event.offsetY;
    var tile = this.getTile(x, y);
    this.markTile.notify(tile.x, tile.y);
};

module.exports = MouseControlHandler;
