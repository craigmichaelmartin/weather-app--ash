define([
    'models/model'
], function (Model) {

    'use strict';

    var AppState = Model.extend({

        validate: function(attrs, options) {
            if (!_.isNumber(attrs.zip) || _.isNaN(attrs.zip)) {
                return 'zip code must be numeric';
            }
            if ((attrs.zip < 0) || (attrs.zip.toString().length !== 5)) {
                return 'zip code must be five digits';
            }
        }

    });

    return AppState;
});
