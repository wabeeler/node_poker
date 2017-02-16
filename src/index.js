'use strict';

let ArgV = require('./argv');
const readline = require('readline');
const fs = require('fs');

let poker = require('./poker');
let winners = require('./const');

// get files or default to sample files
let inputFile = ArgV.getInputFile() || './data/sampleinput.txt';
let outputFile = ArgV.getOutputFile() || './data/sampleoutput.txt';

// TODO: handle input file not exists
let rl = readline.createInterface({
  input: fs.createReadStream(inputFile)
});

// TODO output file

rl.on('line', function (line) {
  // Parse Hands
  let hands = line.split(' ');

  // validate line
  if( hands.length !== 10 ) {
    throw new Error('Not enough cards on Line ' + line);
  }

  let blackHand = hands.slice(0,5);
  let whiteHand = hands.slice(5);

  let Poker = new poker(blackHand, whiteHand);
  let output = Poker.determineWinner();

  console.log('Line from file:', line, output);
});
