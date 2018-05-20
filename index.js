#!/usr/bin/env node
const readline = require('readline');
const Canvas = require('canvas');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function init(){
  let input = promptForIFS();
}

function promptForIFS(){
  let equations = [];
  rl.setPrompt('IFS equation> ');
  rl.prompt();
  rl.on('line', (line) => {
  switch (isValidEquation(line)) {
    case true:
      console.log('valid input!');
      equations.push(line.split(" "));
      break;
    case false:
      if (line == ""){
        return makeFractal(equations, 1000000);
      }
      else {
        console.log('invalid input!');
        return;
      }
  }
  });
}

function isValidEquation (equation) {
  // confirm equation is in expected format
  // IFS parameters should be 7 decimal coefficients
  let coefficients = equation.split(" ");
  if (coefficients.length == (7) && (coefficients.every(isNumeric))){
    return true;
  }
  else {
    return false;
  }
}

function isNumeric(n) {
  // https://stackoverflow.com/a/1830844
  // true if n is a number
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function makeFractal(equations, points_count) {
  // generate fractal from IFS equations
  // points_count should be total number of points to plot
  let points = [];
  points.push([1,1]); // starting point
  let index = 0;
  let pointLimit = points_count;
  let next_equation = [];
  while (index <= pointLimit){
    index += 1;
    next_equation = selectEquation(equations);
    let next_point = generateNextPoint(points[points.length - 1], next_equation);
    points.push(next_point);
  }
  let width = maxPoint(points);
  let height = width;
  return plotPoints(points, width, height);
}

function generateNextPoint(point, IFSparams){
  // determine coordinates for next point
  // using provided IFS equation parameters
  // if input point is (x,y)
  // and IFS params are a b c d e f
  // next point is (ax+by+e, cx+dy+f)
  let next_point_x = Number(IFSparams[0]) * point[0] + Number(IFSparams[1]) * point[1] + Number(IFSparams[4]);
  let next_point_y = Number(IFSparams[2]) * point[0] + Number(IFSparams[3]) * point[1] + Number(IFSparams[5]);
  let next_point = [next_point_x, next_point_y];
  return next_point;
}

function selectEquation(equations){
  // use probability parameter of equations to find
  // next equation chosen for IFS
  let probabilities = [];
  equations.forEach(function(equation){
    probabilities.push(equation[equation.length - 1]);
  });
  return getRandom(equations, probabilities);
}

function getRandom (equations, weights) {
  // https://stackoverflow.com/a/28933315
  // use weighted random selection
  let num = Math.random();
  let s = 0;
  lastIndex = weights.length - 1;
  for (let i = 0; i < lastIndex; ++i) {
    s += weights[i];
    if (num < s) {
      return equations[i];
    }
  }
  return equations[lastIndex];
}

function maxPoint(points) {
  // return largest value from points
  let point_values = flatten(points);
  let max = point_values.reduce(function(a,b) {
    return Math.max(a, b);
  });
  return max;
}

const flatten = function(arr, result = []) {
  // flatten that works on large arrays without stack issues
  // https://stackoverflow.com/a/39000004
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};

function plotPoints(points, width, height){
  let canvas = new Canvas(width, height);
  let ctx = canvas.getContext('2d');
  // plot array of points
  points.forEach(function(point) {
    // convert input (cartesian) coordinates to screen coordinates
    let screen_x = point[0] + (width / 2);
    let screen_y = -1 * point[1] + (height / 2);
    // plot translated points on canvas
    ctx.fillRect(screen_x, screen_y, 1, 1);
  });
  // save/overwrite output file
  fs.writeFile('out.jpg', canvas.toBuffer(), function(err) {
    if (err) throw err;
  });
  console.log("output file saved!");
}

init();