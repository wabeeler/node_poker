'use strict';

module.exports.getInputFile = function() {
  let inputRegEx = new RegExp(/input=/,'i');
  let inputFileString;

  process.argv.some( (arg) => {
    if( inputRegEx.test(arg) ) {
      inputFileString = arg.split('=')[1];
      return true;
    }
  });

  return inputFileString;
}

module.exports.getOutputFile = function() {
  let outputRegEx = new RegExp(/output=/,'i');
  let outputFileString;

  process.argv.some( (arg) => {
    if( outputRegEx.test(arg) ) {
      outputFileString = arg.split('=')[1];
      return true;
    }
  });

  return outputFileString;
}

