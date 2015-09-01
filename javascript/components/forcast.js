define([
    'views/view',
    'text!templates/forcast.html',
    'handlebars'
], function (View, template, Handlebars) {

    'use strict';

    var ForcastView = View.extend({

        template: Handlebars.compile(template),

        initialize: function (options) {
            options = options || {};
            this.vent = options.vent;
            this.render();
        }

    });

    return ForcastView;

});
