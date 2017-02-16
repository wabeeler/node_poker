'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;

chai.use(sinonChai);

var sandbox;

describe('Hand Class', function() {
  beforeEach( function() {
    sandbox = sinon.sandbox.create();

    
  });

  afterEach( function() {
    sandbox.restore();
  });
