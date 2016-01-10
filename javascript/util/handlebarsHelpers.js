define([
    'util/temperature',
    'util/date',
    'util/length',
    'util/speed',
    'handlebars',
    'underscore',
    'jquery'
], function (tempUtils, dateUtils, lengthUtils, speedUtils, Handlebars, _, $) {

    'use strict';

    Handlebars.registerHelper('temperature', function (scale, englishNumber, toFixed) {
        var temperatureRaw = tempUtils.getScaledTemperature(scale, englishNumber, toFixed);
        var postfix = '&deg;' + (scale === 'metric' ? 'C' : 'F');
        return new Handlebars.SafeString(temperatureRaw + postfix);
    });

    Handlebars.registerHelper('temperatureNoUnits', function (scale, englishNumber, toFixed) {
        var temperatureRaw = tempUtils.getScaledTemperature(scale, englishNumber, toFixed);
        return new Handlebars.SafeString(temperatureRaw + '&deg;');
    });

    Handlebars.registerHelper('length', function (scale, englishNumber, details, toFixed) {
        var length = lengthUtils.getScaledLength(scale, englishNumber, details, toFixed);
        return new Handlebars.SafeString(length);
    });

    Handlebars.registerHelper('speed', function (scale, englishNumber, toFixed) {
        var speed = speedUtils.getScaledSpeed(scale, englishNumber, toFixed);
        var postfix = scale === 'metric' ? ' kph' : ' mph';
        return new Handlebars.SafeString(speed + postfix);
    });

    Handlebars.registerHelper('when', function (scale, weekday, monthname, day, hour) {
        return dateUtils.getDateSentence(scale, weekday, monthname, day, hour);
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
