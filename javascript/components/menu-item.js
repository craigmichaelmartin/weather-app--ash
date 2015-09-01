/*
define([
    'javascript/views/view',
    'text!javascript/templates/menu.html',
    'handlebarsHelpers'
], function (View, template, Handlebars) {

    var MenuView = View.extend({

        template: Handlebars.compile(template),

        events: {
            'click .js-display': 'clickForecastData',
            'change .js-edit': 'changeForecastData',
            'blur .js-edit': 'stopEditingForecastData',
        },

        initialize: function (options) {
            options = options || {};
            this.model = options.model;
            this.vent = options.vent;
            this.render();
        },

        stopEditingForecastData: function (e) {
            var target = $(e.currentTarget);
            target.hide();
            target.parent().find('.js-display').show();
        },

        changeForecastData: function (e) {
            this.stopEditingForecastData(e);
        },

        clickForecastData: function (e) {
            var target = $(e.currentTarget);
            target.hide();
            target.parent().find('.js-edit').show().focus();
        }

    });

    return MenuView;

});
*/
