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
    this.winners = require('./const');

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
    if( (blackCount < whiteCount && whiteCount !== 5) || this.blackHand.score() > this.whiteHand.score() ) {
      return this.winners.BLACK;
    }
    else if( this.blackHand.score() === this.whiteHand.score() ) {
      return this.compareEqual();
    }
    else {
      return this.winners.WHITE;
    }
  }

  compareEqual() {
    if( this.blackHand.score() !== this.whiteHand.score() ) {
      throw new Error('compareEqual, Error scores not equal, Black Score = ' + this.blackHand.score() + ', White Score = ' + this.whiteHand.score());
    }

    // because we now know that the scores are equal we can branch on one
    switch( this.blackHand.score() ) {
      case 1:
      case 6:
        return this.compareHighCards();
        break;

      case 5:
      case 9:
        // When we have consecutive card values, we only need to compare
        // the highest card to determine the winner
        if( this.blackHand.getHighCard() === this.whiteHand.getHighCard() ) {
          return this.winners.TIE;
        }
        else if ( this.blackHand.getHighCard() > this.whiteHand.getHighCard() ) {
          return this.winners.BLACK
        }
        else {
         return this.winners.WHITE;
        }
        break;

      case 2:
        return this.comparePair();
        break;

      case 3:
        return this.compareTwoPair();
        break;

      case 4:
      case 7:
        return this.blackHand.getGroupValue(3)[0] > this.whiteHand.getGroupValue(3)[0] ? this.winners.BLACK : this.winners.WHITE;
        break;

      case 8:
        return this.blackHand.getGroupValue(4)[0] > this.whiteHand.getGroupValue(4)[0] ? this.winners.BLACK : this.winners.WHITE;
        break;
    }
  }

  compareHighCards() {
    let black = this.blackHand.getValueArray().reverse();
    let white = this.whiteHand.getValueArray().reverse();
    let winner = this.winners.TIE;

    black.some( (value, idx) => {
      if( value > white[idx] ) {
        winner = this.winners.BLACK;
        return true; // this breaks the some loop
      }
      else if( value < white[idx] ) {
        winner = this.winners.WHITE;
        return true;
      }
    });

    return winner;
  }

  comparePair() {
    let blackPair = this.blackHand.getGroupValue(2)[0];
    let whitePair = this.whiteHand.getGroupValue(2)[0];

    if( blackPair > whitePair ) {
      return this.winners.BLACK;
    }
    else if( blackPair < whitePair ) {
      return this.winners.WHITE;
    }
    else {
      return this.compareHighCards();
    }
  }

  compareTwoPair() {
    // these will be unordered arrays of the pair values
    let black = this.blackHand.getGroupValue(2);
    let white = this.whiteHand.getGroupValue(2);
    let winner = this.winners.TIE;

    // TODO turn this sort into a unitily function
    // these are now sorted descending
    black.sort( (x,y) => { return y - x; });
    white.sort( (x,y) => { return y - x; });

    black.some( (value, idx) => {
      if( value > white[idx] ) {
        winner = this.winners.BLACK;
        return true;
      }
      else if( value < white[idx] ) {
        winner = this.winners.WHITE;
        return true;
      }
    });

    if( winner === this.winners.TIE ) {
      winner = this.compareHighCards();
    }

    return winner;
  }
}

module.exports = Poker;
