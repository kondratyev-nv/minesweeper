/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (x, y, value) {
    var marked = false;
    var opened = false;
    return {
        x: x,
        y: y,
        value: value,
        open: function () {
            marked = false;
            opened = true;
            return this.value;
        },
        isOpened: function () {
            return opened;
        },
        mark: function () {
            marked = true;
        },
        unmark: function () {
            marked = false;
        },
        isMarked: function () {
            return marked;
        }
    };
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {


module.exports = function () {
    'use strict';

    var listeners = [];
    return {
        add: function (listener, scope) {
            if (typeof listener !== "function") {
                throw new Error("could not add non-function listener");
            }
            listeners.push({
                fn: listener,
                scope: scope
            });
        },
        remove: function (listener) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i].fn === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        },
        notify: function () {
            for (var i = 0; i < listeners.length; i++) {
                var handler = listeners[i];
                handler.fn.apply(handler.scope, arguments);
            }
        }
    };
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    getRandomInteger: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Field = __webpack_require__(4);
var Minesweeper = __webpack_require__(5);
var MouseControlHandler = __webpack_require__(6);
var View = __webpack_require__(8);
var Utilities = __webpack_require__(2);

(function (width, height, numberOfMines) {
    var canvas = document.getElementById('minesweeper-canvas');

    var field = Field(width, height,
        numberOfMines, Utilities.getRandomInteger);
    var minesweeper = new Minesweeper(field);

    var controller = new MouseControlHandler(canvas, width, height);
    controller.openTile.add(minesweeper.open, minesweeper);
    controller.markTile.add(minesweeper.toggleMark, minesweeper);

    var view = new View(canvas,
        document.getElementById('minesweeper-status'),
        minesweeper);
}(10, 10, 10));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Tile = __webpack_require__(0);

module.exports = function (width, height, numberOfMines, randomIntegerProvider) {
    var shifts = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];
    var canOpen = function (x, y) {
        return 0 <= x && x < width && 0 <= y && y < height;
    };
    var increment = function (x, y) {
        if (canOpen(x, y) && map[x][y].value >= 0) {
            map[x][y].value += 1;
        }
    };
    var place = function (x, y) {
        map[x][y].value = -1;

        shifts.forEach(function (shift) {
            increment(x + shift[0], y + shift[1]);
        });
    };

    var map = [];
    for (var x = 0; x < width; ++x) {
        map[x] = [];
        for (var y = 0; y < height; ++y) {
            map[x][y] = Tile(x, y, 0);
        }
    }

    var minesPlaced = 0;
    while (minesPlaced < numberOfMines) {
        var x = randomIntegerProvider(0, width);
        var y = randomIntegerProvider(0, height);
        if (map[x][y].value >= 0) {
            place(x, y);
            minesPlaced += 1;
        }
    }

    return {
        at: function (x, y) {
            return map[x][y];
        },
        getNeightboursOf: function (x, y) {
            return shifts.filter(function (shift) {
                return canOpen(x + shift[0], y + shift[1]);
            }).map(function (shift) {
                return map[x + shift[0]][y + shift[1]];
            });
        },
        width: function () {
            return width;
        },
        height: function () {
            return height;
        },
        numberOfMines: function () {
            return numberOfMines;
        }
    };
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Tile = __webpack_require__(0);
var Event = __webpack_require__(1);
var Utilities = __webpack_require__(2);

function Minesweeper(field) {
    this.field = field;
    this.marksLeft = field.numberOfMines();

    this.onMineFound = Event();
    this.onTileOpened = Event();
    this.onMarkTile = Event();
    this.onUnmarkTile = Event();
    this.onWin = Event();
};

Minesweeper.prototype.getWidth = function () {
    return this.field.width();
};

Minesweeper.prototype.getHeight = function () {
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
    return 0 <= x && x < this.getWidth() && 0 <= y && y < this.getHeight();
};

Minesweeper.prototype.open = function (x, y) {
    if (this.canOpen(x, y)) {
        if (this.field.at(x, y).isOpened()) {
            return;
        }
        var value = this.field.at(x, y).open();
        if (value < 0) {
            this.onMineFound.notify(x, y);
        } else {
            this.onTileOpened.notify(x, y, value);
            if (value === 0) {
                var self = this;
                this.field.getNeightboursOf(x, y).forEach(function (neighbour) {
                    self.open(neighbour.x, neighbour.y);
                });
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
    for (var x = 0; x < this.getWidth(); ++x) {
        for (var y = 0; y < this.getHeight(); ++y) {
            if (this.field.at(x, y).isMarked() && this.field.at(x, y).value >= 0) {
                return;
            }
            if (this.field.at(x, y).isOpened()) {
                openCount++;
            }
        }
    }
    if (openCount === this.getWidth() * this.getHeight() - this.getTotalMinesCount()) {
        this.onWin.notify();
    }
};

module.exports = Minesweeper;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlHandler = __webpack_require__(7)

function MouseControlHandler(canvas, nx, ny) {
    this.canvas = canvas;
    this.nx = nx;
    this.ny = ny;
    this.cw = this.canvas.clientWidth;
    this.ch = this.canvas.clientHeight;
    this.canvas.addEventListener('click', this.onLeftButtonClick.bind(this), false);
    this.canvas.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        this.onRightButtonClick(event);
    }.bind(this), false);
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Event = __webpack_require__(1);

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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function View(canvas, status_div, minesweeper) {
    this.canvas = canvas;
    this.status_div = status_div;
    this.ctx = canvas.getContext('2d');
    this.minesweeper = minesweeper;
    this.w = minesweeper.getWidth();
    this.h = minesweeper.getHeight();
    this.n = minesweeper.getTotalMinesCount();
    minesweeper.onMineFound.add(this.onMineFound, this);
    minesweeper.onTileOpened.add(this.onTileOpened, this);
    minesweeper.onMarkTile.add(this.onMarkTile, this);
    minesweeper.onUnmarkTile.add(this.onUnmarkTile, this);
    minesweeper.onWin.add(function () {
        this.showMessage("You won!");
    }, this);
    this.drawMesh(this.ctx, this.canvas.width, this.canvas.height, 
        (this.canvas.width / this.w), (this.canvas.height / this.h));
};

View.prototype.showMessage = function (message) {
    this.status_div.innerHTML = message;
};

View.prototype.showMarkInfo = function () {
    var markInfo = this.minesweeper.getMarkInfo();
    this.showMessage("Marks left: " + markInfo.left + " of " + markInfo.total);
};

View.prototype.drawMesh = function (ctx, w, h, hx, hy) {
    this.ctx.strokeStyle = "#b5e853";
    for (var x = 0; x <= w; x += hx) {
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, h);
    }
    for (var y = 0; y <= h; y += hy) {
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(w, y);
    }
    this.ctx.stroke();
    this.showMarkInfo();
};

View.prototype.getPosition = function (x, y) {
    var W = (this.canvas.width / this.w);
    var H = (this.canvas.height / this.h);
    var X = x * W;
    var Y = y * H;
    return {
        x: X,
        y: Y,
        w: W,
        h: H
    };
};

View.prototype.onMineFound = function (x, y) {
    var p = this.getPosition(x, y);
    this.ctx.fillStyle = "#ff0000";
    this.ctx.clearRect(p.x, p.y, p.w, p.h);
    this.ctx.fillRect(p.x, p.y, p.w, p.h);
    this.ctx.stroke();
    for (var i = 0; i < this.minesweeper.getWidth(); ++i) {
        for (var j = 0; j < this.minesweeper.getHeight(); ++j) {
            this.minesweeper.open(i, j);
        }
    }
    this.showMessage("You lost!");
};

View.prototype.onTileOpened = function (x, y, value) {
    var p = this.getPosition(x, y);
    this.ctx.fillStyle = "#b5e853";
    this.ctx.font = "20pt Lucida Console";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.clearRect(p.x, p.y, p.w, p.h);
    this.ctx.fillText(value, p.x + p.w / 2, p.y + p.h / 2);
    this.ctx.stroke();
};

View.prototype.onMarkTile = function (x, y) {
    var p = this.getPosition(x, y);
    this.ctx.fillStyle = "#ff0000";
    this.ctx.font = "bold 24pt Lucida Console";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.clearRect(p.x, p.y, p.w, p.h);
    this.ctx.fillText("M", p.x + p.w / 2, p.y + p.h / 2);
    this.ctx.stroke();
    this.showMarkInfo();
};

View.prototype.onUnmarkTile = function (x, y) {
    var p = this.getPosition(x, y);
    this.ctx.clearRect(p.x, p.y, p.w, p.h);
    this.ctx.stroke();
    this.showMarkInfo();
};

module.exports = View;


/***/ })
/******/ ]);