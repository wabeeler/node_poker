'use strict';

class Card {

  static get card() {
    return this.card;
  }

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

    const suits = ['C', 'D', 'H', 'S'];

    if( cardStr.length !== 2 || !values.hasOwnProperty(cardStr[0]) || !suits.hasOwnProperty(cardsStr[1]) ) {
      throw new Error('Invalid Card', cardStr);
    }

    console.log("HERE");

    this.card = {
      'orig' : cardStr,
      'value': values[cardStr[0]],
      'suit': cardStr[1]
    };

    console.log("Card", card);
  }
}

module.exports = Card;
