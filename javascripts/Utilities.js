'use strict';

// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
