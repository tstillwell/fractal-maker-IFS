#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptForIFS(){
  rl.question('Please enter an IFS equation ', (equation) => {
    if (isValidEquation(`${equation}`)){
      // process equation params
    }
    else {
      console.log("Invalid equation");
    }
    rl.close();
  });
}

function isValidEquation (equation) {
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

function makeFractal(equations) {
  // generate fractal from IFS equations
  let initialPoint = [1,1];
  let points = [];
  let pointCount = 0;
  let pointLimit = 1000;
  while (pointCount <= pointLimit){
    pointCount += 1;
  }
  return points;
}

function generateNextPoint(point, IFSparams){
  	// generate next point
	// using provided IFS equation parameters
}

function plotPoints(points){
  // plot array of points
}