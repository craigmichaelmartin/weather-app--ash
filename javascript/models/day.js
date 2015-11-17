define([
    'models/model'
], function (Model) {

    'use strict';

    var Day = Model.extend({

        defaultKeys: [
            'condition', 'iconUrl', 'iconAlt', 'high', 'low', 'monthname',
            'weekday', 'weekdayShort', 'day', 'totalSnow', 'averageHumidity',
            'averageWindDirection', 'averageWind', 'percipitation'
        ],

        defaults: function () {
            var defaults = {};
            this.defaultKeys.forEach(function (key) {
                defaults[key] = void 0;
            });
            return defaults;
        },

        buildUrl: function (zip) {
            return 'http://api.wunderground.com/api/3f6df2a3f0916b99/hourly/q/' + (zip || 'autoip') + '.json';
        },

        parse: function (results) {
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            return {
                condition: results.conditions,
                iconUrl: results.icon_url,
                iconAlt: results.icon,
                high: results.high.fahrenheit,
                low: results.low.fahrenheit,
                monthname: results.date.monthname,
                weekday: results.date.weekday,
                weekdayShort: results.date.weekday_short,
                day: +results.date.day,
                totalSnow: results.snow_allday.in,
                averageHumidity: results.avehumidity,
                averageWindDirection: results.avewind.dir,
                averageWind: results.avewind.mph,
                percipitation: results.qpf_allday.in,
            };
            // jscs:enabled requireCamelCaseOrUpperCaseIdentifiers
        }

    });

    return Day;
});
