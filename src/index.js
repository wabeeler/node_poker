'use strict';

let ArgV = require('./argv');
const readline = require('readline');
const fs = require('fs');

let poker = require('./poker');
let winners = require('./const');

// get files or default to sample files
let inputFile = ArgV.getInputFile() || './data/sampleinput.txt';

// TODO: handle input file not exists
checkFileAccess(inputFile);

let rl = readline.createInterface({
  input: fs.createReadStream(inputFile)
});

rl.on('line', (line) => {
  // Parse Hands
  let hands = line.split(' ');

  // validate line
  if( hands.length !== 10 ) {
    throw new Error('Not enough cards on Line ' + line);
  }

  let blackHand = hands.slice(0,5);
  let whiteHand = hands.slice(5);

  let Poker = new poker(blackHand, whiteHand);
  let pokerResult = Poker.determineWinner();
  let output = 'Tie';

  // convert output to our actual string
  if( pokerResult === winners.BLACK ) {
    output = 'Black wins';
  }
  else if( pokerResult === winners.WHITE ) {
    output = 'White wins';
  }

  console.log(output);
});

// Readline will automatically close when the EOF is reached

function checkFileAccess( file, mode = fs.constants.R_OK ) {
  fs.access(file, mode, (error) => {
    if( error ) {
      console.error('Input file not readable, ' + file + '\n Error: ' + error);
      process.exit(1);
    }

    // check that file is indeed a file
    if( !fs.lstatSync(file).isFile() ) {
      console.error('Input file is not a file ' + file);
      process.exit(1);
    }
  });
}
