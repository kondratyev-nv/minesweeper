'use strict';

var Tile = require('./Tile.js');

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
            return shifts.filter(shift => canOpen(x + shift[0], y + shift[1]))
                .map(shift => map[x + shift[0]][y + shift[1]]);
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
