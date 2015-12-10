define(function(require) {
    "use strict";

    var timeUtils = require('util/time');

    describe('Time util', function() {

        var hours = [
            '0', '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12', '13', '14', '15',
            '16', '17', '18', '19', '20', '21', '22', '23'
        ];

        var hours12Notation = [
            '12:00 am', '1:00 am', '2:00 am', '3:00 am', '4:00 am', '5:00 am', '6:00 am', '7:00 am',
            '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm',
            '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm'
        ];

        var hours12NotationNoMinutes = [
            '12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am',
            '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm',
            '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm'
        ];


        describe('get scaled time', function() {

            describe('for english', function() {

                describe('with no options', function() {

                    it('should return times from string hour', function() {
                        hours.forEach(function(hour, index) {
                            expect(timeUtils.getScaledTime('english', hour)).to.equal(hours12Notation[index]);
                        });
                    });

                    it('should return times from number hour', function() {
                        hours.forEach(function(hour, index) {
                            expect(timeUtils.getScaledTime('english', index)).to.equal(hours12Notation[index]);
                        });
                    });

                });

                describe('with option to hide minutes', function() {

                    it('should return times from string hour', function() {
                        hours.forEach(function(hour, index) {
                            expect(timeUtils.getScaledTime('english', hour, {hideMinutes: true})).to.equal(hours12NotationNoMinutes[index]);
                        });
                    });

                    it('should return times from number hour', function() {
                        hours.forEach(function(hour, index) {
                            expect(timeUtils.getScaledTime('english', hour, {hideMinutes: true})).to.equal(hours12NotationNoMinutes[index]);
                        });
                    });
                });

            });

            describe('for metric', function() {

                describe('with no options', function() {

                    it('should return times from string hour', function() {
                        hours.forEach(function(hour, index) {
                            expect(timeUtils.getScaledTime('metric', hour)).to.equal(hour + ':00');
                        });
                    });

                    it('should return times from number hour', function() {
                        hours.forEach(function(hour, index) {
                            expect(timeUtils.getScaledTime('metric', index)).to.equal(hour + ':00');
                        });
                    });

                });

                describe('with option to hide minutes', function() {

                    it('should return times from string hour', function() {
                        hours.forEach(function(hour, index) {
                            expect(timeUtils.getScaledTime('metric', hour, {hideMinutes: true})).to.equal(hour);
                        });
                    });

                    it('should return times from number hour', function() {
                        hours.forEach(function(hour, index) {
                            expect(timeUtils.getScaledTime('metric', index, {hideMinutes: true})).to.equal(hour);
                        });
                    });

                });

            });

        });

    });

});
