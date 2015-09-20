
'use strict';

var canvas = document.getElementById('minesweeper-canvas');
var ctx = canvas.getContext('2d');
var cw = canvas.clientWidth;
var ch = canvas.clientHeight;
var nx = 10;
var ny = 10;
var controller = new MouseControlHandler(canvas, nx, ny);
var minesweeper = new Minesweeper(nx, ny, 10);
minesweeper.onMineFound.add(onMineFound, this);
minesweeper.onTileOpened.add(onTileOpened, this);
minesweeper.onMarkTile.add(onMarkTile, this);
minesweeper.onUnmarkTile.add(onUnmarkTile, this);
minesweeper.onWin.add(function() {
  showMessage("You won!");
}, this);

controller.openTile.add(minesweeper.open, minesweeper);
controller.markTile.add(minesweeper.toogleMark, minesweeper);

drawMesh(ctx, canvas.width, canvas.height, (canvas.width / nx), (canvas.height / ny));

function showMessage(message) {
  var status = document.getElementById('minesweeper-status');
  status.innerHTML = message;
}

function showMarkInfo() {
  var markInfo = minesweeper.getMarkInfo();
  showMessage("Marks left: " + markInfo.left + " of " + markInfo.total);
}

function drawMesh(ctx, w, h, hx, hy) {
  ctx.strokeStyle = "#b5e853";
  for (var x = 0; x <= w; x += hx) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (var y = 0; y <= h; y += hy) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
  showMarkInfo();
}

function onMineFound(x, y) {
  var p = getPosition(x, y);
  ctx.fillStyle = "#ff0000";
  ctx.clearRect(p.x, p.y, p.w, p.h);
  ctx.fillRect(p.x, p.y, p.w, p.h);
  ctx.stroke();
  showMessage("You lost!");
}

function onTileOpened(x, y, value) {
  var p = getPosition(x, y);
  ctx.fillStyle = "#b5e853";
  ctx.font = "20pt Lucida Console";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.clearRect(p.x, p.y, p.w, p.h);
  ctx.fillText(value, p.x + p.w / 2, p.y + p.h / 2);
  ctx.stroke();
}

function onMarkTile(x, y) {
  var p = getPosition(x, y);
  ctx.fillStyle = "#ff0000";
  ctx.font = "bold 24pt Lucida Console";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.clearRect(p.x, p.y, p.w, p.h);
  ctx.fillText("M", p.x + p.w / 2, p.y + p.h / 2);
  ctx.stroke();
  showMarkInfo();
}

function onUnmarkTile(x, y) {
  var p = getPosition(x, y);
  ctx.clearRect(p.x, p.y, p.w, p.h);
  ctx.stroke();
  showMarkInfo();
}

function getPosition(x, y) {
  var W = (canvas.width / nx);
  var H = (canvas.height / ny);
  var X = x * W;
  var Y = y * H;
  return {
    x: X,
    y: Y,
    w: W,
    h: H
  };
}
