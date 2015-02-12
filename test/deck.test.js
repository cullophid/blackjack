var expect = require('chai').expect;
var Deck = require('../app/js/deck');


describe('Deck', function () {
  it('should have 52 cards', function () {
    var deck = new Deck();
    expect(deck.cards.length).to.equal(52);
  });
  it('should return a random card when draw is called', function () {
    var deck = new Deck();
    var card = deck.draw();
    expect(card).to.be.a('Number');
    expect(deck.cards.length).to.equal(51);
  });
});
