'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;

chai.use(sinonChai);

var sandbox;
var card = require('../src/card');
var cardString = '2D';

describe('Card Class', function() {
  beforeEach( function() {
    sandbox = sinon.sandbox.create();
  });

  afterEach( function() {
    sandbox.restore();
  });

  it('should exist', function() {
    expect(card).to.be.an('function');

    let Card = new card(cardString);
    expect(Card).to.be.an.instanceOf(card);
  });

  it('should throw an error on invalid card string', function() {
    // we have to wrap the instantiation to test error states
    let cardInit = function() {
      new card('');
    }

    expect(cardInit).to.throw(/Invalid Card/);
  });
  
  it('should throw an error on invalid card value', function() {
    // we have to wrap the instantiation to test error states
    let cardInit = function() {
      new card('ZD');
    }

    expect(cardInit).to.throw(/Invalid Card/);
  });

  it('should throw an error on invalid card suit', function() {
    // we have to wrap the instantiation to test error states
    let cardInit = function() {
      new card('2Q');
    }

    expect(cardInit).to.throw(/Invalid Card/);
  });

  it('should properly parse the card', function() {
    let Card = new card(cardString);

    expect(Card.value).to.equal(2);
    expect(Card.suit).to.equal('D');
  });

  it('should appropriately assign value for a 10', function() {
    let Card = new card('TD');
    expect(Card.value).to.equal(10);
  });

  it('should appropriately assign value for a Jack', function() {
    let Card = new card('JH');
    expect(Card.value).to.equal(11);
  });

  it('should appropriately assign value for a Queen', function() {
    let Card = new card('QS');
    expect(Card.value).to.equal(12);
  });

  it('should appropriately assign value for a King', function() {
    let Card = new card('KD');
    expect(Card.value).to.equal(13);
  });
  
  it('should appropriately assign value for a Ace', function() {
    let Card = new card('AH');
    expect(Card.value).to.equal(14);
  });
});
