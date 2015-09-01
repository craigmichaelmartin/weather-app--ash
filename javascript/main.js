require([
    '../javascript/require-config'
], function () {

    'use strict';

    require([
        'app',
        'router',
        'collections/days',
        'collections/hours',
        'backbone',
        'bootstrap'
    ], function (AppView, AppRouter, Days, Hours, Backbone) {

        $.ajaxSetup({ cache: false });

        var appState = new Backbone.Model();
        var appRouter = new AppRouter({appState: appState});
        Backbone.history.start({/*pushState: true*/});
        var app = new AppView({
            el: $('.js-weatherApp'),
            days: new Days(),
            hours: new Hours(),
            appState: appState
        });

    });
});
