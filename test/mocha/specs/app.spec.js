define(function(require) {
    'use strict';

    var App = require('app');
    var AppState = require('models/app');
    var Backbone = require('backbone');
    var DaysCollection = require('collections/days');
    var HoursCollection = require('collections/hours');

    var should = chai.should();

    describe('App', function() {

        it('should be defined', function() {
            expect(App).not.to.be.undefined;
        });

        describe('after initializing', function() {

            beforeEach(function() {
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                    "GET",
                    "http://api.wunderground.com/api/3f6df2a3f0916b99/geolookup/forecast10day/q/autoip.json",
                    Helpers.validResponse(Helpers.Fixtures.dailyGeo)
                );
                this.server.respondWith(
                    "GET",
                    "http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/autoip.json",
                    Helpers.validResponse(Helpers.Fixtures.hourlyGeo)
                );
                this.app = new App({
                    hours: new HoursCollection(),
                    days: new DaysCollection(),
                    appState: new AppState(),
                    el: $('body')
                });
                this.server.respond();
            });

            afterEach(function() {
                this.server.restore();
            });

            //it('should have current el', function() {
            //    expect(this.app.$el.selector).to.equal('.js-weatherApp');
            //});

            it("should have made the correct requests", function() {
                expect(this.server.requests.length).to.equal(2);
                expect(this.server.requests[0].method).to.equal("GET");
                expect(this.server.requests[0].url).to.equal(
                    "http://api.wunderground.com/api/3f6df2a3f0916b99/geolookup/forecast10day/q/autoip.json"
                );
                expect(this.server.requests[1].method).to.equal("GET");
                expect(this.server.requests[1].url).to.equal(
                    "http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/autoip.json"
                );
            });

            it("should have an is-something class describing the condition", function() {
                expect(this.app.$el.hasClass('is-clear')).to.be.true;
            });

        });
    });
});
