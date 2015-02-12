var BLACKJACK = 21;

var Hand = module.exports = function () {
  this.value = 0;
  this.bust = false;
  this.cards = [];
};


Hand.prototype.addCard = function (card) {
  this.cards.push(card);
  this.calculateValue();
};

Hand.prototype.calculateValue = function () {
  var i;
  this.value = 0;
  this.value += this.cards.reduce(function (value, card) {
    return value + card;
  }, 0);



  for(i = 0; i < this.cards.length; i += 1) {
    if (this.value <= BLACKJACK) {
      break;
    }

    if (this.cards[i] === 11) {
      this.value -= 10;
    }
  }
  if (this.value > BLACKJACK) {
    this.bust = true;
  }
  return this.value;
};
