'use strict';

function Tile() {
    this.value = 0;
    this.marked = false;
    this.opened = false;
}

Tile.prototype.open = function () {
    this.marked = false;
    this.opened = true;
    return this.value;
}

Tile.prototype.mark = function () {
    this.marked = true;
}

Tile.prototype.unmark = function () {
    this.marked = false;
}
