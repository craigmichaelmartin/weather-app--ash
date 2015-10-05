define(function(require) {
    'use strict';

    var MenuView = require('components/menu');
    var AppStateModel = require('models/app');

    describe('Menu view', function() {

        it('should be defined', function() {
            expect(MenuView).not.to.be.undefined;
        });

        describe('after being initialized', function() {

            beforeEach(function() {
                this.appState = new AppStateModel();
                MenuView.prototype.render = sinon.stub().returns(this);
                MenuView.prototype.flagInvalidZip = sinon.stub().returns(this);
                this.menu = new MenuView({appState: this.appState});
            });

            describe('the event listeners', function() {

                describe('for appState model', function() {

                    it('should correctly respond to dataReady', function() {
                        this.appState.trigger('dataReady');
                        // useing called twice because initialize calls it once
                        expect(this.menu.render.calledTwice).to.be.true;
                    });

                    it('should correctly respond to changing zip', function() {
                        this.appState.trigger('change:zip');
                        // useing called twice because initialize calls it once
                        expect(this.menu.render.calledTwice).to.be.true;
                    });

                    it('should correctly respond to invalid trigger', function() {
                        this.appState.trigger('invalid');
                        expect(this.menu.flagInvalidZip.calledOnce).to.be.true;
                    });

                });
            });
        });
    });
});
