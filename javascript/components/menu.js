define([
    'views/view',
    'text!templates/menu.html',
    'handlebarsHelpers'
], function (View, template, Handlebars) {

    'use strict';

    var MenuView = View.extend({

        template: Handlebars.compile(template),

        events: {
            'click .js-display': 'showEditMode',
            'keyup .js-edit': 'updateZip'
        },

        initialize: function (options) {
            options = options || {};
            this.model = options.appState;
            this.currentHour = options.currentHour;
            this.render();
            this.$edit = this.$('.js-edit');
            this.$display = this.$('.js-display');
            this.listenTo(this.model, 'change:zip', this.render);   // discepancy in time between these two
            this.listenTo(this.model, 'dataReady', this.render);    // is the loading time. todo: loading visual
            this.listenTo(this.model, 'change:scale', this.render);
            this.listenTo(this.model, 'invalid', this.flagInvalidZip);
        },

        flagInvalidZip: function(e) {
            this.$edit.addClass('is-invalid');
        },

        getTemplateData: function () {
            return _.extend({english: this.model.get('scale') === 'english'}, this.model.attributes, this.currentHour.attributes);
        },

        updateZip: function () {
            this.model.set({zip: +this.$edit.val()}, {validate: true});
        },

        showEditMode: function () {
            this.$display.hide();
            this.$edit.show().focus().val(this.model.get('zip'));
        }

    });

    return MenuView;

});
