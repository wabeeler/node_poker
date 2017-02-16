'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var expect = chai.expect;

chai.use(sinonChai);

var winners = require('../src/const');

var sandbox,
    mockHand,
    mockHandMethods,
    poker,
    handStr = '2C 3D 9H QH 7C';

describe('Poker Class', function() {
  beforeEach( function() {
    sandbox = sinon.sandbox.create();

    // by creating these as stubs we can then inject our own values 
    // and not call the actual methods
    mockHandMethods = {
      getSuitArray: sandbox.stub(),
      getSuitCount: sandbox.stub(), 
      getValueArray: sandbox.stub(),
      getValueCount: sandbox.stub(),
      getHighCard: sandbox.stub().returns(2),
      getGroupValue: sandbox.stub().returns([2]),
      score: sandbox.stub()
    };

    // this allows us to mock the constructor method
    mockHand = sandbox.stub().returns(mockHandMethods);

    // this allows us to mock the hand class inside the poker class by injecting our mock
    // by intercepting the require statement
    poker = proxyquire('../src/poker', { './hand': mockHand });
    
  });

  afterEach( function() {
    sandbox.restore();
  });

  it('should exist', function() {
    let Poker = new poker(handStr, handStr);
    expect(Poker).to.be.an.instanceOf(poker);

    // check that our stubs are working correctly
    expect(mockHand).to.have.been.called;
  });

  describe('determine winner', function() {
    var Poker;

    beforeEach(function() {
      // while these hands are the same, we will use the stubs to controll
      // various outcomes
      Poker = new poker(handStr, handStr);
    });

    it('black lower count', function() {
      mockHandMethods.getValueCount.onCall(0).returns(3); // this mocks black having 2 pair or 3 of a kind
      mockHandMethods.getValueCount.onCall(1).returns(4); // this mocks white having a pair

      expect(Poker.determineWinner()).to.equal(winners.BLACK);
    });

    it('should call compare equal', function() {
      mockHandMethods.getValueCount.returns(3);
      mockHandMethods.score.returns(4);

      let compareSpy = sandbox.spy(Poker, 'compareEqual');

      Poker.determineWinner();

      expect(compareSpy).to.have.been.called;
    });

  });

  describe('compare equal', function() {
    it('should throw an error', function() {
      mockHandMethods.score.onCall(0).returns(1);
      mockHandMethods.score.onCall(1).returns(2);

      let Poker = new poker(handStr, handStr);
      expect(Poker.compareEqual).to.throw(Error);
    });
  });

  // The folowoing descriptions fall more into functional testing
  // than unit testing, but I felt they were important to include here
  describe('compare high cards', function() {
    var Poker;

    beforeEach(function() {
      Poker = new poker(handStr, handStr);
    });

    it('should predict black winner', function() {
      mockHandMethods.getValueArray.onCall(0).returns([2,3,5,7,9]);
      mockHandMethods.getValueArray.onCall(1).returns([2,3,4,7,9]);

      expect(Poker.compareHighCards()).to.equal(winners.BLACK);
    });

    it('should predict white winner', function() {
      mockHandMethods.getValueArray.onCall(0).returns([2,3,4,7,9]);
      mockHandMethods.getValueArray.onCall(1).returns([2,3,5,7,9]);

      expect(Poker.compareHighCards()).to.equal(winners.WHITE);
    });

    it('should reutn a tie', function() {
      mockHandMethods.getValueArray.onCall(0).returns([2,3,5,7,9]);
      mockHandMethods.getValueArray.onCall(1).returns([2,3,5,7,9]);

      expect(Poker.compareHighCards()).to.equal(winners.TIE);
    });
  });

  describe('compare pair', function() {
    var Poker;

    beforeEach(function() {
      Poker = new poker(handStr, handStr);
    });

    it('should predict black winner', function() {
      mockHandMethods.getGroupValue.onCall(0).returns([10]);
      mockHandMethods.getGroupValue.onCall(1).returns([5]);

      expect(Poker.comparePair()).to.equal(winners.BLACK);
    });
    
    it('should predict white winner', function() {
      mockHandMethods.getGroupValue.onCall(0).returns([2]);
      mockHandMethods.getGroupValue.onCall(1).returns([5]);

      expect(Poker.comparePair()).to.equal(winners.WHITE);
    });

    it('shoudl call compare high card if pairs match', function() {
      mockHandMethods.getGroupValue.onCall(0).returns([5]);
      mockHandMethods.getGroupValue.onCall(1).returns([5]);
      
      mockHandMethods.getValueArray.onCall(0).returns([2,3,5,5,9]);
      mockHandMethods.getValueArray.onCall(1).returns([2,4,5,5,9]);

      let highCardSpy = sandbox.spy(Poker, 'compareHighCards');

      expect(Poker.comparePair()).to.equal(winners.WHITE);
      expect(highCardSpy).to.have.been.calledOnce;
    });
  });

  describe('compare two pair', function() {
    var Poker;

    beforeEach(function() {
      Poker = new poker(handStr, handStr);
    });

    it('should declare black on first pair', function() {
      mockHandMethods.getGroupValue.onCall(0).returns([2,7]);
      mockHandMethods.getGroupValue.onCall(1).returns([5,6]);

      expect(Poker.compareTwoPair()).to.equal(winners.BLACK);
    });
    
    it('should declare black on the second pair', function() {
      mockHandMethods.getGroupValue.onCall(0).returns([4,6]);
      mockHandMethods.getGroupValue.onCall(1).returns([2,6]);

      expect(Poker.compareTwoPair()).to.equal(winners.BLACK);
    });

    it('shoudl call compare high card if pairs match', function() {
      mockHandMethods.getGroupValue.onCall(0).returns([5,10]);
      mockHandMethods.getGroupValue.onCall(1).returns([5,10]);
      
      mockHandMethods.getValueArray.onCall(0).returns([5,5,7,10,10]);
      mockHandMethods.getValueArray.onCall(1).returns([2,5,5,10,10]);

      let highCardSpy = sandbox.spy(Poker, 'compareHighCards');

      expect(Poker.comparePair()).to.equal(winners.BLACK);
      expect(highCardSpy).to.have.been.calledOnce;
    });
  });
});
