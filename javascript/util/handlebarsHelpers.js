define([
    'handlebars',
    'underscore',
    'jquery'
], function (Handlebars, _, $) {

    'use strict';

    Handlebars.registerHelper('round', function (number, decimals) {
        return Number((Math.round(number + 'e' + decimals)  + 'e-' + decimals));
    });

    // Parse a string into a date object with this
    Handlebars.registerHelper('dateParse', function (date, format) {
        return Date.parse(date).toString(format);
    });

    // Format a date object into a string with this
    // {{#formatDate theDate 'M/d/yy'}}
    Handlebars.registerHelper('formatDate', function (date, format) {
        if (format ===  void 0) {
            format = 'M/d/yy';
        }

        if (typeof (date) === 'string') {
            date = (new Date(date));
        }
        return date.toString(format);
    });

    // {{#or false true}} Stuff {{/or}}
    Handlebars.registerHelper('or', function (val, val2, options) {
        if (val || val2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // Handlebars doesn't like to be able to execute methods... screw that,
    // here ya go.
    // For example:
    //     {{ call someObject 'someMethod' [arg1, arg2] }}
    // Is equivalent to:
    //     someObject.someMethod(arg1, arg2)
    Handlebars.registerHelper('call', function (object, fnName) {
        var args = arguments;
        if (!_.isArray(args)) {
            args = [args];
        }
        return object[fnName].apply(object, args);
    });

    // {{#eq 1 1}} 1 equals 1! Hooray! {{/eq}}
    Handlebars.registerHelper('eq', function (val, val2, options) {
        if (val === val2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper('endList', function (index, obj, options) {
        var last = _.size(obj) - 1;
        if (index === last) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // {{#stripNonDigits '440-286-7120'}} -> '4402867120'
    Handlebars.registerHelper('stripNonDigits', function (text) {
        return text.replace(/\D/g, '');
    });

    // {{#add 1 1}} -> '2'
    Handlebars.registerHelper('add', function (num, delta) {
        return num + delta;
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

    Handlebars.registerHelper('debugger', function () {
        debugger; // jshint ignore:line
    });

    return Handlebars;

});
