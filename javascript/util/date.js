define([
], function () {

    'use strict';

    var getDeltaDate = function (date, delta) {
        var dateClone = new Date(date);
        dateClone.setDate(date.getDate() + delta);
        return dateClone;
    };

    var getScaledShortDate = function (scale, month, day) {
        if (scale === 'english') {
            return month + '/' + day;
        }
        if (scale === 'metric') {
            return day + '/' + month;
        }
        throw 'Cannot convert to scale "' + scale + '"';
    };

    return {
        getDeltaDate: getDeltaDate,
        getScaledShortDate: getScaledShortDate
    };

});
