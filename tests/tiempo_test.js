'use strict';

describe('Modulo app.tiempo', function () {

    beforeEach(function () {
        module('app.tiempo');
    });

    describe('Tiempo service', function () {

        var tiempoService, $httpBackend;

        beforeEach(function () {
            inject(['TiempoService', '$httpBackend', function (service, _$httpBackend_) {
                    tiempoService = service;
                    $httpBackend = _$httpBackend_;
                }
            ]);
        });

        it('debe devolver los datos del tiempo', function () {
            $httpBackend.whenGET("http://api.openweathermap.org/data/2.5/weather?q=Madrid,ES").
                    respond({
                        "main":{"temp":277.745,"temp_min":268.33,"temp_max":287.1,"humidity":99}
                    });
                    
            var promise = tiempoService.getTiempo('Madrid');
            var infoTiempo;
            promise.then(function(datos) {
                infoTiempo = datos;
            });
            $httpBackend.flush();
            expect(infoTiempo).toBeDefined();
            expect(infoTiempo.temp).toBe(277.745);
            expect(infoTiempo.temp_min).toBe(268.33);
            expect(infoTiempo.temp_max).toBe(287.1);
            expect(infoTiempo.humidity).toBe(99);
        });
        
        it('debe devolver error si los datos no son correctos', function () {
            $httpBackend.whenGET("http://api.openweathermap.org/data/2.5/weather?q=COSA_RARA,ES").
                    respond(500);
                    
            var promise = tiempoService.getTiempo('COSA_RARA');
            var infoTiempo;
            promise.then(function(datos) {
                infoTiempo = datos;
            }, function(error) {
                infoTiempo = error;
            });
            $httpBackend.flush();
            expect(infoTiempo).toBeDefined();
            expect(infoTiempo.temp).toBe("ERROR temp!");
            expect(infoTiempo.temp_min).toBe("ERROR temp_min!");
            expect(infoTiempo.temp_max).toBe("ERROR temp_max!");
            expect(infoTiempo.humidity).toBe("ERROR humidity!");
        });
    });

    describe('Tiempo controller', function () {

        var $scope, $qObject;

        beforeEach(function () {
            module(function ($provide) {
               $provide.value('MockedTiempoService', {'getTiempo': function () {
                       var deferred = $qObject.defer();
                        deferred.resolve({
                            "temp" : 33,
                            "temp_min": 22,
                            "temp_max" : 44,
                            "humidity" : 73
                        });
                        return deferred.promise;                       
                    }});
            });
        });

        beforeEach(inject(function ($rootScope, $q) {
            $scope = $rootScope.$new();
            $qObject = $q;
        }));

        it('debe inicializar los valores', inject(function ($controller, MockedTiempoService) {
            $controller('TiempoController', {'$scope': $scope, 'TiempoService': MockedTiempoService});
            expect($controller).toBeDefined();
            expect($scope.ciudad).toBe("");
            expect($scope.data).toBeDefined();
            expect($scope.data.temp).toBe("");
            expect($scope.data.temp_min).toBe("");
            expect($scope.data.temp_max).toBe("");
            expect($scope.data.humidity).toBe("");
            expect(typeof $scope.obtenerTiempo).toBe("function");
        }));
        
        it('debe exponer los datos del tiempo', inject(function ($controller, MockedTiempoService) {
            $controller('TiempoController', {'$scope': $scope, 'TiempoService': MockedTiempoService});
            $scope.obtenerTiempo();  
            $scope.$digest(); 
            expect($scope.data.temp).toBe(33);
            expect($scope.data.temp_min).toBe(22);
            expect($scope.data.temp_max).toBe(44);
            expect($scope.data.humidity).toBe(73);
        }));

    });

});