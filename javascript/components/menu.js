define([
    'views/view',
    'text!templates/menu.html',
    'handlebarsHelpers'
], function (View, template, Handlebars) {

    'use strict';

    var MenuView = View.extend({

        template: Handlebars.compile(template),

        events: {
            'click .js-display': 'clickForecastData',
            'change .js-edit': 'changeZip',
            'blur .js-edit': 'stopEditingForecastData',
            'change .js-scale': 'changeScale'
        },

        initialize: function (options) {
            options = options || {};
            this.model = options.appState;
            this.currentHour = options.currentHour;
            this.render();
            this.listenTo(this.model, 'dataReady', this.render);
            this.listenTo(this.model, 'change:scale', this.render);
        },

        getTemplateData: function () {
            return _.extend({english: this.model.get('scale') === 'english'}, this.model.attributes, this.currentHour.attributes);
        },

        stopEditingForecastData: function (e) {
            var target = $(e.currentTarget);
            target.hide();
            target.parent().find('.js-display').show();
        },

        changeZip: function (e) {
            this.model.set('zip', $(e.currentTarget).val());
        },

        clickForecastData: function (e) {
            var target = $(e.currentTarget);
            target.hide();
            var editTarget = target.parent().find('.js-edit');
            editTarget.show().focus().val(editTarget.val());
        },

        changeScale: function () {
            var scale = this.model.get('scale') === 'english' ? 'metric' : 'english';
            this.model.set('scale', scale);
        }

    });

    return MenuView;

});
