'use strict';

const HIGH_CARD = 1;
const PAIR = 2;
const TWO_PAIR = 3;
const THREE_OF_A_KIND = 4;
const STRAIGHT = 5;
const FLUSH = 6;
const FULL_HOUSE = 7;
const FOUR_OF_A_KIND = 8;
const STRAIGHT_FLUSH = 9;

class Hand {
  constructor( handArr ) {
    if( handArr.length !== 5 ) {
      throw new Error('Invalid number of cards in hand', handArr);
    }

    this.hand = handArr;
    this.suits = {}; // Object where the key is the suit abbreviation and the value is the count of that suit in the hand
    this.values = {}; // Object where the key is the card value and the value is the count of said card value in the hand
    this.cards = []; // Array of card objects for each card in the hand
    this.Card = require('./card');

    this.convertHand();
  }
  
  /*
   * This mehtod uses a single loop to reduce the users hand for comparison
   */
  convertHand() {
    this.hand.forEach( (card) => {
      // validate each card
      let cardObj = new this.Card(card);

      this.cards.push(cardObj);

      if( this.suits.hasOwnProperty(cardObj.suit) ) {
        this.suits[cardObj.suit] += 1;
      }
      else {
        this.suits[cardObj.suit] = 1;
      }

      if( this.values.hasOwnProperty(cardObj.value) ) {
        this.values[cardObj.value] += 1;
      }
      else {
        this.values[cardObj.value] = 1;
      }
    });
  }

  // Here too we can use the rules to limit what winning we have to test for
  score() {
    let cardCount = Object.keys(this.values).length;
    let score = 1;

    switch( cardCount ) {
      case 5:
        if( this.hasStraight() ) {
          if( this.hasFlush() ) {
            score = this.STRAIGHT_FLUSH;
          }
        
          score = STRAIGHT;
        }
        else if( this.hasFlush() ) {
          score = FLUSH;
        }
        else {
          score = HIGH_CARD;
        }
        break;

      case 4:
        score = PAIR;
        break;

      case 3:
        score = this.hasThreeOfAKind() ? THREE_OF_A_KIND : TWO_PAIR;
        break;

      case 2:
        score = this.hasFourOfAKind() ? FOUR_OF_A_KIND : FULL_HOUSE;
        break;
    }

    console.log("REturning", score);

    return score;
  }

  hasStraight() {
    let cardVals = Object.keys(this.values).map(Number);

    // sort the array using numbers not strings
    cardVals.sort( (x,y) => { return x - y; });

    let isStraight = cardVals.every( (value, idx) => {
      if( cardVals.length < (idx + 1) ) {
        // we have reached the end
        return true;
      }

      let nextValue = cardVals[idx + 1];

      if ( value + 1 === nextValue ) {
        return true;
      }
      else {
        return false;
      }
    });

    return isStraight;
  }

  hasFlush() {
    return Object.keys(this.suits).length === 1;
  }

  hasThreeOfAKind() {
    let toak = false;

    for( var x in this.values ) {
      let count = this.values[x];
      if( count === 3 ) {
        toak = true;
        break; // short circuit loop once we've found what we're looking for
      }
    }

    return toak;
  }

  hasFourOfAKind() {
    let foak = false;

    for( var x in this.values ) {
      let count = this.values[x];

      if( count === 4 ) {
        foak = true;
        break; // short circuit loop once we've found what were looking for
      }
    }

    return foak;
  }
}

module.exports = Hand;
