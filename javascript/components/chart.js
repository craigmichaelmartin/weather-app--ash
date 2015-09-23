define([
    'views/view',
    'text!templates/chart.html',
    'handlebarsHelpers',
    'd3'
], function (View, template, Handlebars, d3) {

    'use strict';

    var ChartView = View.extend({

        template: Handlebars.compile(template),

        events: {
            'click .bar': 'hourClicked'
        },

        hourClicked: function (e) {
            var time = $(e.currentTarget).data('time');
            var hour = +time.split(time.slice(-2))[0];
            hour = time.indexOf('PM') > -1 ? hour + 12 : hour;
            this.appState.set('hour', hour);
        },

        initialize: function (options) {
            options = options || {};
            this.appState = options.appState;
            this.hours = options.hours;
            this.listenTo(this.appState, 'dataReady', this.render);
            this.listenTo(this.appState, 'change:day', this.render);
            this.listenTo(this.appState, 'change:hour', this.render);
            this.listenTo(this.appState, 'change:scale', this.render);
            this.render();
        },

        afterRender: function () {
            var margin = {
                upper: 0,
                right: 0,
                bottom: 0,
                left: 0
            };
            var width = $('.js-d3Chart').width() - margin.left - margin.right;
            var height = $('.js-d3Chart').height() - margin.upper - margin.bottom;

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], 0.1);

            var y = d3.scale.linear()
                .range([height, 0]);

            var svg = d3.select(".js-d3Chart")
                .append("div")
                .classed("svg-container", true)
                .append("svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.upper + margin.bottom))
                .classed("svg-content-responsive", true)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.upper + ")");

            var data = this.hours.byDay(this.appState.get('day')).map((function (model) {
                return {
                    temp: this.appState.get('scale') === "english" ? model.get('temperatureEnglish') : model.get('temperatureMetric'),
                    time: model.get('civil').split(':')[0] + model.get('civil').slice(-2)
                };
            }).bind(this));

            var getTime = function (d) {
                return d.time;
            };
            var getTemp = function (d) {
                return d.temp;
            };

            x.domain(data.map(getTime));
            y.domain([0, d3.max(data, getTemp)]);

            svg.selectAll(".bar")
                .data(data)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d, i) {
                    return i * (width / data.length);
                })
                .attr("width", x.rangeBand())
                .attr("y", function (d) {
                    return y(d.temp);
                })
                .attr("height", function (d) {
                    return height - y(d.temp);
                })
                .attr("data-time", getTime);

            svg.selectAll()
                .data(data)
                .enter()
                .append("text")
                .attr("x", function (d, i) {
                    return ((i * width/data.length) + (width/data.length/2) - 3);
                })
                .attr("y", function (d, i) {
                    return y(d.temp) + 25;
                })
                .text(function (d) {
                    return d.temp + '°';
                });

            svg.selectAll()
                .data(data)
                .enter()
                .append("text")
                .attr("font-family", "sans-serif")
                .attr("font-size", "16px")
                .attr("x", function (d, i) {
                    return ((i * width/data.length) + (width/data.length/2) - 3);
                })
                .attr("y", function (d, i) {
                    return y(d.temp) + 50;
                })
                .text(getTime);

            var ratioPercentage = height / width * 110;
            $('.svg-container').css('padding-bottom', ratioPercentage + '%');
        }
    });

    return ChartView;

});
