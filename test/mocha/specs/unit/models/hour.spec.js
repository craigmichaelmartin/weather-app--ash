define(function (require) {
    'use strict';

    var HourModel = require('models/hour');

    describe('Hours model', function () {

        it('should be defined', function () {
            expect(HourModel).not.to.be.undefined;
        });

        it('should parse values correctly', function () {
            var parsed = HourModel.prototype.parse(Helpers.Fixtures.hourlyGeo.hourly_forecast[0]); //jscs:ignore
            HourModel.prototype.defaultKeys.forEach(function (key) {
                expect(parsed[key]).not.to.be.undefined;
            });
        });
    });
});
