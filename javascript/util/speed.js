define([
], function () {

    'use strict';

    var mphToKph = 1.609344;

    var getScaledSpeed = function (scale, englishNumber, toFixed) {
        toFixed || (toFixed = 0);
        if (scale === 'metric') {
            return (+englishNumber * mphToKph).toFixed(toFixed);
        }
        return (+englishNumber).toFixed(toFixed);
    };

    return {
        mphToKph: mphToKph,
        getScaledSpeed: getScaledSpeed
    };

});
