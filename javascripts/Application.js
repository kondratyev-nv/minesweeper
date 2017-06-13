'use strict';

(function (fieldWidth, fieldHeight, numberOfMines) {
    var canvas = document.getElementById('minesweeper-canvas');

    var minesweeper = new Minesweeper(fieldWidth, fieldHeight, numberOfMines);

    var controller = new MouseControlHandler(canvas, fieldWidth, fieldHeight);
    controller.openTile.add(minesweeper.open, minesweeper);
    controller.markTile.add(minesweeper.toggleMark, minesweeper);

    var view = new View(canvas, document.getElementById('minesweeper-status'), minesweeper);
}(10, 10, 10));
