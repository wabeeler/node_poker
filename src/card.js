'use strict';

class Card {

  constructor(cardStr) {
    const values = {
      '2' : 2,
      '3' : 3,
      '4' : 4,
      '5' : 5,
      '6' : 6,
      '7' : 7,
      '8' : 8,
      '9' : 9,
      'T' : 10,
      'J' : 11,
      'Q' : 12,
      'K' : 13,
      'A' : 14
    };

    const suits = {
      'C': true,
      'D': true,
      'H': true,
      'S': true
    };

    if( cardStr.length !== 2 || !values.hasOwnProperty(cardStr[0]) || !suits.hasOwnProperty(cardStr[1]) ) {
      throw Error('Invalid Card = ' + cardStr);
    }

    this.orig = cardStr;
    this.value = values[cardStr[0]],
    this.suit = cardStr[1]
  }
}

module.exports = Card;
