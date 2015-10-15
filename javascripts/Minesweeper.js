'use strict';

function Minesweeper(w, h, n) {
    this.w = w;
    this.h = h;
    this.n = n;
    this.map = [];
    for (var i = 0; i < w; ++i) {
        this.map[i] = [];
        for (var j = 0; j < h; ++j) {
            this.map[i][j] = new Tile();
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
    this.marksLeft = n;

    this.onMineFound = new Event();
    this.onTileOpened = new Event();
    this.onMarkTile = new Event();
    this.onUnmarkTile = new Event();
    this.onWin = new Event();
}

Minesweeper.prototype.getWidth = function() {
    return this.w;
};

Minesweeper.prototype.getHeight = function() {
    return this.h;
};

Minesweeper.prototype.getTotalMinesCount = function() {
    return this.n;
};

Minesweeper.prototype.getMarkInfo = function() {
    return {
        left: this.marksLeft,
        total: this.n
    };
};

Minesweeper.prototype.canOpen = function(x, y) {
    return 0 <= x && x < this.w && 0 <= y && y < this.h;
}

Minesweeper.prototype.open = function(x, y) {
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
                this.shifts.forEach(function(shift) {
                    self.open(x + shift[0], y + shift[1]);
                });
            }
        }
        this.checkComplete();
    }
};

Minesweeper.prototype.toogleMark = function(x, y) {
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

Minesweeper.prototype.checkComplete = function() {
    if (this.marksLeft !== 0) {
        return;
    }
    var openCount = 0;
    for (var i = 0; i < this.w; ++i) {
        for (var j = 0; j < this.h; ++j) {
            if (this.map[i][j].isMarked() === true && this.map[i][j].value !== -1) {
                return;
            }
            if (this.map[i][j].isOpened() === true) {
                openCount++;
            }
        }
    }
    if (openCount === this.w * this.h - this.n) {
        this.onWin.notify();
    }
};

Minesweeper.prototype.increment = function(x, y) {
    if (this.canOpen(x, y) && this.map[x][y].value !== -1) {
        this.map[x][y].value += 1;
    }
};

Minesweeper.prototype.place = function(x, y) {
    this.map[x][y].value = -1;

    var self = this;
    this.shifts.forEach(function(shift) {
        self.increment(x + shift[0], y + shift[1]);
    });
};

Minesweeper.prototype.generate = function() {
    var i = 0;
    while (i < this.n) {
        var x = getRandomInteger(0, this.w);
        var y = getRandomInteger(0, this.h);
        if (this.map[x][y].value !== -1) {
            this.place(x, y);
            i += 1;
        }
    }
};
