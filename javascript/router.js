define([
    'backbone'
], function (Backbone) {

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
            this.on('route:loadApp', (function (zip, day, hour, scale) {
                var values = {
                    zip: +zip,
                    day: +day || new Date().getUTCDate(),
                    hour: hour && $.isNumeric(hour) ? +hour : scale && $.isNumeric(scale) ? +scale : void 0,
                    scale: scale ? scale : hour && !$.isNumeric(hour) ? hour : 'english'
                };
                _.filter(values, function (val) {
                    return val != void 0;
                });
                this.appState.set(values, {silent: true});
            }).bind(this));

            // This is where the url and page title are kept in sync
            // with the application state.
            this.appState.on('change', (function () {
                var url = '' + this.appState.get('zip') +
                          '/' + this.appState.get('day') +
                          (this.appState.get('hour') ? ('/' + this.appState.get('hour')) : '') +
                          '/' + this.appState.get('scale');
                this.navigate(url);
                document.title = 'Weather for ' + this.appState.get('zip') + ' on ' + this.appState.get('day')
            }).bind(this));
        }

    });

    return InsightRouter;

});
