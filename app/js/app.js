var $ = require('jquery');

(function () {
  'use strict';
  var Game = require('./game');
  // create a new game instance. We use window as out envet emitter. In a larger app we might want to use a different emitter;
  var game = new Game($(window));

  $(document).ready(init); // setup the game

  function init () {
    renderPlayer();
    renderDealer();
    $('button[name=hit]').click(function () {
      game.playerHit();
    });
    $('button[name=stay]').click(function () {
      game.playerStay();
    });
  }
  $(window).on('playerUpdate', renderPlayer);
  $(window).on('dealerUpdate', renderDealer);
  $(window).on('gameEnd', showFinalScore);

  // render the players hand
  function renderPlayer () {
    var $player = $('#player');
    var $cards = $player.find('[data-cards]');
    var $bust = $player.find('[data-bust]');
    // this could be done with a document fragment
    // for performance, but we might want to animate the cards later.
    $cards.children().remove();
    $bust.hide();


    game.player.hand.cards.forEach(function (card) {
      $cards.append(renderCard(card));
    });

    if (game.player.hand.bust) {
      $bust.show();
    }

  }
  // render the dealers hand
  function renderDealer () {
    var $dealer = $('#dealer');
    var $cards = $dealer.find('[data-cards]');
    var $bust = $dealer.find('[data-bust]');
    $cards.children().remove();
    $bust.hide();

    game.dealer.hand.cards.forEach(function (card) {
      $cards.append(renderCard(card));
    });

    if (game.dealer.hand.bust) {
      $bust.show();
    }
  }
  // return a dom element representing a card
  function renderCard (value) {
    return $('<li/>', {'class' : 'card'})
      .append($('<h1>', {'text': value}));
  }

  // show the winner of the game
  function showFinalScore () {
    var $score = $('#score');
    var $dealer = $('#dealer');
    $score.show();
    $score.find('[data-score]').text(game.getFinalScore());
    $dealer.removeClass('secret');
  }

})();
