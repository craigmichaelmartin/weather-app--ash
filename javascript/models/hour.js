define([
    'models/model'
], function (Model) {

    'use strict';

    var Hour = Model.extend({

        defaultKeys: [
            'monthname', 'weekday', 'weekdayShort', 'day', 'hour',
            'condition', 'feelsLike', 'humidity', 'iconUrl', 'iconAlt',
            'temperature', 'dewpoint', 'heatIndex', 'windDirection',
            'windSpeed', 'precipitation'
        ],

        defaults: function () {
            var defaults = {};
            this.defaultKeys.forEach(function (key) {
                defaults[key] = void 0;
            });
            return defaults;
        },

        parse: function (results) {
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            return {
                monthname: results.FCTTIME.month_name,
                weekday: results.FCTTIME.weekday_name,
                weekdayShort: results.FCTTIME.weekday_name_abbrev,
                day: +results.FCTTIME.mday,
                hour: +results.FCTTIME.hour, // 24 hour clock
                condition: results.condition,
                feelsLike: results.feelslike.english,
                humidity: results.humidity,
                iconUrl: results.icon_url,
                iconAlt: results.icon,
                temperature: results.temp.english,
                dewpoint: results.dewpoint.english,
                heatIndex: results.heatindex.english,
                windDirection: results.wdir.dir,
                windSpeed: results.wspd.english,
                precipitation: results.qpf.english
            };
            // jscs:enabled requireCamelCaseOrUpperCaseIdentifiers
        }

    });

    return Hour;
});
