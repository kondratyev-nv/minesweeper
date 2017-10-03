'use strict';

module.exports = function (x, y, value) {
    var marked = false;
    var opened = false;
    return {
        x: x,
        y: y,
        value: value,
        open: function () {
            marked = false;
            opened = true;
            return this.value;
        },
        isOpened: function () {
            return opened;
        },
        mark: function () {
            marked = true;
        },
        unmark: function () {
            marked = false;
        },
        isMarked: function () {
            return marked;
        }
    };
};
