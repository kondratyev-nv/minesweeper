'use strict';

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
    minesweeper.onWin.add(function() {
        this.showMessage("You won!");
    }, this);
    this.drawMesh(this.ctx, this.canvas.width, this.canvas.height, (this.canvas.width / this.w), (this.canvas.height / this.h));
};

View.prototype.showMessage = function(message) {
    this.status_div.innerHTML = message;
};

View.prototype.showMarkInfo = function() {
    var markInfo = this.minesweeper.getMarkInfo();
    this.showMessage("Marks left: " + markInfo.left + " of " + markInfo.total);
};

View.prototype.drawMesh = function(ctx, w, h, hx, hy) {
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

View.prototype.getPosition = function(x, y) {
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

View.prototype.onMineFound = function(x, y) {
    var p = this.getPosition(x, y);
    this.ctx.fillStyle = "#ff0000";
    this.ctx.clearRect(p.x, p.y, p.w, p.h);
    this.ctx.fillRect(p.x, p.y, p.w, p.h);
    this.ctx.stroke();
    this.showMessage("You lost!");
};

View.prototype.onTileOpened = function(x, y, value) {
    var p = this.getPosition(x, y);
    this.ctx.fillStyle = "#b5e853";
    this.ctx.font = "20pt Lucida Console";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.clearRect(p.x, p.y, p.w, p.h);
    this.ctx.fillText(value, p.x + p.w / 2, p.y + p.h / 2);
    this.ctx.stroke();
};

View.prototype.onMarkTile = function(x, y) {
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

View.prototype.onUnmarkTile = function(x, y) {
    var p = this.getPosition(x, y);
    this.ctx.clearRect(p.x, p.y, p.w, p.h);
    this.ctx.stroke();
    this.showMarkInfo();
};
