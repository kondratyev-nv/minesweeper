
module.exports = function () {
    'use strict';

    var listeners = [];
    return {
        add: function (listener, scope) {
            if (typeof listener !== "function") {
                throw new Error("could not add non-function listener");
            }
            listeners.push({
                fn: listener,
                scope: scope
            });
        },
        remove: function (listener) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i].fn === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        },
        notify: function () {
            for (var i = 0; i < listeners.length; i++) {
                var handler = listeners[i];
                handler.fn.apply(handler.scope, arguments);
            }
        }
    };
};
