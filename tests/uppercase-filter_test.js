'use strict';

describe('app.uppercase-filter module', function () {
    beforeEach(module('app.uppercase-filter'));

    describe('uppercase filter', function () {
        it('should uppercase strings', inject(function (uppercaseFilter) {
            expect(uppercaseFilter('someThing')).toEqual('SOMETHING');
        }));
    });
});