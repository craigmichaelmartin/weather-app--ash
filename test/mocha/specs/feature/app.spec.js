define(function(require) {
    'use strict';

    var App = require('app');
    var AppState = require('models/app');
    var DaysCollection = require('collections/days');
    var HoursCollection = require('collections/hours');

    describe('App', function() {

        it('should be defined', function() {
            expect(App).not.to.be.undefined;
        });

        describe('after being initialized', function() {

            beforeEach(function() {
                this.getDate = Date.prototype.getDate;
                Date.prototype.getDate = sinon.stub().returns(25);
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                    "GET",
                    /api\.wunderground\.com\/api\/3f6df2a3f0916b99\/.*forecast10day\/q/,
                    Helpers.validResponse(Helpers.Fixtures.dailyGeo)
                );
                this.server.respondWith(
                    "GET",
                    /api\.wunderground\.com\/api\/3f6df2a3f0916b99\/hourly10day\/q/,
                    Helpers.validResponse(Helpers.Fixtures.hourlyGeo)
                );
                this.app = new App({
                    hours: new HoursCollection(),
                    days: new DaysCollection(),
                    appState: new AppState({
                        zip: undefined,
                        day: 25,
                        hour: undefined,
                        scale: "english"
                    }),
                    el: $('body')
                });
                this.server.respond();
            });

            afterEach(function() {
                Date.prototype.getDate = this.getDate;
                this.server.restore();
            });
            
            describe('before interacting', function() {
                
                describe('the zip code', function() {

                    it('display should be visible', function() {
                        expect($('.js-zip-display').css('display')).to.equal('inline');
                    });

                    it('input should be hidden', function() {
                        expect($('.js-edit').css('display')).to.equal('none');
                    });

                });

            });

            describe('clicking on a day', function() {

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
                    var attribute = this.app.appState.get('scale') === "english" ? 'temperatureEnglish' : 'temperatureMetric';
                    var daysHours = this.app.hours.byDay(this.app.appState.get('day'));
                    $('.js-hourTemperature').each(function(index, element) {
                        expect(daysHours.models[index].get(attribute)).to.equal(element.textContent.slice(0, -1));
                    }.bind(this));
                });

                it('should update the sidebar with the day\'s statistics', function() {
                    var dayModel = this.app.days.findWhere({day: this.app.appState.get('day')});
                    var statsDayText = $('.js-statistics').children().first().text().trim();
                    var expected = dayModel.get('weekday') + ', ' + dayModel.get('monthname') + ' ' + dayModel.get('day');
                    expect(expected).to.equal(statsDayText);
                });

            });

            describe('clicking on an hour bar', function() {

                beforeEach(function() {
                    this.$clickedHour = $('.js-hourBar').last().click();
                });

                it('should update the app state model', function() {
                    expect(this.app.appState.get('hour')).to.equal(23);
                });

                it('should add the active class to it', function() {
                    expect(this.$clickedHour[0].className.animVal.indexOf('is-active') >= 0).to.be.true;
                });

                it('should result in only one active class', function() {
                    expect($('.hourBar.is-active').length).to.equal(1);
                });

                it('should update the sidebar with the hours\'s statistics', function() {
                    var hoursCollection = this.app.hours.byDay(this.app.appState.get('day'));
                    var hourModel = hoursCollection.findWhere({hour: this.app.appState.get('hour')});
                    var statsHourText = $('.js-statistics').children().first().text().trim();
                    var expected = hourModel.get('weekday') + ', ' + hourModel.get('monthname') + ' ' + hourModel.get('day') + ' at ' + hourModel.get('civil');
                    expect(expected).to.equal(statsHourText);
                });

            });

            describe('clicking on an hour\'s time text', function() {

                beforeEach(function() {
                    this.$clickedHourText = $('.js-hourTime').last().click();
                });

                it('should update the app state model', function() {
                    expect(this.app.appState.get('hour')).to.equal(23);
                });

                it('should add the active class to it\'s bar', function() {
                    var time = this.$clickedHourText.data('time');
                    var el = $("[data-time='" + time +"']")[0];
                    expect(el.className.animVal.indexOf('is-active') >= 0).to.be.true;
                });

                it('should result in only one active class', function() {
                    expect($('.hourBar.is-active').length).to.equal(1);
                });

                it('should update the sidebar with the hours\'s statistics', function() {
                    var hoursCollection = this.app.hours.byDay(this.app.appState.get('day'));
                    var hourModel = hoursCollection.findWhere({hour: this.app.appState.get('hour')});
                    var statsHourText = $('.js-statistics').children().first().text().trim();
                    var expected = hourModel.get('weekday') + ', ' + hourModel.get('monthname') + ' ' + hourModel.get('day') + ' at ' + hourModel.get('civil');
                    expect(expected).to.equal(statsHourText);
                });

            });

            describe('clicking on an hour\'s temperature text', function() {

                beforeEach(function() {
                    this.$clickedHourText = $('.js-hourTemperature').last().click();
                });

                it('should update the app state model', function() {
                    expect(this.app.appState.get('hour')).to.equal(23);
                });

                it('should add the active class to it\'s bar', function() {
                    var time = this.$clickedHourText.data('time');
                    var el = $("[data-time='" + time +"']")[0];
                    expect(el.className.animVal.indexOf('is-active') >= 0).to.be.true;
                });

                it('should result in only one active class', function() {
                    expect($('.hourBar.is-active').length).to.equal(1);
                });

                it('should update the sidebar with the hours\'s statistics', function() {
                    var hoursCollection = this.app.hours.byDay(this.app.appState.get('day'));
                    var hourModel = hoursCollection.findWhere({hour: this.app.appState.get('hour')});
                    var statsHourText = $('.js-statistics').children().first().text().trim();
                    var expected = hourModel.get('weekday') + ', ' + hourModel.get('monthname') + ' ' + hourModel.get('day') + ' at ' + hourModel.get('civil');
                    expect(expected).to.equal(statsHourText);
                });

            });

            describe('clicking on metric', function() {

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

            describe('error messages', function() {

                describe('for zip input', function() {

                    afterEach(function() {
                        $('.js-alertClose').click();
                    });

                    it('should indicate not valid zip', function() {
                        expect(this.app.appState.set({zip: ''}, {validate: true})).to.be.false;
                        expect($('.js-alertText').text().indexOf(this.app.appState.zipNotNumeric)).to.be.above(-1);
                    });

                    it('should indicate non-numeric zip', function() {
                        expect(this.app.appState.set({zip: '1234S'}, {validate: true})).to.be.false;
                        expect($('.js-alertText').text().indexOf(this.app.appState.zipNotNumeric)).to.be.above(-1);
                    });

                    it('should indicate too long zip', function() {
                        expect(this.app.appState.set({zip: 123456}, {validate: true})).to.be.false;
                        expect($('.js-alertText').text().indexOf(this.app.appState.zipNotLength)).to.be.above(-1);
                    });

                    it('should indicate too short zip', function() {
                        expect(this.app.appState.set({zip: 1234}, {validate: true})).to.be.false;
                        expect($('.js-alertText').text().indexOf(this.app.appState.zipNotLength)).to.be.above(-1);
                    });

                    it('should indicate negative zip', function() {
                        expect(this.app.appState.set({zip: -1000}, {validate: true})).to.be.false;
                        expect($('.js-alertText').text().indexOf(this.app.appState.zipNotLength)).to.be.above(-1);
                    });

                });

                describe('for day input', function() {

                    beforeEach(function() {
                        this.getDate = Date.prototype.getDate;
                        Date.prototype.getDate = sinon.stub().returns(25);
                    });

                    afterEach(function() {
                        Date.prototype.getDate = this.getDate;
                    });

                    it('should indicate day is too far out', function() {
                        expect(this.app.appState.set({ zip: 44147, day: 100 }, {validate: true})).to.be.false;
                        expect($('.js-alertText').text().indexOf(this.app.appState.dayNotNear)).to.be.above(-1);
                    });

                    it('should indicate day is too far out', function() {
                        expect(this.app.appState.set({ zip: 44147, day: 15 }, {validate: true})).to.be.false;
                        expect($('.js-alertText').text().indexOf(this.app.appState.dayNotNear)).to.be.above(-1);
                    });

                });

                describe('for hour input', function() {

                    beforeEach(function() {
                        this.getDate = Date.prototype.getDate;
                        Date.prototype.getDate = sinon.stub().returns(25);
                        this.getHours = Date.prototype.getHours;
                        Date.prototype.getHours = sinon.stub().returns(12);
                    });

                    afterEach(function() {
                        Date.prototype.getDate = this.getDate;
                        Date.prototype.getHours = this.getHours;
                    });

                    it('should indicate cannot have hour without day', function() {
                        expect(this.app.appState.set({ zip: 44147, day: void 0, hour: 13 }, {validate: true})).to.be.false;
                        expect($('.js-alertText').text().indexOf(this.app.appState.hourNeedsDay)).to.be.above(-1);
                    });

                    it('should indicate hour is not valid', function() {
                        expect(this.app.appState.set({ zip: 44147, day: 25, hour: 100 }, {validate: true})).to.be.false;
                        expect($('.js-alertText').text().indexOf(this.app.appState.hourNotValid)).to.be.above(-1);
                    });

                    it('should indicate hour is not valid for today', function() {
                        expect(this.app.appState.set({ zip: 44147, day: 25, hour: 10 }, {validate: true})).to.be.false;
                        expect($('.js-alertText').text().indexOf(this.app.appState.hourNotValidToday)).to.be.above(-1);
                    });

                });

                describe('for scale input', function() {

                    it('should return an error message for invalid scale', function() {
                        expect(this.app.appState.set({ zip: 44147, scale: 'kelvin' }, {validate: true})).to.be.false;
                        expect($('.js-alertText').text().indexOf(this.app.appState.scaleNotValid)).to.be.above(-1);
                    });

                });

            });

            describe('changing zip code', function() {

                beforeEach(function() {
                    this.$zipDisplay = $('.js-zip-display').click();
                });

                it('should hide the display', function() {
                    expect(this.$zipDisplay.css('display')).to.equal('none');
                });

                it('should show the input', function() {
                    expect($('.js-edit').css('display')).to.equal('inline-block');
                });

                describe('validation', function() {

                    describe('with errors', function() {

                        it('should indicate invalid for no value', function() {
                            $('.js-edit').val('').trigger('keyup');
                            expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                        });

                        it('should indicate invalid for non-numeric', function() {
                            $('.js-edit').val('12A65').trigger('keyup');
                            expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                        });

                        it('should indicate invalid for invalidly long length', function() {
                            $('.js-edit').val('123456').trigger('keyup');
                            expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                        });

                        it('should indicate invalid for invalidly short length', function() {
                            $('.js-edit').val('1234').trigger('keyup');
                            expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                        });

                        it('should indicate invalid for negative', function() {
                            $('.js-edit').val('-1234').trigger('keyup');
                            expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                        });

                    });

                    describe('without errors', function() {

                        beforeEach(function() {
                            $('.js-edit').val('44023').trigger('keyup');
                        });

                        it('should not indicate invalid input', function() {
                            expect($('.js-edit').hasClass('is-invalid')).to.be.false;
                        });

                        describe('when submitted', function() {

                            before(function() {
                                // record the number of requests with zip 44023
                                this.hourRequests = _.where(this.server.requests, {
                                    url: 'http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/44023.json'
                                });
                                this.dayRequests = _.where(this.server.requests, {
                                    url: 'http://api.wunderground.com/api/3f6df2a3f0916b99/forecast10day/q/44023.json'
                                });

                                // less precise
                                this.serverRequests = this.server.requests.length;
                            });

                            beforeEach(function() {
                                // these pass but don't really check accurately because changed validateZip
                                $('.js-edit').focusout();
                                this.server.respond();
                            });

                            it('should hide the input', function() {
                                expect($('.js-edit').css('display')).to.equal('none');
                            });

                            it('should show the display', function() {
                                expect($('.js-zip-display').css('display')).to.equal('inline');
                            });

                            it('should set the appState', function() {
                                expect(this.app.appState.get('zip')).to.equal(44023);
                            });

                            it('should fetch the new forecast', function() {
                                var hourRequests = _.where(this.server.requests, {
                                    url: 'http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/44023.json'
                                });
                                var dayRequests = _.where(this.server.requests, {
                                    url: 'http://api.wunderground.com/api/3f6df2a3f0916b99/forecast10day/q/44023.json'
                                });

                                // using the before count, we can ensure there was a new fetch
                                // once the zip was changed
                                expect(hourRequests.length).to.equal(this.hourRequests.length + 1);
                                expect(dayRequests.length).to.equal(this.dayRequests.length + 1);
                                expect(this.server.requests.length).to.be.above(this.serverRequests);
                            });

                        });
                    });
                });
            });
        });
    });
});
