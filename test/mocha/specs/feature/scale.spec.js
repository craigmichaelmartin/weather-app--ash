define(function(require) {
    'use strict';

    describe('App after loading', function() {

        beforeEach(function() {
            sinon.stub(Date.prototype, 'getDate').returns(25);
            sinon.stub(Date.prototype, 'getHours').returns(12);
            this.server = Helpers.createServer();
            this.app = Helpers.createApp();
            this.server.respond();
        });

        afterEach(function() {
            Date.prototype.getDate.restore();
            Date.prototype.getHours.restore();
            this.server.restore();
        });
        
        describe('interacting with the scale', function() {

            describe('specifically metric', function() {

                beforeEach(function() {
                    this.$metric = $('.js-metric').click();
                });

                it('should add the active class to it', function() {
                    expect(this.$metric.hasClass('active')).to.be.true;
                });

                it('should result in only one active class', function() {
                    expect($('.scale-button.active').length).to.equal(1);
                });

                it('should change the day\'s temperatures to metric', function() {
                    var test = $('.js-dayHighTemperature').first().text();
                    var actual = this.app.days.models[0].get('highMetric') + '°'
                    expect(test).to.equal(actual);
                });

                it('should change the hours temperatures to metric', function() {
                    var test = $('.js-hourTemperature').first().text();
                    var actual = this.app.hours.byDay(this.app.appState.get('day')).models[0].get('temperatureMetric') + '°'
                    expect(test).to.equal(actual);
                });
            
                it('should change the day statistics temperatures to metric', function() {
                    var test = $('.js-dayStatisticsHigh').text();
                    var day = this.app.days.findWhere({day: this.app.appState.get('day')});
                    var actual = day.get('highMetric') + '°C';
                    expect(test).to.equal(actual);
                });

                it('should change the hour statistics temperatures to metric', function() {
                    $('.js-hourBar').first().click();
                    var test = $('.js-hourStatisticsTemperature').text();
                    var actual = this.app.hours.byDay(this.app.appState.get('day')).models[0].get('temperatureMetric') + '°C'
                    expect(test).to.equal(actual);
                });

            });
        
        });
    });
});
