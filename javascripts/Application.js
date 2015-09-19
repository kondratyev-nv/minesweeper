
'use strict';

var canvas = document.getElementById('snake-canvas');
var ctx = canvas.getContext('2d');
canvas.addEventListener('click', onClick, false);
var cw = canvas.clientWidth;
var ch = canvas.clientHeight;
var nx = 10;
var ny = 10;
var minesweeper = new Minesweeper(nx, ny, 10);
drawMesh(ctx, canvas.width, canvas.height, (canvas.width / nx), (canvas.height / ny));

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
}

function fillTile(tile) {
  var p = getPosition(tile.x, tile.y);
  if (minesweeper.try(tile.x, tile.y) === true) {
    ctx.fillStyle = "red";
    ctx.fillRect(p.x, p.y, p.w, p.h);
  } else {
    ctx.fillStyle = "#b5e853";
    ctx.fillText(minesweeper.get(tile.x, tile.y), p.x + p.w / 2, p.y + p.h / 2);
  }
  ctx.stroke();
}

function getTile(x, y) {
  return {
    x: (nx * x / cw) | 0,
    y: (ny * y / ch) | 0
  };
}

function onClick(event) {
  var x = event.offsetX,
    y = event.offsetY;
  var tile = getTile(x, y);
  fillTile(tile);
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
