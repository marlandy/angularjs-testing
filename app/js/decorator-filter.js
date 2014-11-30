'use strict';

(function () {
    var module = angular.module('app.decorator-filter', []);

    module.filter('decorator', function () {
        return function (text) {
            return '**' + String(text).toUpperCase();
        };
    });
})();