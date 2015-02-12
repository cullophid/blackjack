var Hand = require('./hand');
var Dealer = require('./dealer');
var Deck = require('./deck');
var Game = module.exports = function (events) {
  this.isPlayerTurn = true;
  this.events = events;
  this.deck = new Deck();
  this.player = {
    hand :  new Hand(),
    done : false
  };
  //player starts with two cards;
  this.player.hand.addCard(this.deck.draw());
  this.player.hand.addCard(this.deck.draw());

  this.dealer = new Dealer(this.deck);
};

Game.prototype.playerHit = function () {
  if (!this.isPlayerTurn) {
    return;
  }

  this.player.hand.addCard(this.deck.draw());
  this.events.trigger('playerUpdate');
  if (this.player.hand.bust) {
    this.events.trigger('playerBust');
    this.dealerTurn();
  }
};

Game.prototype.playerStay = function () {
  if (!this.isPlayerTurn) {
    return;
  }
  this.dealerTurn();
};

Game.prototype.dealerTurn = function () {
  this.isPlayerTurn = false;
  this.dealer.play();
  this.events.trigger('dealerUpdate');
  this.events.trigger('gameEnd');
};

Game.prototype.getFinalScore = function () {
  if (this.player.hand.bust) {
    return 'Dealer wins!';
  }
  if (this.dealer.hand.bust) {
    return 'Player wins!';
  }

  if (this.player.hand.value > this.dealer.hand.value) {
    return 'Player wins!';
  }
  return 'Dealer wins!';
};
