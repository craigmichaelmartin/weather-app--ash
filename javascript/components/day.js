define([
    'views/view',
    'text!templates/day.html',
    'handlebars'
], function (View, template, Handlebars) {

    'use strict';

    var DayView = View.extend({

        template: Handlebars.compile(template),

        events: {
            'click .day': 'loadDay'
        },

        initialize: function (options) {
            this.model = options.model;
            this.appState = options.appState;
        },

        deleteViewAndModel: function () {
            this.model.destroy();
            this.deleteView();
        },

        deleteView: function () {
            this.remove();
            this.unbind();
        },

        loadDay: function (ev) {
            $('.day.is-active').removeClass('is-active');
            $(ev.currentTarget).addClass('is-active');
            this.appState.attributes.hour = null;
            this.appState.set('day', this.model.get('day'));
        },

        getTemplateData: function () {
            return _.extend({english: this.appState.get('scale') === 'english'}, this.model.attributes);
        }

    });

    return DayView;

});
