'use strict';

/* 
 * RULES:
 * After investigatig the results of poker hands there apears to be an interesting representation
 * by reducing the number of duplicate cards and duplicate suits results in the following rule set
 *
 * Pair           : { cards: 4, suites: 2 - 4 }
 * 2 Pair         : { cards: 3, suites: 2 - 4 }
 * 3 of a Kind    : { cards: 3, suits: 3 - 4 }
 * Straight       : { cards: 5, suits: 2 - 4 }
 * Flush          : { cards: 5, suits: 1 }
 * Full House     : { cards: 2, suits: 3 - 4 }
 * 4 of a Kind    : { cards: 2, suits: 4 }
 * Straight Flush : { cards: 5, suits: 1 }
 *
 * these rules can allow for us to quickly determine a winner, and only under certain circumstanses
 * will we be requied to deeply investigate the hands
 *
 */

class Poker {
  constructor( blackHand, whiteHand ) {
    this.handParser = require('./hand');
    this.blackHand = blackHand;
    this.whiteHand = whiteHand;

    this.blackObj = new this.handParser(blackHand).convertHand();
  }
}

module.exports = Poker;
