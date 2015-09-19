
'use strict';

function Tile() {
  this.value  = 0;
  this.marked = false;
  this.opened = false;
}

Tile.prototype.open = function() {
  this.marked = false;
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
  this.shifts = [[-1,-1],[-1,0],[-1,1],
                 [0,-1],[0,1],
                 [1,-1],[1,0],[1,1]];
  this.generate();
}

Minesweeper.prototype.open = function(x, y) {
  if (0 <= x && x < this.w && 0 <= y && y < this.h) {
    if (this.map[x][y].opened === true) {
      return;
    }
    var value = this.map[x][y].open();
    if(value === -1) {
      this.on_mine_open(x, y);
    } else {
      this.on_tile_open(x, y, value);
      if (value === 0) {
        var self = this;
        this.shifts.forEach(function(shift) {
          self.open(x + shift[0], y + shift[1]);
        });
      }
    }
    this.is_complete();
  }
};

Minesweeper.prototype.on_mine_open = function(x, y) {
};

Minesweeper.prototype.on_tile_open = function(x, y, value) {
};

Minesweeper.prototype.on_tile_mark = function(x, y) {
};

Minesweeper.prototype.on_win = function() {
};


Minesweeper.prototype.mark = function(x, y) {
  if (0 <= x && x < this.w && 0 <= y && y < this.h) {
    if (this.map[x][y].marked === true || this.map[x][y].opened === true) {
      return;
    }
    this.map[x][y].mark();
    this.on_tile_mark(x, y);
    this.is_complete();
  }
};

Minesweeper.prototype.is_complete = function() {
  var markCount = 0;
  var openCount = 0;
  for (var i = 0; i < this.w; ++i) {
    for (var j = 0; j < this.h; ++j) {
      if (this.map[i][j].marked === true) {
        markCount++;
        if (this.map[i][j].value !== -1) {
          return;
        }
      }
      if (this.map[i][j].opened === true) {
        openCount++;
      }
    }
  }
  if(markCount === this.n &&
     openCount === this.w * this.h - this.n) {
    this.on_win();
  }
};

Minesweeper.prototype.increment = function(x, y) {
  if (0 <= x && x < this.w && 0 <= y && y < this.h && this.map[x][y].value !== -1) {
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
  while(i < this.n) {
    var x = getRandomInteger(0, this.w);
    var y = getRandomInteger(0, this.h);
    if(this.map[x][y].value !== -1) {
      this.place(x, y);
      i += 1;
    }
  }
};
