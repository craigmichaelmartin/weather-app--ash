define([
    'views/view',
    'components/scale',
    'components/menu',
    'components/days',
    'components/statistics',
    'components/chart',
    'text!templates/app.html',
    'handlebars',
    'jquery',
    'es5shim'
], function (View, ScaleView, MenuView, DaysView, StatisticsView, ChartView,
            template, Handlebars) {

    'use strict';

    var AppView = View.extend({

        template: Handlebars.compile(template),

        initialize: function (options) {
            options = options || {};
            this.appState = options.appState;
            this.render();
            this.days = options.days;
            this.hours = options.hours;
            this.ensureZip();
            this.listenToOnce(this.appState, 'dataReady', this.loadApp.bind(this));
            this.fetchForecastData();
        },

        // Because of how the wunderground API is set up, days and hours
        // are separate collections and 10 days are retrieved at a time,
        // so fetching is only necessary up front, and on zipcode change.
        fetchForecastData: function() {
            $.when(
                this.days.fetch(this.appState.attributes),
                this.hours.fetch(this.appState.attributes)
            ).done((function () {
                this.appState.trigger('dataReady');
            }).bind(this));
        },

        // If no zip is provided, obtain the zip from the ip geo-lookup.
        ensureZip: function() {
            this.listenToOnce(this.days, 'sync', (function (collection, response) {
                if (!this.appState.get('zip')) {
                    this.appState.set('zip', +response.location.zip);
                }
            }).bind(this));
        },

        // Kicks off the presentation of the app.
        loadApp: function () {
            this.listenTo(this.appState, 'change:zip', this.fetchForecastData.bind(this));
            this.addConditionClass(this.hours.models[0].attributes.condition);
            this.makeViews();
        },

        // Adds an `is-someCondition` class to the app element.
        addConditionClass: function(condition) {
            this.$el.addClass(this.getConditionClass(condition));
        },

        // Returns a condition in the set {rainy, snowy, clear, cloudy}
        getConditionClass: function(condition) {
            if (/rain|thunderstorm|showers/i.test(condition)) {
                return 'is-rainy';
            }
            if (/snow/i.test(condition)) {
                return 'is-snowy';
            }
            if (/clear|sunny/i.test(condition)) {
                return 'is-clear';
            }
            return 'is-cloudy';
        },

        // Kicks off the views that comprise the app.
        makeViews: function() {
            this.scaleView = new ScaleView({
                el: $('.js-scaleView'),
                appState: this.appState,
            });
            this.menuView = new MenuView({
                el: $('.js-menu'),
                appState: this.appState,
                currentHour: this.hours.models[0]
            });
            this.daysView = new DaysView({
                el: $('.js-days'),
                days: this.days,
                appState: this.appState
            });
            this.chart = new ChartView({
                el: $('.js-chart'),
                hours: this.hours,
                appState: this.appState
            });
            this.statisticsView = new StatisticsView({
                el: $('.js-statistics'),
                appState: this.appState,
                days: this.days,
                hours: this.hours
            });
        }

    });

    return AppView;

});
