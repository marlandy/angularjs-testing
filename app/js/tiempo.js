'use strict';

(function () {
    var module = angular.module('app.tiempo', []);

    module.factory('TiempoService', ['$http', '$q', function ($http, $q) {

            var servicio = {
                getTiempo: function (ciudad) {
                    var deferred = $q.defer();
                    $http.get("http://api.openweathermap.org/data/2.5/weather", {
                        "params": {"q": ciudad + ',ES'}
                    }).success(function (data) {
                        deferred.resolve(data.main);
                    }).error(function () {
                        deferred.reject({"temp": "ERROR temp!", "temp_min": "ERROR temp_min!", "temp_max": "ERROR temp_max!", "humidity": "ERROR humidity!"});
                    });
                    return deferred.promise;
                }
            };
            return servicio;
        }]);

    module.controller('TiempoController', ['$scope', 'TiempoService', function ($scope, TiempoService) {

            $scope.ciudad = '';

            $scope.data = {
                "temp": "",
                "temp_min": "",
                "temp_max": "",
                "humidity": ""
            };

            function obtenerTiempo() {
                TiempoService.getTiempo($scope.ciudad).then(function (weatherData) {
                    $scope.data = weatherData;
                }, function (errorData) {
                    $scope.data = errorData;
                });
            }

            $scope.obtenerTiempo = obtenerTiempo;

        }]);
})();
