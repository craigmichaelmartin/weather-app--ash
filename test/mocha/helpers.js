define([
    '../../test/mocha/fixtures/specific_forecast10day',
    '../../test/mocha/fixtures/specific_hourly10day',
    '../../test/mocha/fixtures/nonspecific_forecast10day',
    '../../test/mocha/fixtures/nonspecific_hourly10day'
], function(SpecificDailyFixture, SpecificHourlyFixture,
            NonspecificDailyFixture, NonspecificHourlyFixture) {

    'use strict';

    var Helpers = {};

    Helpers.validResponse = function(responseText) {
        return [
            200,
            {"Content-Type": "application/json"},
            JSON.stringify(responseText)
        ];
    };

    Helpers.Fixtures = {
        dailyWithZip: SpecificDailyFixture,
        hourlyWithZip: SpecificHourlyFixture,
        dailyGeo: NonspecificDailyFixture,
        hourlyGeo: NonspecificHourlyFixture
    };

    return Helpers;
});
