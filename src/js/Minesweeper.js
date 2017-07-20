'use strict';

var Tile = require('./Tile.js');
var Event = require('./Event.js');
var Utilities = require('./Utilities.js');

function Minesweeper(width, height, numberOfMines) {
    this.width = width;
    this.height = height;
    this.numberOfMines = numberOfMines;
    this.map = [];
    for (var i = 0; i < width; ++i) {
        this.map[i] = [];
        for (var j = 0; j < height; ++j) {
            this.map[i][j] = Tile(0);
        }
    }
    this.shifts = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];
    this.generate();
    this.marksLeft = numberOfMines;

    this.onMineFound = Event();
    this.onTileOpened = Event();
    this.onMarkTile = Event();
    this.onUnmarkTile = Event();
    this.onWin = Event();
}

Minesweeper.prototype.getWidth = function () {
    return this.width;
};

Minesweeper.prototype.getHeight = function () {
    return this.height;
};

Minesweeper.prototype.getTotalMinesCount = function () {
    return this.numberOfMines;
};

Minesweeper.prototype.getMarkInfo = function () {
    return {
        left: this.marksLeft,
        total: this.numberOfMines
    };
};

Minesweeper.prototype.canOpen = function (x, y) {
    return 0 <= x && x < this.width && 0 <= y && y < this.height;
}

Minesweeper.prototype.open = function (x, y) {
    if (this.canOpen(x, y)) {
        if (this.map[x][y].isOpened() === true) {
            return;
        }
        var value = this.map[x][y].open();
        if (value === -1) {
            this.onMineFound.notify(x, y);
        } else {
            this.onTileOpened.notify(x, y, value);
            if (value === 0) {
                var self = this;
                this.shifts.forEach(function (shift) {
                    self.open(x + shift[0], y + shift[1]);
                });
            }
        }
        this.checkComplete();
    }
};

Minesweeper.prototype.toggleMark = function (x, y) {
    if (this.canOpen(x, y)) {
        if (this.map[x][y].isOpened() === true) {
            return;
        }
        if (this.map[x][y].isMarked() === true) {
            this.map[x][y].unmark();
            this.marksLeft += 1;
            this.onUnmarkTile.notify(x, y);
        } else if (this.marksLeft > 0) {
            this.map[x][y].mark();
            this.marksLeft -= 1;
            this.onMarkTile.notify(x, y);
            this.checkComplete();
        }
    }
};

Minesweeper.prototype.checkComplete = function () {
    if (this.marksLeft !== 0) {
        return;
    }
    var openCount = 0;
    for (var i = 0; i < this.width; ++i) {
        for (var j = 0; j < this.height; ++j) {
            if (this.map[i][j].isMarked() === true && this.map[i][j].value !== -1) {
                return;
            }
            if (this.map[i][j].isOpened() === true) {
                openCount++;
            }
        }
    }
    if (openCount === this.width * this.height - this.numberOfMines) {
        this.onWin.notify();
    }
};

Minesweeper.prototype.increment = function (x, y) {
    if (this.canOpen(x, y) && this.map[x][y].value !== -1) {
        this.map[x][y].value += 1;
    }
};

Minesweeper.prototype.place = function (x, y) {
    this.map[x][y].value = -1;

    var self = this;
    this.shifts.forEach(function (shift) {
        self.increment(x + shift[0], y + shift[1]);
    });
};

Minesweeper.prototype.generate = function () {
    var i = 0;
    while (i < this.numberOfMines) {
        var x = Utilities.getRandomInteger(0, this.width);
        var y = Utilities.getRandomInteger(0, this.height);
        if (this.map[x][y].value !== -1) {
            this.place(x, y);
            i += 1;
        }
    }
};

module.exports = Minesweeper;
