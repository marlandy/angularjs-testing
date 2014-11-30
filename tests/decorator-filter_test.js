'use strict';

describe('Modulo app.decorator-filter', function () {
    
    beforeEach(function(){
        module('app.decorator-filter');
    });

    describe('Filtro decorator', function () {
        it('debe transformar en mayusculas cualquier string y anteponer asteriscos', inject(function (decoratorFilter) {
            var input = 'someThing';
            var expectedOutput = '**SOMETHING';
            expect(decoratorFilter(input)).toEqual(expectedOutput);
        }));
    });
});