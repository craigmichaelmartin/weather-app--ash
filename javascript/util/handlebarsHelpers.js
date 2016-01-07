define([
    'util/temperature',
    'util/time',
    'handlebars',
    'underscore',
    'jquery'
], function (tempUtils, timeUtils, Handlebars, _, $) {

    'use strict';

    Handlebars.registerHelper('temperature', function (scale, englishNumber, toFixed) {
        toFixed || (toFixed = 0);
        var temperatureRaw = Handlebars.helpers.temperatureRaw(scale, englishNumber, toFixed);
        if (scale === 'metric') {
            return new Handlebars.SafeString(temperatureRaw + 'C');
        }
        return new Handlebars.SafeString(temperatureRaw + 'F');
    });

    Handlebars.registerHelper('temperatureNoUnits', function (scale, englishNumber, toFixed) {
        toFixed || (toFixed = 0);
        var temperatureRaw = Handlebars.helpers.temperatureRaw(scale, englishNumber, toFixed);
        if (scale === 'metric') {
            return new Handlebars.SafeString(temperatureRaw);
        }
        return new Handlebars.SafeString(temperatureRaw);
    });

    Handlebars.registerHelper('temperatureRaw', function (scale, englishNumber, toFixed) {
        toFixed || (toFixed = 0);
        return tempUtils.getScaledTemperature(scale, englishNumber, toFixed) + '&deg;';
    });

    Handlebars.registerHelper('length', function (scale, englishNumber, details, toFixed) {
        toFixed || (toFixed = 0);
        if (scale === 'metric') {
            var conversion = .39370079;
            if (!details || details === 'mm') {
                var number = (+englishNumber / (conversion * .01)).toFixed(toFixed);
                var length = number + ' millimeter';
            } else {
                var number = (+englishNumber / conversion).toFixed(toFixed);
                var length = number + ' centimeter';
            }
            return new Handlebars.SafeString(length + (+number === 1 ? '' : 's'));
        }
        var number = (+englishNumber).toFixed(toFixed);
        var length = number + ' inch';
        return new Handlebars.SafeString(length + (+number === 1 ? '' : 'es'));
    });

    Handlebars.registerHelper('speed', function (scale, englishNumber) {
        if (scale === 'metric') {
            return new Handlebars.SafeString((+englishNumber * 1.609344).toFixed(0) + ' kph');
        }
        return new Handlebars.SafeString((+englishNumber).toFixed(0) + ' mph');
    });

    Handlebars.registerHelper('when', function (scale, weekday, monthname, day, hour) {
        return weekday + ', ' + (scale === 'metric' ? day + ' ' + monthname : monthname + ' ' + day) + (hour == null ? '' : ' at ' + timeUtils.getScaledTime(scale, hour));
    });

    // {{#ifCond var1 '==' var2}}
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this); // jshint ignore:line
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

    return Handlebars;

});
