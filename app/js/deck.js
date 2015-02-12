'use strict';

var Deck = module.exports = function () {
   this.cards = [];
   this.build();
};

Deck.prototype.build = function () {

  var i;
  // for each number from 2 to 9 add one card for each suit
  for (i= 2; i<10; i += 1) {

    this.cards.push(i);
    this.cards.push(i);
    this.cards.push(i);
    this.cards.push(i);
  }
  // add 12 picture cards and 4 10
  for (i= 0; i<16; i += 1) {
    this.cards.push(10);
  }
  // add 4 aces
  this.cards.push(11);
  this.cards.push(11);
  this.cards.push(11);
  this.cards.push(11);
};

Deck.prototype.draw = function () {
  var i = Math.round(Math.random() * this.cards.length);
  return this.cards.splice(i, 1)[0];
};
