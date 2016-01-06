define([
], function () {

    'use strict';

    var getDeltaDate = function(date, delta) {
        var dateClone = new Date(date);
        dateClone.setDate(date.getDate() + delta);
        return dateClone;
    };

    return {
        getDeltaDate: getDeltaDate
    };

});
