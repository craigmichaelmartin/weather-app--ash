define([
    'backbone',
    'jquery'
], function (Backbone, $) {

    'use strict';

    var InsightRouter = Backbone.Router.extend({

        routes: {
            '': 'no-op',
            '(:zip)(/:day)(/:hour)(/:scale)': 'setValues'
        },

        initialize: function (options) {
            this.appState = options.appState;
            // As application state chages, the url and periphery are updated
            this.appState.on('change', this.updatePeripheralsWithState.bind(this));
        },

        setValues: function (zip, day, hour, scale) {
            this.appState.set(this.getValues(zip, day, hour, scale), {validate: true});
        },

        getValues: function (zip, day, hour, scale) {
            return {
                zip: +zip,
                day: +day || new Date().getDate(),
                hour: hour && $.isNumeric(hour) ? +hour : scale && $.isNumeric(scale) ? +scale : void 0,
                scale: scale ? scale : hour && !$.isNumeric(hour) ? hour : day && !$.isNumeric(day) ? day : 'english'
            };
        },

        updatePeripheralsWithState: function () {
            this.navigate(this.getUrl());
            document.title = 'Weather for ' + this.appState.get('zip') + ' on ' + this.appState.get('day');
        },

        getUrl: function () {
            return '' + this.appState.get('zip') +
                   '/' + this.appState.get('day') +
                   (this.appState.get('hour') === void 0 ? '' : ('/' + this.appState.get('hour'))) +
                   '/' + this.appState.get('scale');
        }

    });

    return InsightRouter;

});
