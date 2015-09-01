define([
    'models/model'
], function (Model) {

    'use strict';

    var Hour = Model.extend({

        parse: function (results) {
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
        }

    });

    return Hour;
});
