define(function(require) {
    'use strict';

    var HourModel = require('models/hour');

    describe('Hours model', function() {

        it('should be defined', function() {
            expect(HourModel).not.to.be.undefined;
        });

        describe('after being initialized', function() {

            beforeEach(function() {
                this.hour = new HourModel();
            });

            it("should parse values correctly", function() {
                var parsed = this.hour.parse(Helpers.Fixtures.hourlyGeo.hourly_forecast[0]);
                this.hour.defaultKeys.forEach(function(key) {
                    expect(parsed[key]).not.to.be.undefined;
                });
            });

        });
    });
});
