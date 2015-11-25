define(function(require) {
    "use strict";

    var getTemperature = require('util/get_temperature');

    describe('get temperature', function() {

        it('should return english when passed in english and asked for english', function() {
            expect(getTemperature('english', 32)).to.eql('32');
        });

        it('should return english to x digits when passed in english and asked for english to x digits', function() {
            expect(getTemperature('english', 32, 2)).to.eql('32.00');
        });

        it('should return metric when passed in english and asked for metric', function() {
            expect(getTemperature('metric', 32)).to.eql('0');
        });

        it('should return metric to x digits when passed in english and asked for metric to x digits', function() {
            expect(getTemperature('metric', 32, 2)).to.eql('0.00');
        });

        it('should throw an exception if scale is not either english or spanish', function() {
            expect(getTemperature.bind(null, 'kelvin', 0, 2)).to.throw(/Cannot convert to scale "kelvin"/);
        });
    });
});
