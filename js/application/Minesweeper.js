'use strict';

var canvas = document.getElementById('snake-canvas');
var ctx = canvas.getContext('2d');
canvas.addEventListener('click', onClick, false);
var cw = canvas.clientWidth;
var ch = canvas.clientHeight;
var nx = 20;
var ny = 20;

function drawMesh(ctx, w, h, hx, hy) {
    for (var x = 0; x <= w; x += hx) {
        ctx.moveTo(x, 0);
        ctx.fillText(x / hx, x, 10);
        ctx.lineTo(x, h);
    }
    for (var y = 0; y <= h; y += hy) {
        ctx.moveTo(0, y);
        ctx.fillText(y / hy, 0, y + 10);
        ctx.lineTo(w, y);
    }
    ctx.stroke();
}

drawMesh(ctx, canvas.width, canvas.height, (canvas.width / nx), (canvas.height / ny));

function fillTile(map, tile) {
    if(map[tile.x][tile.y] === -1) {
        ctx.fillStyle = "red";
    }
    else {
        ctx.fillStyle = "green";
    }
    var p = getPosition(tile.x, tile.y);
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.stroke();
}

function getTile(x, y) {
    return {
        x: (nx * x / cw) | 0, 
        y: (ny * y / ch) | 0
    };
}

var map = [[]];
initializeMap(map, nx, ny);

function onClick(event) {
    var x = event.offsetX,
        y = event.offsetY;
    var tile = getTile(x, y);
    fillTile(map, tile);
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

// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
    
function increment(map, x, y) {
    if(x < 0) {
        return;
    }
    if(x >= map.length) {
        return;
    }
    if(y < 0) {
        return;
    }
    if(y >= map[x].length) {
        return;
    }
    if(map[x][y] === -1) {
        return;
    } else {
        map[x][y] += 1;
    }
}
    
function placeMine(map, x, y, w, h) {
    map[x][y] = -1;
    increment(map, x - 1, y - 1);
    increment(map, x - 1, y);
    increment(map, x + 1, y + 1);
    increment(map, x + 1, y);
    increment(map, x + 1, y - 1);
    increment(map, x, y - 1);
    increment(map, x - 1, y + 1);
    increment(map, x, y + 1);
}
    
function initializeMap(map, w, h) {
    for(var i = 0; i < w; ++i) {
        map[i] = [];
        for(var j = 0; j < h; ++j) {
            map[i][j] = 0;
        }
    }
    for(var i = 0; i < 10; ++i) {
        var x = getRandomInt(0, w),
            y = getRandomInt(0, h);
        $('#itemsCollected').html($('#itemsCollected').html() + "<div>" + x + " " + y + "</div>");
        placeMine(map, x, y, w, h);
    }
    for(var i = 0; i < w; ++i) {
        for(var j = 0; j < h; ++j) {
            var position = getPosition(i, j);
            ctx.fillText(map[i][j], position.x + position.w / 2, position.y + position.h / 2);
        }
    }
}