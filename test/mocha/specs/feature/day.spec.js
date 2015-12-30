define(function(require) {
    'use strict';

    var tempUtils = require('util/temperature');

    describe('App after loading', function() {

        beforeEach(function() {
            sinon.stub(Date.prototype, 'getDate').returns(25);
            sinon.stub(Date.prototype, 'getHours').returns(12);
            this.server = Helpers.createServer();
            this.app = Helpers.createApp();
            this.app.fetchForecastData();
            this.server.respond();
        });

        afterEach(function() {
            Date.prototype.getDate.restore();
            Date.prototype.getHours.restore();
            this.server.restore();
        });
        
        describe('interacting with a day', function() {

            beforeEach(function() {
                this.$clickedDay = $('.js-day').last().click();
            });

            it('should update the app state model', function() {
                expect(this.app.appState.get('day')).to.equal(1);
            });

            it('should add the active class to it', function() {
                expect(this.$clickedDay.hasClass('is-active')).to.be.true;
            });

            it('should result in only one active class', function() {
                expect($('.day.is-active').length).to.equal(1);
            });

            it('should update the chart with the day\'s hours', function() {
                var daysHours = this.app.hours.byDay(this.app.appState.get('day'));
                $('.js-hourTemperature').each(function(index, element) {
                    var temperature = tempUtils.getScaledTemperature(this.app.appState.get('scale'), daysHours.models[index].get('temperature'));
                    expect(temperature).to.equal(element.textContent.slice(0, -1));
                }.bind(this));
            });

            it('should update the sidebar with the day\'s statistics', function() {
                var dayModel = this.app.days.findWhere({day: this.app.appState.get('day')});
                var statsDayText = $('.js-statistics').children().first().text().trim();
                var expected = dayModel.get('weekday') + ', ' + dayModel.get('monthname') + ' ' + dayModel.get('day');
                expect(expected).to.equal(statsDayText);
            });

        });

    });
});
