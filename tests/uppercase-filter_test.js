'use strict';

describe('Modulo app.uppercase-filter', function () {
    
    beforeEach(function(){
        module('app.uppercase-filter');
    });

    describe('Filtro uppercase', function () {
        it('debe transformar en mayusculas cualquier string', inject(function (uppercaseFilter) {
            var input = 'someThing';
            var expectedOutput = 'SOMETHING';
            expect(uppercaseFilter(input)).toEqual(expectedOutput);
        }));
    });
});