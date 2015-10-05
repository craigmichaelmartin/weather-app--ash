define(function(require) {
    'use strict';

    var AppStateModel = require('models/app');

    describe('App state model', function() {

        it('should be defined', function() {
            expect(AppStateModel).not.to.be.undefined;
        });

        describe('the validate function', function() {

            describe('for zip values', function() {

                it('should return an error message for no value', function() {
                    expect(AppStateModel.prototype.set({ zip: '' }, {validate: true})).to.be.false;
                });

                it('should return an error message for non-numeric', function() {
                    expect(AppStateModel.prototype.set({ zip: '12A65' }, {validate: true})).to.be.false;
                });

                it('should return an error message for invalidly long length', function() {
                    expect(AppStateModel.prototype.set({ zip: 123456 }, {validate: true})).to.be.false;
                });

                it('should return an error message for invalidly short length', function() {
                    expect(AppStateModel.prototype.set({ zip: 1234 }, {validate: true})).to.be.false;
                });

                it('should return an error message for negative', function() {
                    expect(AppStateModel.prototype.set({ zip: -1234 }, {validate: true})).to.be.false;
                });

            });
        });
    });
});
