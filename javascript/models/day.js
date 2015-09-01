define([
    'models/model'
], function (Model) {

    'use strict';

    var Day = Model.extend({

        buildUrl: function (zip) {
            return 'http://api.wunderground.com/api/3f6df2a3f0916b99/hourly/q/' + (zip || 'autoip') + '.json';
        },

        parse: function (results) {
            return {
                condition: results.conditions,
                iconUrl: results.icon_url,
                iconAlt: results.icon,
                highEnglish: results.high.fahrenheit,
                lowEnglish: results.low.fahrenheit,
                highMetric: results.high.celsius,
                lowMetric: results.low.celsius,
                monthname: results.date.monthname,
                weekday: results.date.weekday,
                weekdayShort: results.date.weekday_short,
                day: +results.date.day,
                totalSnowEnglish: results.snow_allday.in,
                totalSnowMetric: results.snow_allday.cm,
                averageHumidity: results.avehumidity,
                averageWindDirection: results.avewind.dir,
                averageWindMetric: results.avewind.kph,
                averageWindEnglish: results.avewind.mph,
                percipitationEnglish: results.qpf_allday.in,
                percipitationMetric: results.qpf_allday.cm
            };
        }

    });

    return Day;
});
