'use strict';

require("../styles/stylesheet.css");

var Field = require('./Field.js');
var Minesweeper = require('./Minesweeper.js');
var MouseControlHandler = require('./MouseControlHandler.js');
var View = require('./View.js');
var Utilities = require('./Utilities.js');

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
