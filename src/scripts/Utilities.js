'use strict';

module.exports = {
    getRandomInteger: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
};
