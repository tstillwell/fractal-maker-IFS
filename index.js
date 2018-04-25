#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter an IFS equation ', (equation) => {
  validateEquation(`${equation}`);
  rl.close();
});

function validateEquation (equation) {
  // confirm equation is in expected format
  // IFS parameters should be 6 or 7 decimal coefficients
  let coefficients = equation.split(" ");
  if (coefficients.length == (6 || 7) && (coefficients.every(isNumeric))){
    return true;
  }
  else {
    return false;
  }
}

function isNumeric(n) {
  // https://stackoverflow.com/a/1830844
  // verify an input is in fact numeric
  return !isNaN(parseFloat(n)) && isFinite(n);
}