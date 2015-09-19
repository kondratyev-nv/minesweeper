
'use strict';

function MouseControlHandler(canvas, nx, ny) {
  this.canvas = canvas;
  this.nx = nx;
  this.ny = ny;
  this.cw = this.canvas.clientWidth;
  this.ch = this.canvas.clientHeight;
  this.canvas.addEventListener('click', this.onLeftButtonClick.bind(this),
    false);
  this.canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    this.onRightButtonClick(event);
  }.bind(this), false);
}

MouseControlHandler.prototype = new ControlHandler();

MouseControlHandler.prototype.constructor = MouseControlHandler;

MouseControlHandler.prototype.getTile = function(x, y) {
  return {
    x: (this.nx * x / this.cw) | 0,
    y: (this.ny * y / this.ch) | 0
  };
}

MouseControlHandler.prototype.onLeftButtonClick = function(event) {
  var x = event.offsetX;
  var y = event.offsetY;
  var tile = this.getTile(x, y);
  this.openTile.notify(tile.x, tile.y);
};

MouseControlHandler.prototype.onRightButtonClick = function(event) {
  var x = event.offsetX;
  var y = event.offsetY;
  var tile = this.getTile(x, y);
  this.markTile.notify(tile.x, tile.y);
};
