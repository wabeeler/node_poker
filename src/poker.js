'use strict';

/* 
 * RULES:
 * After investigatig the results of poker hands there apears to be an interesting representation
 * by reducing the number of duplicate cards and duplicate suits results in the following rule set
 *
 * High Card      : { cards: 5, suites: 4, score: 1 }
 * Pair           : { cards: 4, suites: 2 - 4, score: 2 }
 * 2 Pair         : { cards: 3, suites: 2 - 4, score: 3 }
 * 3 of a Kind    : { cards: 3, suits: 3 - 4, score: 4 }
 * Straight       : { cards: 5, suits: 2 - 4, score: 5 }
 * Flush          : { cards: 5, suits: 1, score: 6 }
 * Full House     : { cards: 2, suits: 3 - 4, score: 7 }
 * 4 of a Kind    : { cards: 2, suits: 4, score: 8 }
 * Straight Flush : { cards: 5, suits: 1, score: 9 }
 *
 * these rules can allow for us to quickly determine a winner, and only under certain circumstanses
 * will we be requied to deeply investigate the hands.  Note how the card count gets smaller as hands
 * get better.
 *
 */

class Poker {
  constructor( black, white ) {
    // Constants used to push winner to caller
    const BLACK = 'black winner';
    const WHITE = 'white winner';

    // Hold on to the original hands in case we need to reference them later
    this.black = black;
    this.white = white;

    // Pull in and class
    let Hand = require('./hand');

    this.blackHand = new Hand(black);
    this.whiteHand = new Hand(white);

    this.determineWinner();
  }

  determineWinner() {
    let blackCount = Object.keys(this.blackHand).length;
    let whiteCount = Object.keys(this.whiteHand).length;
  
    // Check for shortcut and be sure that we don't need to check for the rules
    // with a count of 5 that might be better other hands
    if( (blackCount < whiteCount && whiteCount !== 5) ||
        this.blackHand.score() > this.whiteHand.score() ) {
      console.log("BLACK WINS");
      return this.BLACK;
    }
    else {
      console.log("WHITE WINS");
      return this.WHITE;
    }

    // TODO have to account for two hands having the same score

  }
}

module.exports = Poker;
