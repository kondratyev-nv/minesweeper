
'use strict';

var canvas = document.getElementById('minesweeper-canvas');
var ctx = canvas.getContext('2d');
canvas.addEventListener('click', openTile, false);
canvas.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  markTile(e);
});
var cw = canvas.clientWidth;
var ch = canvas.clientHeight;
var nx = 10;
var ny = 10;
var minesweeper = new Minesweeper(nx, ny, 10);
minesweeper.onTileOpened = onTileOpened;
minesweeper.onMineFound = onMineFound;
minesweeper.onMarkTile = onMarkTile;
minesweeper.onUnmarkTile = onUnmarkTile;
minesweeper.onWin = function() {
  showMessage("You won!");
};
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

function getTile(x, y) {
  return {
    x: (nx * x / cw) | 0,
    y: (ny * y / ch) | 0
  };
}

function openTile(event) {
  var x = event.offsetX;
  var y = event.offsetY;
  var tile = getTile(x, y);
  minesweeper.open(tile.x, tile.y);
}

function markTile(event) {
  var x = event.offsetX;
  var y = event.offsetY;
  var tile = getTile(x, y);
  minesweeper.toogleMark(tile.x, tile.y);
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
