define([
    'views/view',
    'text!templates/menu.html',
    'handlebarsHelpers',
    'underscore'
], function (View, template, Handlebars, _) {

    'use strict';

    var MenuView = View.extend({

        template: Handlebars.compile(template),

        events: {
            'click .js-display': 'showEditMode',
            'blur .js-edit': 'updateZipOrCancel',
            'keyup .js-edit': 'validateZip'
        },

        initialize: function (options) {
            options = options || {};
            this.model = options.appState;
            this.currentHour = options.currentHour;
            this.render();
            this.listenTo(this.model, 'change:zip', this.render);   // discepancy in time between these two
            this.listenTo(this.model, 'dataReady', this.render);    // is the loading time. todo: loading visual
            this.listenTo(this.model, 'change:scale', this.render);
            this.listenTo(this.model, 'invalid', this.flagInvalidZip);
        },

        flagInvalidZip: function (e) {
            this.$edit.addClass('is-invalid');
        },

        flagValidZip: function (e) {
            this.$edit.removeClass('is-invalid');
        },

        getTemplateData: function () {
            return _.extend({english: this.model.get('scale') === 'english'}, this.model.attributes, this.currentHour.attributes);
        },

        updateZipOrCancel: function () {
            if (this.model.validate({zip: +this.$edit.val()})) {
                this.render();
            } else {
                this.model.set({zip: +this.$edit.val()}, {validate: true});
            }
        },

        validateZip: function () {
            if (!this.model.validate({zip: +this.$edit.val()})) {
                this.flagValidZip();
            } else {
                this.flagInvalidZip();
            }
        },

        showEditMode: function () {
            this.$display.hide();
            this.$edit.show().focus().val(this.model.get('zip'));
        },

        afterRender: function () {
            this.cacheSelectors();
        },

        cacheSelectors: function () {
            this.$edit = this.$('.js-edit');
            this.$display = this.$('.js-display');
        }

    });

    return MenuView;

});
