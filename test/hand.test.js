var expect = require('chai').expect;
var Hand = require('../app/js/hand');


describe('Hand', function () {
  var hand;
  beforeEach(function () {
    hand = new Hand();
  })
  it('start with no cards and a value of 0', function () {
    expect(hand.cards.length).to.equal(0);
  });
  it('should recalculate value when a card is added', function () {
    hand.addCard(10);
    expect(hand.cards.length).to.equal(1);
    expect(hand.value).to.equal(10);
    expect(hand.bust).to.equal(false);

  });
  it('should add up the value of cards in the hand', function () {
    hand.addCard(10);
    hand.addCard(9);
    expect(hand.cards.length).to.equal(2);
    expect(hand.value).to.equal(19);
    expect(hand.bust).to.equal(false);
  });
  it('should count aces as 1 if the total value is over 21', function () {
    hand.addCard(10);
    hand.addCard(11);
    hand.addCard(10);
    expect(hand.cards.length).to.equal(3);
    expect(hand.value).to.equal(21);
    expect(hand.bust).to.equal(false);
  });
  it('should only count aces as 1 if needed', function () {
    hand.addCard(9);
    hand.addCard(11);
    hand.addCard(11);
    expect(hand.cards.length).to.equal(3);
    expect(hand.value).to.equal(21);
    expect(hand.bust).to.equal(false);
  });
  it('should count a hand as bust if value is over 21', function () {
    hand.addCard(9);
    hand.addCard(10);
    hand.addCard(3);
    expect(hand.cards.length).to.equal(3);
    expect(hand.value).to.equal(22);
    expect(hand.bust).to.equal(true);
  });

});
