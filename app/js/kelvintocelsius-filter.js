'use strict';

(function () {
    var module = angular.module('app.kelvintocelsius-filter', []);

    module.filter('kelvin2celsius', function () {
        return function (kelvin) {
            if (isNaN(parseFloat(kelvin))) {
                return '';
            } else {
                return parseFloat((kelvin - 273.15).toFixed(2));
            }
        };
    });
})();