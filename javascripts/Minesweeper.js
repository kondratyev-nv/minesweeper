
'use strict';

function Minesweeper(w, h, n) {
  this.w = w;
  this.h = h;
  this.n = n;
  this.map = [];
  for (var i = 0; i < w; ++i) {
    this.map[i] = [];
    for (var j = 0; j < h; ++j) {
      this.map[i][j] = 0;
    }
  }
  this.marks = [];
  for (var i = 0; i < w; ++i) {
    this.marks[i] = [];
    for (var j = 0; j < h; ++j) {
      this.marks[i][j] = 0;
    }
  }
  this.generate();
}

Minesweeper.prototype.open = function(x, y) {
  if (0 <= x && x < this.w && 0 <= y && y < this.h) {
    if(this.map[x][y] === -1) {
      this.on_mine_open(x, y);
    } else {
      this.on_tile_open(x, y, this.map[x][y]);
    }
  }
};

Minesweeper.prototype.on_mine_open = function(x, y) {
};

Minesweeper.prototype.on_tile_open = function(x, y, value) {
};

Minesweeper.prototype.mark = function(x, y) {
  if (0 <= x && x < this.w && 0 <= y && y < this.h) {
    return this.mark[x][y] = 1;
  }
};

Minesweeper.prototype.is_complete = function() {
  var count = 0;
  for (var i = 0; i < w; ++i) {
    for (var j = 0; j < h; ++j) {
      if (this.marks[i][j] === 1) {
        count++;
        if (this.map[i][j] !== -1) {
          return false;
        }
      }
    }
  }
  return true;
};

Minesweeper.prototype.increment = function(x, y) {
  if (0 <= x && x < this.w && 0 <= y && y < this.h && this.map[x][y] !== -1) {
    this.map[x][y] += 1;
  }
};

Minesweeper.prototype.place = function(x, y) {
  this.map[x][y] = -1;

  this.increment(x - 1, y - 1);
  this.increment(x - 1, y);
  this.increment(x - 1, y + 1);

  this.increment(x, y - 1);
  this.increment(x, y + 1);

  this.increment(x + 1, y + 1);
  this.increment(x + 1, y);
  this.increment(x + 1, y - 1);
};

Minesweeper.prototype.generate = function() {
  var i = 0;
  while(i < this.n) {
    var x = getRandomInteger(0, this.w);
    var y = getRandomInteger(0, this.h);
    if(this.map[x][y] !== -1) {
      this.place(x, y);
      i += 1;
    }
  }
};