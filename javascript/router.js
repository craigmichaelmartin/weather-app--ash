define([
    'backbone',
    'jquery'
], function (Backbone, $) {

    'use strict';

    var InsightRouter = Backbone.Router.extend({

        routes: {
            '(:zip)(/:day)(/:hour)(/:scale)': 'loadApp'
        },

        // The router has two parts.
        // First, on page hard load on entry to the app, the router
        // sets the attributes of the appState model from the url.
        // Second, on app state change, it updates the url.
        initialize: function (options) {

            this.appState = options.appState;

            // This sets the attributes for the app state model.
            // It is only triggered on hard url changes,
            // and so is used for the first entry into the app.
            this.on('route:loadApp', this.loadApp.bind(this));

            // This is where the url and page title are kept in sync
            // with the application state.
            this.appState.on('change', this.updatePeripheralsWithState.bind(this));
        },

        loadApp: function (zip, day, hour, scale) {
            var values = this.getValues(zip, day, hour, scale);
            //this.appState.set(values, {silent: true});
            this.appState.set(values);
        },

        getValues: function (zip, day, hour, scale) {
            var values = {
                zip: +zip,
                day: +day || new Date().getDate(),
                hour: hour && $.isNumeric(hour) ? +hour : scale && $.isNumeric(scale) ? +scale : void 0,
                scale: scale ? scale : hour && !$.isNumeric(hour) ? hour : day && !$.isNumeric(day) ? day : 'english'
            };
            return values;
        },

        updatePeripheralsWithState: function () {
            this.navigate(this.getUrl());
            document.title = 'Weather for ' + this.appState.get('zip') + ' on ' + this.appState.get('day');
        },

        getUrl: function () {
            return '' + this.appState.get('zip') +
                   '/' + this.appState.get('day') +
                   ($.isNumeric(this.appState.get('hour')) ? ('/' + this.appState.get('hour')) : '') +
                   '/' + this.appState.get('scale');
        }

    });

    return InsightRouter;

});
