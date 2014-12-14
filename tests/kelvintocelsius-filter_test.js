'use strict';

describe('Modulo app.kelvintocelsius-filter', function () {
    
    beforeEach(function(){
        module('app.kelvintocelsius-filter');
    });

    describe('Filtro kelvin a celsius', function () {
        it('debe transformar los grados kelvin en celsius', 
                inject(function (kelvin2celsiusFilter) {
            expect(kelvin2celsiusFilter("293.25")).toEqual(20.1);
            expect(kelvin2celsiusFilter(" ")).toEqual("");
            expect(kelvin2celsiusFilter("kk")).toEqual("");
        }));
    });
});