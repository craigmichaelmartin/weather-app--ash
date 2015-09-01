define([
    '../../test/mocha/fixtures/specific_forecast10day',
    '../../test/mocha/fixtures/specific_hourly10day'
], function(SpecificDailyFixture, SpecificHourlyFixture) {

    var Helpers = {};

    Helpers.validResponse = function(responseText) {
        return [
            200,
            {"Content-Type": "application/json"},
            JSON.stringify(responseText)
        ];
    };

    Helpers.Fixtures = {
        daily: SpecificDailyFixture,
        hourly: SpecificHourlyFixture
    };

    return Helpers;
});
