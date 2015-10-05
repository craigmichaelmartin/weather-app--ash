define(function(require) {
    'use strict';

    var AppStateModel = require('models/app');

    describe('App state model', function() {

        it('should be defined', function() {
            expect(AppStateModel).not.to.be.undefined;
        });

        describe('after being initialized', function() {

            beforeEach(function() {
                this.appState = new AppStateModel();
            });

            describe('the validate function', function() {

                describe('for zip values', function() {

                    it('should return an error message for no value', function() {
                        expect(this.appState.set({ zip: '' }, {validate: true})).to.be.false;
                    });

                    it('should return an error message for non-numeric', function() {
                        expect(this.appState.set({ zip: '12A65' }, {validate: true})).to.be.false;
                    });

                    it('should return an error message for invalidly long length', function() {
                        expect(this.appState.set({ zip: 123456 }, {validate: true})).to.be.false;
                    });

                    it('should return an error message for invalidly short length', function() {
                        expect(this.appState.set({ zip: 1234 }, {validate: true})).to.be.false;
                    });

                    it('should return an error message for negative', function() {
                        expect(this.appState.set({ zip: -1234 }, {validate: true})).to.be.false;
                    });

                });

            });

            describe('the invalid event', function() {

                describe('for zip values', function() {

                    beforeEach(function() {
                        this.message;
                        this.appState.on('invalid', function(model, error, options) {
                            this.message = error;
                        }.bind(this));
                    });

                    afterEach(function() {
                        this.appState.off('invalid');
                    });

                    it('should contain an error message for no value', function() {
                        this.appState.set({ zip: '' }, {validate: true});
                        expect(this.message).to.equal('zip code must be numeric');
                    });

                    it('should contain an error message for non-numeric', function() {
                        this.appState.set({ zip: '12A65' }, {validate: true});
                        expect(this.message).to.equal('zip code must be numeric');
                    });

                    it('should contain an error message for invalidly long length', function() {
                        this.appState.set({ zip: 123456 }, {validate: true});
                        expect(this.message).to.equal('zip code must be five digits');
                    });

                    it('should contain an error message for invalidly short length', function() {
                        this.appState.set({ zip: 1234 }, {validate: true});
                        expect(this.message).to.equal('zip code must be five digits');
                    });

                    it('should contain an error message for negative', function() {
                        this.appState.set({ zip: -1234 }, {validate: true});
                        expect(this.message).to.equal('zip code must be five digits');
                    });

                });
            });
        });
    });
});
