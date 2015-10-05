define(function(require) {
    'use strict';

    var ChartView = require('components/chart');

    describe('Chart view', function() {

        it('should be defined', function() {
            expect(ChartView).not.to.be.undefined;
        });

        describe('after being initialized', function() {

            beforeEach(function() {
                ChartView.prototype.render = sinon.stub().returns(this);
            });

            describe('the getHourFromTime function', function() {

                it('should correctly handle AM', function() {
                    expect(ChartView.prototype.getHourFromTime('1 AM')).to.equal(1);
                });

                it('should correctly handle PM', function() {
                    expect(ChartView.prototype.getHourFromTime('5 PM')).to.equal(17);
                });
            });

        });
    });
});
