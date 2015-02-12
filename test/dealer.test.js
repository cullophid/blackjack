var expect = require('chai').expect;
var Dealer = require('../app/js/dealer');
var Deck = require('../app/js/deck');


describe('Dealer', function () {
  it('should start with 2 cards', function () {
    var dealer = new Dealer(new Deck());
    expect(dealer.hand.cards.length).to.equal(2);
  });
  it('should play until >=16 or bust', function () {
    var dealer = new Dealer(new Deck());
    dealer.play();
    if (!dealer.hand.bust) {
      expect(dealer.hand.value).to.be.gte(16);
      expect(dealer.hand.value).to.be.lte(21);
    }
    if (dealer.hand.bust) {
      expect(dealer.hand.value).to.be.gt(21);
      expect(dealer.hand.value).to.be.lte(30);
    }
  });
});
