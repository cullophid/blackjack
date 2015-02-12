var BLACKJACK = 21;
// init the hand
var Hand = module.exports = function () {
  this.value = 0;
  this.bust = false;
  this.cards = [];
};

// add a card to the hand
Hand.prototype.addCard = function (card) {
  this.cards.push(card);
  this.calculateValue();
};
// calculate the value of the player/dealers hand
Hand.prototype.calculateValue = function () {
  var i;
  this.value = 0;
  this.value += this.cards.reduce(function (value, card) {
    return value + card;
  }, 0);


// if we are above BLACKJACK we try to subtract 10 for each ace(11) in the hand
  for(i = 0; i < this.cards.length; i += 1) {
    if (this.value <= BLACKJACK) {
      break;
    }

    if (this.cards[i] === 11) {
      this.value -= 10;
    }
  }

  // if we are still above BLACKJACK we are bust
  if (this.value > BLACKJACK) {
    this.bust = true;
  }
  return this.value;
};
