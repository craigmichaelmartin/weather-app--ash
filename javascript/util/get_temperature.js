define([
], function () {

    'use strict';

    var getTemperature = function (scale, englishNumber, toFixed) {
        toFixed || (toFixed = 0);
        if (scale === 'english') {
            return (+englishNumber).toFixed(toFixed);
        }
        if (scale === 'metric') {
            return ((englishNumber - 32) * 5/9).toFixed(toFixed);
        }
        throw 'Cannot convert to scale "' + scale + '"';
    };

    return getTemperature;

});
