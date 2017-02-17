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
    this.handScore; // this will be used so that the score only needs to be calculated once
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

  getValueArray() {
    // get the values and make sure they are numeric
    return Object.keys(this.values).map(Number);;
  }

  getSuitArray() {
    return Object.keys(this.suits);
  }

  getValueCount() {
    return Object.keys(this.values).length;
  }

  getSuitCount() {
    return Object.keys(this.suits).length;
  }

  // The scoring method isn't that complex that we could not just immediately call it
  // for every hand, but in certain cases it would be more effecient to only call this
  // method when needed.
  //
  score() {
    // This will internally cache the score so we only need to calcualte it once
    // since this value will not change we can do this.
    if( this.handScore ) {
      return this.handScore;
    }

    return this.calculateScore();
  }

  // Here too we can use the rules defined in poker to limit what we have to test
  calculateScore() {
    let cardCount = this.getValueCount();
    let score = 1;

    switch( cardCount ) {
      case 5:
        if( this.hasStraight() ) {
          if( this.hasFlush() ) {
            score = STRAIGHT_FLUSH;
          }
          else {
            score = STRAIGHT;
          }
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

    this.handScore = score;
    return this.handScore;
  }

  // TODO handle special case where A,2,3,4,5 is valid straight
  hasStraight() {
    let cardVals = this.getValueArray();

    // sort the array using numbers not strings
    cardVals.sort( (x,y) => { return x - y; });

    let isStraight = cardVals.every( (value, idx) => {
      if( cardVals.length === (idx + 1) ) {
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
    return this.getSuitCount() === 1;
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

  // by sorting the array and because we use numeric values, the last element will be the hightest value card
  getHighCard() {
    let cardVals = this.getValueArray();

    cardVals.sort( (x,y) => { return x - y; });

    return cardVals.pop();
  }

  // this method will look through the card values finding all values with the given count
  // ex hand = ['2C', '2D', '5S', '5D', '9H']
  // getGroupValues(2) will return [2,5]
  getGroupValue(count) {
    let values = [];
    for( var x in this.values ) {
      if( this.values[x] === count ) {
        values.push(x);
      }
    }

    // ensure that numeric values are returned
    return values.map(Number);
  }

}

module.exports = Hand;
