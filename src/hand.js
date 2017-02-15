'use strict';

class Hand {
  constructor( handArr ) {
    if( handArr.length !== 5 ) {
      throw new Error('Invalid number of cards in hand', handArr);
    }

    this.hand = handArr;
    this.suits = [];
    this.values = [];
    this.Card = require('./card');
  }
  
  /*
   * This mehtod uses a single loop to reduce the users hand for comparison
   */
  convertHand() {
    this.hand.forEach( (card) => {
      // validate each card
      console.log("Card", card[0], card[1], card.length);

    });
  }
}

module.exports = Hand;
