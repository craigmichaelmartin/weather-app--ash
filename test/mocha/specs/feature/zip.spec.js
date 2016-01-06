define(function(require) {
    'use strict';

    describe('App after loading', function() {

        beforeEach(function() {
            sinon.stub(Date.prototype, 'getDate').returns(25);
            sinon.stub(Date.prototype, 'getHours').returns(12);
            this.server = Helpers.createServer();
            this.app = Helpers.createApp();
            this.app.fetchForecastData();
            this.server.respond();
        });

        afterEach(function() {
            Date.prototype.getDate.restore();
            Date.prototype.getHours.restore();
            this.server.restore();
        });
        
        describe('interacting with the zip', function() {

            beforeEach(function() {
                this.$zipDisplay = $('.js-zip-display').click();
            });

            it('should hide the display', function() {
                expect(this.$zipDisplay.css('display')).to.equal('none');
            });

            it('should show the input', function() {
                expect($('.js-edit').css('display')).to.equal('inline-block');
            });

            describe('validation', function() {

                describe('with errors', function() {

                    it('should indicate invalid for no value', function() {
                        $('.js-edit').val('').trigger('keyup');
                        expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                    });

                    it('should indicate invalid for non-numeric', function() {
                        $('.js-edit').val('12A65').trigger('keyup');
                        expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                    });

                    it('should indicate invalid for invalidly long length', function() {
                        $('.js-edit').val('123456').trigger('keyup');
                        expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                    });

                    it('should indicate invalid for invalidly short length', function() {
                        $('.js-edit').val('1234').trigger('keyup');
                        expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                    });

                    it('should indicate invalid for negative', function() {
                        $('.js-edit').val('-1234').trigger('keyup');
                        expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                    });

                });

                describe('without errors', function() {

                    beforeEach(function() {
                        $('.js-edit').val('44023').trigger('keyup');
                    });

                    it('should not indicate invalid input', function() {
                        expect($('.js-edit').hasClass('is-invalid')).to.be.false;
                    });

                    describe('when submitted', function() {

                        before(function() {
                            // record the number of requests with zip 44023
                            this.hourRequests = _.where(this.server.requests, {
                                url: 'http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/44023.json'
                            });
                            this.dayRequests = _.where(this.server.requests, {
                                url: 'http://api.wunderground.com/api/3f6df2a3f0916b99/forecast10day/q/44023.json'
                            });

                            // less precise
                            this.serverRequests = this.server.requests.length;
                        });

                        beforeEach(function() {
                            // these pass but don't really check accurately because changed validateZip
                            $('.js-edit').blur();
                            $('.js-edit').focusout();
                            this.server.respond();
                        });

                        it('should hide the input', function() {
                            expect($('.js-edit').css('display')).to.equal('none');
                        });

                        it('should show the display', function() {
                            expect($('.js-zip-display').css('display')).to.equal('inline');
                        });

                        it('should set the appState', function() {
                            expect(this.app.appState.get('zip')).to.equal(44023);
                        });

                        it('should fetch the new forecast', function() {
                            var hourRequests = _.where(this.server.requests, {
                                url: 'http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/44023.json'
                            });
                            var dayRequests = _.where(this.server.requests, {
                                url: 'http://api.wunderground.com/api/3f6df2a3f0916b99/forecast10day/q/44023.json'
                            });

                            // using the before count, we can ensure there was a new fetch
                            // once the zip was changed
                            expect(hourRequests.length).to.equal(this.hourRequests.length + 1);
                            expect(dayRequests.length).to.equal(this.dayRequests.length + 1);
                            expect(this.server.requests.length).to.be.above(this.serverRequests);
                        });

                    });
                });
            });
        });
    });
});
