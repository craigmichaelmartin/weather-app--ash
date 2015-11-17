define([
], function () {

    'use strict';

    var getTemperature = function (number, scale, toFixed) {
        toFixed || (toFixed = 0);
        scale || (scale = 'english');
        if (scale === 'english') {
            return (+number).toFixed(toFixed);
        }
        if (scale === 'metric') {
            return ((number - 32) * 5/9).toFixed(toFixed);
        }
        throw 'Cannot convert to scale "' + scale + '"';
    };

    return getTemperature;

});
