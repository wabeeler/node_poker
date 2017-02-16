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

const BLACK = 'black winner';
const WHITE = 'white winner';
const TIE = 'tie';

class Poker {
  constructor( black, white ) {
    // Constants used to push winner to caller

    // Hold on to the original hands in case we need to reference them later
    this.black = black;
    this.white = white;

    // Pull in and class
    let Hand = require('./hand');

    this.blackHand = new Hand(black);
    this.whiteHand = new Hand(white);
  }

  determineWinner() {
    let blackCount = this.blackHand.getValueCount();
    let whiteCount = this.whiteHand.getValueCount();
  
    // Check for shortcut and be sure that we don't need to check for the rules
    // with a count of 5 that might be better other hands
    if( blackCount < whiteCount || this.blackHand.score() > this.whiteHand.score() ) {
      return BLACK;
    }
    else if( this.blackHand.score() === this.whiteHand.score() ) {
      console.log("Comparing winner");
      this.compareEqual();
    }
    else {
      console.log("WHITE WINS");
      return WHITE;
    }
  }

  compareEqual() {
    if( this.blackHand.score() !== this.whiteHand.score() ) {
      throw new Error('compareEqual, Error scores not equal, Black Score = ' + this.blackHand.score() + ', White Score = ' + this.whiteHand.score());
    }

    // because we now know that the scores are equal we can branch on one
    switch( this.blackHand.score() ) {
      case 1:
        return this.compareHighCards();
        break;

      case 5:
      case 6:
      case 9:
        return this.blackHand.getHighCard() > this.whiteHand.getHighCard() ? BLACK : WHITE;
        break;

      case 2:
        return this.comparePair();
        break;

      case 3:
        return this.comapreTwoPairs();
        break;

      case 4:
      case 7:
        return this.blackHand.getGroupValue(3)[0] > this.whiteHand.getGroupValue(3)[0] ? BLACK : WHITE;
        break;

      case 8:
        return this.blackHand.getGroupValue(4)[0] > this.whiteHand.getGroupValue(4)[0] ? BLACK : WHITE;
        break;
    }
  }

  compareHighCards() {
    let black = this.blackHand.getValueArray().reverse();
    let white = this.whiteHand.getValueArray().reverse();
    let winner = TIE;

    black.some( (value, idx) => {
      if( value > white[idx] ) {
        winner = BLACK;
        return true; // this breaks the some loop
      }
      else if( value < white[idx] ) {
        winner = WHITE;
        return true;
      }
    });

    return winner;
  }

  comparePair() {
    let blackPair = this.blackHand.getGroupValue(2)[0];
    let whitePair = this.whiteHand.getGroupValue(2)[0];

    if( blackPair > whitePair ) {
      return BLACK;
    }
    else if( blackPair < whitePair ) {
      return WHITE;
    }
    else {
      return this.compareHighCards();
    }
  }

  compareTwoPair() {
    // these will be unordered arrays of the pair values
    let black = this.blackHand.getGroupValue(2);
    let white = this.whiteHand.getGroupValue(2);
    let winner = TIE;

    // TODO turn this sort into a unitily function
    // these are now sorted descending
    black.sort( (x,y) => { return y - x; });
    white.sort( (x,y) => { return y - x; });

    black.some( (value, idx) => {
      if( value > white[idx] ) {
        winner = BLACK;
        return true;
      }
      else if( value < white[idx] ) {
        winner = WHITE;
        return true;
      }
    });

    if( winner === TIE ) {
      winner = this.compareHighCards();
    }

    return winner;
  }
}

module.exports = Poker;
