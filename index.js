#!/usr/bin/env node
const readline = require('readline');
const Canvas = require('canvas');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptForIFS(){
  let equations = [];
  rl.setPrompt('IFS equation> ');
  rl.prompt();
  rl.on('line', (line) => {
  switch (isValidEquation(line)) {
    case true:
      console.log('valid input!');
      equations.push(Number(line.split(" ")));
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
  let next_point_x = IFSparams[0] * point[0] + IFSparams[1] * point[1] + IFSparams[4];
  let next_point_y = IFSparams[2] * point[0] + IFSparams[3] * point[1] + IFSparams[5];
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
  // return largest absolute value from points
  let x_values = [];
  let y_values = [];
  points.forEach(function(point) {
    x_values.push(point[0]);
    y_values.push(point[1]);
  });
  let x_max = Math.abs(Math.max(x_values));
  let y_max = Math.abs(Math.max(y_values));
  if (x_max > y_max){
    return x_max;
  }
  else {
    return y_max;
  }	
}

function scaleFactor(points, width, height) {
  // determine scale factor for graphing to fit image
  let x_values = [];
  let y_values = [];
  points.forEach(function(point) {
    x_values.push(point[0]);
    y_values.push(point[1]);
  });
  let x_scale = width / Math.max(x_values);
  let y_scale = height / Math.max(y_values);
  return [x_scale, y_scale];
}

function plotPoints(points, width, height){
  let canvas = new Canvas(width, height);
  let ctx = canvas.getContext('2d');
  let scales = scaleFactor(points, width, height);
  let x_scale = Math.abs(scales[0]);
  let y_scale = Math.abs(scales[1]);
  // plot array of points
  points.forEach(function(point) {
    // convert input (cartesian) coordinates to screen coordinates
    let screen_x = x_scale * point[0] + (width / 2);
    let screen_y = -1 * y_scale * point[1] + (height / 2);
    // plot translated points on canvas
    ctx.fillRect(screen_x, screen_y, 1, 1);
  });
  // save/overwrite output file
  fs.writeFile('out.jpg', canvas.toBuffer(), function(err) {
    if (err) throw err;
  });
  console.log("output file saved!");
}

promptForIFS();