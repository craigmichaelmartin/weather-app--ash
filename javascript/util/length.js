define([
], function () {

    'use strict';

    var inchesToCentimeters = 0.39370079;
    var inchesToMillimeters = inchesToCentimeters * 0.01;

    var getScaledLength = function (scale, englishNumber, details, toFixed) {
        toFixed || (toFixed = 0);
        var number, length;
        if (scale === 'english') {
            number = (+englishNumber).toFixed(toFixed);
            length = number + ' inch';
            return length + (+number === 1 ? '' : 'es');
        }
        if (scale === 'metric') {
            if (!details || details === 'mm') {
                number = (+englishNumber / inchesToMillimeters).toFixed(toFixed);
                length = number + ' millimeter';
            } else {
                number = (+englishNumber / inchesToCentimeters).toFixed(toFixed);
                length = number + ' centimeter';
            }
            return length + (+number === 1 ? '' : 's');
        }
        throw 'Cannot convert to scale "' + scale + '"';
    };

    return {
        getScaledLength: getScaledLength,
        inchesToCentimeters: inchesToCentimeters,
        inchesToMillimeters: inchesToMillimeters
    };

});
