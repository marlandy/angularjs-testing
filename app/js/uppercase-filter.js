'use strict';

(function () {
    var module = angular.module('app.uppercase-filter', []);

    module.filter('uppercase', function () {
        return function (text) {
            return String(text).toUpperCase();
        };
    });
})();
