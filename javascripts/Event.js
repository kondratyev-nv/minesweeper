'use strict';

function Event() {
    this.listeners = [];
}

Event.prototype = {
    constructor: Event,
    add: function(listener, scope) {
        if (typeof listener === "function") {
            this.listeners.push({
                fn: listener,
                scope: scope
            });
        }
    },
    remove: function(listener) {
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i].fn === listener) {
                this.listeners.splice(i, 1);
                break;
            }
        }
    },
    notify: function() {
        for (var i = 0; i < this.listeners.length; i++) {
            var handler = this.listeners[i];
            handler.fn.apply(handler.scope, arguments);
        }
    }
};
