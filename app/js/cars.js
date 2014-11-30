'use strict';

(function () {
    var module = angular.module('app.cars', []);

    module.factory('CarsService', function () {

        var cars = [
            createCar('volkswagen', 'golf', '2.0 TDI 150CV'),
            createCar('ford', 'focus', '1.8 TDCI 115CV')
        ];

        function createCar(brand, model, engine) {
            return {
                brand: brand,
                model: model,
                engine: engine
            };
        }

        function getCars() {
            return cars;
        }

        return {
            getAll: getCars
        };
    });

    module.controller('CarsController', ['$scope', 'CarsService', function ($scope, CarsService) {
            $scope.cars = CarsService.getAll();
        }]);        
})();
