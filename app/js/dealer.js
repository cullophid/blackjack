var Hand = require('./hand');
var BLACKJACK = 21;
var TARGETSCORE = 16;
var Dealer = module.exports = function (deck) {
  this.deck = deck;
  this.hand = new Hand();
  // start with two cards
  this.hand.addCard(deck.draw());
  this.hand.addCard(deck.draw());
};

Dealer.prototype.play = function () {
  while (this.hand.value < TARGETSCORE && !this.hand.bust) {
    this.hand.addCard(this.deck.draw());
  }
};
