define(function(require) {
    'use strict';

    var ChartView = require('components/chart');
    var AppStateModel = require('models/app');

    describe('Chart view', function() {

        it('should be defined', function() {
            expect(ChartView).not.to.be.undefined;
        });

        describe('after being initialized', function() {

            beforeEach(function() {
                this.appState = new AppStateModel();
                ChartView.prototype.render = sinon.stub().returns(this);
                this.chart = new ChartView({appState: this.appState});
            });

            describe('the getHourFromTime function', function() {

                it('should correctly handle midnight', function() {
                    expect(this.chart.getHourFromTime('12 AM')).to.equal(0);
                });

                it('should correctly handle noon', function() {
                    expect(this.chart.getHourFromTime('12 PM')).to.equal(12);
                });

                it('should correctly handle AM', function() {
                    expect(this.chart.getHourFromTime('1 AM')).to.equal(1);
                });

                it('should correctly handle PM', function() {
                    expect(this.chart.getHourFromTime('5 PM')).to.equal(17);
                });
            });

            describe('the event listeners', function() {

                describe('for appState model', function() {

                    it('should correctly respond to dataReady', function() {
                        this.appState.trigger('dataReady');
                        // useing called twice because initialize calls it once
                        expect(this.chart.render.calledTwice).to.be.true;
                    });

                    it('should correctly respond to changing day', function() {
                        this.appState.trigger('change:day');
                        // useing called twice because initialize calls it once
                        expect(this.chart.render.calledTwice).to.be.true;
                    });

                    it('should correctly respond to changing hour', function() {
                        this.appState.trigger('change:hour');
                        // useing called twice because initialize calls it once
                        expect(this.chart.render.calledTwice).to.be.true;
                    });

                    it('should correctly respond to changing scale', function() {
                        this.appState.trigger('change:scale');
                        // useing called twice because initialize calls it once
                        expect(this.chart.render.calledTwice).to.be.true;
                    });

                });
            });
        });
    });
});
