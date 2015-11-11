define([
    'models/model'
], function (Model) {

    'use strict';

    var Hour = Model.extend({

        defaultKeys: [
            'monthname', 'weekday', 'weekdayShort', 'day', 'hour', 'civil',
            'condition', 'feelsLikeEnglish', 'feelsLikeMetric', 'humidity',
            'iconUrl', 'iconAlt', 'temperatureEnglish', 'temperatureMetric',
            'dewpointEnglish', 'dewpointMetric', 'heatIndexEnglish',
            'heatIndexMetric', 'windDirection', 'windSpeedEnglish',
            'windSpeedMetric', 'percipitationEnglish', 'percipitationMetric'
        ],

        defaults: function () {
            var defaults = {};
            this.defaultKeys.forEach(function (key) {
                defaults[key] = undefined;
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
                hour: +results.FCTTIME.hour,
                civil: results.FCTTIME.civil,
                condition: results.condition,
                feelsLikeEnglish: results.feelslike.english,
                feelsLikeMetric: results.feelslike.metric,
                humidity: results.humidity,
                iconUrl: results.icon_url,
                iconAlt: results.icon,
                temperatureEnglish: results.temp.english,
                temperatureMetric: results.temp.metric,
                dewpointEnglish: results.dewpoint.english,
                dewpointMetric: results.dewpoint.metric,
                heatIndexEnglish: results.heatindex.english,
                heatIndexMetric: results.heatindex.metric,
                windDirection: results.wdir.dir,
                windSpeedEnglish: results.wspd.english,
                windSpeedMetric: results.wspd.metric,
                percipitationEnglish: results.qpf.english,
                percipitationMetric: results.qpf.metric
            };
            // jscs:enabled requireCamelCaseOrUpperCaseIdentifiers
        }

    });

    return Hour;
});
