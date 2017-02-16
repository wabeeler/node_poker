'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;

chai.use(sinonChai);

var sandbox;
var hand = require('../src/hand');
var handArr = ['2C', '3D', '9H', 'QH', '7C'];
var handPair = ['KD', 'KS', 'QD', 'JH', '2D'];
var hand2Pair = ['KD', 'KS', 'QD', 'QH', '2D'];
var hand3Kind = ['KD', 'KS', 'QD', 'KH', '2D'];
var handStraight = ['2D', '3H', '4S', '5C', '6D'];
var handFlush = ['3S', '7S', '2S', 'KS', 'TS'];
var handFullHouse = ['5C', '5S', '5H', 'JD', 'JH'];
var hand4Kind = ['7S', '7C', '7D', '7H', 'JS'];
var handStraightFlush = ['5C', '6C', '7C', '8C', '9C'];

describe('Hand Class', function() {
  beforeEach( function() {
    sandbox = sinon.sandbox.create();
  });

  afterEach( function() {
    sandbox.restore();
  });

  it('should exist', function() {
    expect(hand).to.be.an('function');

    let Hand = new hand(handArr);
    expect(Hand).to.be.an.instanceOf(hand);
  });

  it('should error on invalid input', function() {
    let shortHand = function() {
      new hand(['2D']);
    }

    let longHand = function() {
      new hand(['2D', '3D', '4D', '5D', '6D', '7D']);
    }

    expect(shortHand).to.throw(/Invalid number/);
    expect(longHand).to.throw(/Invalid number/);
  });

  describe('ConvertHand', function() {
    var Hand;

    beforeEach(function() {
      Hand = new hand(handArr);
    })

    it('should build the hand object', function() {
      expect(Hand.hand).to.equal(handArr);
      expect(Hand.getValueCount()).to.equal(5);
      expect(Hand.getSuitCount()).to.equal(3);
    });

    it('should count duplicate suits', function() {
      expect(Hand.suits.C).to.equal(2);
    });

    it('should count duplicate card values', function() {
      let Hand = new hand(['2D', '2C', '2S', '3D', '4S']);

      expect(Hand.values['2']).to.equal(3);
    });
  });

  describe('evaluation function tests', function() {
    describe('has straight', function() {
      it('should have a stright', function() {
        let Hand = new hand(handStraight);

        expect(Hand.hasStraight()).to.be.true;
      });

      it('should NOT have a straight', function() {
        let Hand = new hand(handPair);
        
        expect(Hand.hasStraight()).to.be.false;
      });
    });

    describe('has flush', function() {
      it('should have flush', function() {
        let Hand = new hand(handFlush);
        
        expect(Hand.hasFlush()).to.be.true;
      });

      it('should NOT have flush', function() {
        let Hand = new hand(handPair);
        
        expect(Hand.hasFlush()).to.be.false;
      });
    });

    describe('has three of a kind', function() {
      it('should have three of a kind', function() {
        let Hand = new hand(hand3Kind);

        expect(Hand.hasThreeOfAKind()).to.be.true;
      });

      it('should NOT have three of a kind', function() {
        let Hand = new hand(handPair);

        expect(Hand.hasThreeOfAKind()).to.be.false;
      });
    });

    describe('has four of a kind', function() {
      it('should have four of a kind', function() {
        let Hand = new hand(hand4Kind);

        expect(Hand.hasFourOfAKind()).to.be.true;
      });

      it('should NOT have four of a kind', function() {
        let Hand = new hand(handPair);

        expect(Hand.hasFourOfAKind()).to.be.false;
      });

    });
  });

  describe('calculateScore tests', function() {
    it('should score a pair', function() {
      let Hand = new hand(handPair);

      expect(Hand.calculateScore()).to.equal(2);
    });

    it('should score 2 pair', function() {
      let Hand = new hand(hand2Pair);

      expect(Hand.calculateScore()).to.equal(3);
    });

    it('should score 3 of a kind', function() {
      let Hand = new hand(hand3Kind);

      expect(Hand.calculateScore()).to.equal(4);
    });

    it('should score a straight', function() {
      let Hand = new hand(handStraight);
      
      expect(Hand.calculateScore()).to.equal(5);
    }); 

    it('should score a flush', function() {
      let Hand = new hand(handFlush);
      
      expect(Hand.calculateScore()).to.equal(6);
    }); 

    it('should score a full house', function() {
      let Hand = new hand(handFullHouse);
      
      expect(Hand.calculateScore()).to.equal(7);
    }); 
    
    it('should score a 4 of a kind', function() {
      let Hand = new hand(hand4Kind);
      
      expect(Hand.calculateScore()).to.equal(8);
    }); 

    it('should score a straight flush', function() {
      let Hand = new hand(handStraightFlush);
      
      expect(Hand.calculateScore()).to.equal(9);
    }); 
  });

  describe('score method tests', function() {
    var calculateSpy;
    var Hand;
    
    beforeEach(function() {
      Hand = new hand(handPair);
      calculateSpy = sandbox.spy(Hand, 'calculateScore');
    });

    it('should call calculateScore', function() {
      Hand.score();
      expect(calculateSpy).to.have.been.calledOnce;
    });

    it('should cache the scoring result', function() {
      Hand.score();
      Hand.score();
      expect(calculateSpy).to.have.been.calledOnce;
    })
  });

});
