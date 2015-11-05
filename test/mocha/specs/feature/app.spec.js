define(function(require) {
    'use strict';

    describe('App after loading', function() {

        beforeEach(function() {
            sinon.stub(Date.prototype, 'getDate').returns(25);
            sinon.stub(Date.prototype, 'getHours').returns(12);
            this.server = Helpers.createServer();
            this.app = Helpers.createApp();
            this.server.respond();
        });

        afterEach(function() {
            Date.prototype.getDate.restore();
            Date.prototype.getHours.restore();
            this.server.restore();
        });

        describe('before interacting', function() {
            
            describe('the zip code', function() {

                it('display should be visible', function() {
                    expect($('.js-zip-display').css('display')).to.equal('inline');
                });

                it('input should be hidden', function() {
                    expect($('.js-edit').css('display')).to.equal('none');
                });

            });

        });

        describe('invalid state', function() {

            describe('for zip', function() {

                afterEach(function() {
                    $('.js-alertClose').click();
                });

                it('should indicate not valid zip', function() {
                    expect(this.app.appState.set({zip: ''}, {validate: true})).to.be.false;
                    expect($('.js-alertText').text().indexOf(this.app.appState.zipNotNumeric)).to.be.above(-1);
                });

                it('should indicate non-numeric zip', function() {
                    expect(this.app.appState.set({zip: '1234S'}, {validate: true})).to.be.false;
                    expect($('.js-alertText').text().indexOf(this.app.appState.zipNotNumeric)).to.be.above(-1);
                });

                it('should indicate too long zip', function() {
                    expect(this.app.appState.set({zip: 123456}, {validate: true})).to.be.false;
                    expect($('.js-alertText').text().indexOf(this.app.appState.zipNotLength)).to.be.above(-1);
                });

                it('should indicate too short zip', function() {
                    expect(this.app.appState.set({zip: 1234}, {validate: true})).to.be.false;
                    expect($('.js-alertText').text().indexOf(this.app.appState.zipNotLength)).to.be.above(-1);
                });

                it('should indicate negative zip', function() {
                    expect(this.app.appState.set({zip: -1000}, {validate: true})).to.be.false;
                    expect($('.js-alertText').text().indexOf(this.app.appState.zipNotLength)).to.be.above(-1);
                });

            });

            describe('for day', function() {

                it('should indicate day is too far out', function() {
                    expect(this.app.appState.set({ zip: 44147, day: 100 }, {validate: true})).to.be.false;
                    expect($('.js-alertText').text().indexOf(this.app.appState.dayNotNear)).to.be.above(-1);
                });

                it('should indicate day is too far out', function() {
                    expect(this.app.appState.set({ zip: 44147, day: 15 }, {validate: true})).to.be.false;
                    expect($('.js-alertText').text().indexOf(this.app.appState.dayNotNear)).to.be.above(-1);
                });

            });

            describe('for hour', function() {

                it('should indicate cannot have hour without day', function() {
                    expect(this.app.appState.set({ zip: 44147, day: void 0, hour: 13 }, {validate: true})).to.be.false;
                    expect($('.js-alertText').text().indexOf(this.app.appState.hourNeedsDay)).to.be.above(-1);
                });

                it('should indicate hour is not valid', function() {
                    expect(this.app.appState.set({ zip: 44147, day: 25, hour: 100 }, {validate: true})).to.be.false;
                    expect($('.js-alertText').text().indexOf(this.app.appState.hourNotValid)).to.be.above(-1);
                });

                it('should indicate hour is not valid for today', function() {
                    expect(this.app.appState.set({ zip: 44147, day: 25, hour: 10 }, {validate: true})).to.be.false;
                    expect($('.js-alertText').text().indexOf(this.app.appState.hourNotValidToday)).to.be.above(-1);
                });

            });

            describe('for scale', function() {

                it('should return an error message for invalid scale', function() {
                    expect(this.app.appState.set({ zip: 44147, scale: 'kelvin' }, {validate: true})).to.be.false;
                    expect($('.js-alertText').text().indexOf(this.app.appState.scaleNotValid)).to.be.above(-1);
                });

            });

        });
    });
});
