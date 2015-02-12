var Hand = require('./hand');
var Dealer = require('./dealer');
var Deck = require('./deck');

// init the game with a dealer and a player
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
// called when player presses HIT button
Game.prototype.playerHit = function () {
  if (!this.isPlayerTurn) {
    return;
  }
  // add a card to the players hand
  this.player.hand.addCard(this.deck.draw());
  this.events.trigger('playerUpdate');
  // if the player is bust call game end;
  if (this.player.hand.bust) {
    this.events.trigger('playerBust');
    this.events.trigger('gameEnd');
  }
};

// called when player presses STAY button
Game.prototype.playerStay = function () {
  if (!this.isPlayerTurn) {
    return;
  }
  this.dealerTurn();
};
// let the dealer play
Game.prototype.dealerTurn = function () {
  this.isPlayerTurn = false;
  this.dealer.play(); // trigger the dealer ai
  this.events.trigger('dealerUpdate');
  this.events.trigger('gameEnd');
};

  // return the winner of the game
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
