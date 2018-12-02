'use strict';

function View(canvas, statusText, minesweeper) {
    this.canvas = canvas;
    this.statusText = statusText;
    this.ctx = canvas.getContext('2d');
    this.minesweeper = minesweeper;
    this.w = minesweeper.width();
    this.h = minesweeper.height();
    this.n = minesweeper.getTotalMinesCount();
    
    minesweeper.onMineFound.add((x, y) => this.onMineFound(x, y));
    minesweeper.onTileOpened.add((x, y, v) => this.fillTile(x, y, v, "#b5e853"));
    minesweeper.onMarkTile.add((x, y) => this.fillTile(x, y, "📍"));
    minesweeper.onUnmarkTile.add((x, y) => this.clearTile(x, y));
    minesweeper.onWin.add(() => this.showMessage("You won! 🎉"));
    
    this.drawMesh(this.canvas.width, this.canvas.height,
        (this.canvas.width / this.w), (this.canvas.height / this.h));
};

View.prototype.showMessage = function (message) {
    this.statusText.innerHTML = message;
};

View.prototype.showMarkInfo = function () {
    var markInfo = this.minesweeper.getMarkInfo();
    this.showMessage("Marks left: " + markInfo.left + " of " + markInfo.total);
};

View.prototype.drawMesh = function (w, h, hx, hy) {
    this.ctx.strokeStyle = "#b5e853";
    this.ctx.lineWidth = 2;
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
    var w = (this.canvas.width / this.w);
    var h = (this.canvas.height / this.h);
    return {
        x: x * w,
        y: y * h,
        w: w,
        h: h
    };
};

View.prototype.onMineFound = function (x, y) {
    this.fillTile(x, y, "💥");
    this.showMessage("You lost!");
};

View.prototype.fillTile = function (x, y, value, color = "#000000") {
    var p = this.getPosition(x, y);
    this.ctx.fillStyle = color;
    this.ctx.font = "bold 30px Monaco, \"Bitstream Vera Sans Mono\", \"Lucida Console\", Terminal, monospace";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.clearRect(p.x, p.y, p.w, p.h);
    this.ctx.fillText(value, p.x + p.w / 2, p.y + p.h / 2);
    this.ctx.stroke();
    this.showMarkInfo();
};

View.prototype.clearTile = function (x, y) {
    var p = this.getPosition(x, y);
    this.ctx.clearRect(p.x, p.y, p.w, p.h);
    this.ctx.stroke();
    this.showMarkInfo();
};

module.exports = View;
