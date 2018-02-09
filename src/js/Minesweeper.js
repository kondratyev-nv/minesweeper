'use strict';

var Tile = require('./Tile.js');
var Event = require('./Event.js');
var Utilities = require('./Utilities.js');

function Minesweeper(field) {
    this.field = field;
    this.marksLeft = field.numberOfMines();

    this.onMineFound = Event();
    this.onTileOpened = Event();
    this.onMarkTile = Event();
    this.onUnmarkTile = Event();
    this.onWin = Event();
};

Minesweeper.prototype.width = function () {
    return this.field.width();
};

Minesweeper.prototype.height = function () {
    return this.field.height();
};

Minesweeper.prototype.getTotalMinesCount = function () {
    return this.field.numberOfMines();
};

Minesweeper.prototype.getMarkInfo = function () {
    return {
        left: this.marksLeft,
        total: this.getTotalMinesCount()
    };
};

Minesweeper.prototype.canOpen = function (x, y) {
    return 0 <= x && x < this.width() && 0 <= y && y < this.height();
};

Minesweeper.prototype.open = function (x, y) {
    if (this.canOpen(x, y)) {
        if (this.field.at(x, y).isOpened()) {
            return;
        }
        var value = this.field.at(x, y).open();
        if (value < 0) {
            this.onMineFound.notify(x, y);
            for (var i = 0; i < this.height(); ++i) {
                for (var j = 0; j < this.width(); ++j) {
                    this.open(j, i);
                }
            }
        } else {
            this.onTileOpened.notify(x, y, value);
            if (value === 0) {
                this.field.getNeightboursOf(x, y)
                    .filter(neighbour => !neighbour.isMarked())
                    .forEach(neighbour => this.open(neighbour.x, neighbour.y));
            }
        }
        this.checkComplete();
    }
};

Minesweeper.prototype.toggleMark = function (x, y) {
    if (!this.canOpen(x, y)) {
        return;
    }
    if (this.field.at(x, y).isOpened()) {
        return;
    }
    if (this.field.at(x, y).isMarked()) {
        this.field.at(x, y).unmark();
        this.marksLeft += 1;
        this.onUnmarkTile.notify(x, y);
    } else if (this.marksLeft > 0) {
        this.field.at(x, y).mark();
        this.marksLeft -= 1;
        this.onMarkTile.notify(x, y);
        this.checkComplete();
    }
};

Minesweeper.prototype.checkComplete = function () {
    if (this.marksLeft !== 0) {
        return;
    }
    var openCount = 0;
    for (var x = 0; x < this.width(); ++x) {
        for (var y = 0; y < this.height(); ++y) {
            if (this.field.at(x, y).isMarked() && this.field.at(x, y).value >= 0) {
                return;
            }
            if (this.field.at(x, y).isOpened()) {
                openCount++;
            }
        }
    }
    if (openCount === this.width() * this.height() - this.getTotalMinesCount()) {
        this.onWin.notify();
    }
};

module.exports = Minesweeper;
