'use strict';

let ArgV = require('./argv');
const readline = require('readline');
const fs = require('fs');

let Poker = require('./poker');
let winners = require('./const');

// get files or default to sample files
let inputFile = ArgV.getInputFile() || './data/sampleinput.txt';
let outputFile = ArgV.getOutputFile() || './data/sampleoutput.txt';

let rl = readline.createInterface({
  input: fs.createReadStream(inputFile)
});

rl.on('line', function (line) {
  // TODO: validate line
  // Parse Hands
  let hands = line.split(' ');

  if( hands.length !== 10 ) {
    throw new Error('Not enough cards on Line ' + line);
  }

  let blackHand = hands.slice(0,5);
  let whiteHand = hands.slice(5);
  let output = new Poker(blackHand, whiteHand);
  console.log('Line from file:', line, hands, blackHand, whiteHand);
});
