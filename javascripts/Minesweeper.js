
'use strict';

function Tile() {
  this.value  = 0;
  this.marked = false;
  this.opened = false;
}

Tile.prototype.open = function() {
  this.opened = true;
  return this.value;
}

Tile.prototype.mark = function() {
  this.marked = true;
}

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
  this.generate();
}

Minesweeper.prototype.open = function(x, y) {
  if (0 <= x && x < this.w && 0 <= y && y < this.h) {
    if(this.map[x][y].open() === -1) {
      this.on_mine_open(x, y);
    } else {
      this.on_tile_open(x, y, this.map[x][y].value);
    }
  }
};

Minesweeper.prototype.on_mine_open = function(x, y) {
};

Minesweeper.prototype.on_tile_open = function(x, y, value) {
};

Minesweeper.prototype.mark = function(x, y) {
  if (0 <= x && x < this.w && 0 <= y && y < this.h) {
    this.map[x][y].mark();
  }
};

Minesweeper.prototype.is_complete = function() {
  var count = 0;
  for (var i = 0; i < w; ++i) {
    for (var j = 0; j < h; ++j) {
      if (this.map[i][j].marked === true) {
        count++;
        if (this.map[i][j].value !== -1) {
          return false;
        }
      }
    }
  }
  return true;
};

Minesweeper.prototype.increment = function(x, y) {
  if (0 <= x && x < this.w && 0 <= y && y < this.h && this.map[x][y] !== -1) {
    this.map[x][y].value += 1;
  }
};

Minesweeper.prototype.place = function(x, y) {
  this.map[x][y].value = -1;

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
    if(this.map[x][y].value !== -1) {
      this.place(x, y);
      i += 1;
    }
  }
};
