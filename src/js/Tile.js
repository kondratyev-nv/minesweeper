'use strict';

module.exports = function (value) {
    var marked = false;
    var opened = false;
    return {
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
