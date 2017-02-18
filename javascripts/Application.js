'use strict';

function Application(w, h, n) {
    var canvas = document.getElementById('minesweeper-canvas');

    var minesweeper = new Minesweeper(w, h, n);

    var controller = new MouseControlHandler(canvas, w, h);
    controller.openTile.add(minesweeper.open, minesweeper);
    controller.markTile.add(minesweeper.toogleMark, minesweeper);

    var view = new View(canvas, document.getElementById('minesweeper-status'), minesweeper);
}

var application = new Application(10, 10, 10);
