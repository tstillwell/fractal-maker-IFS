#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  propmt: 'IFS equation> '
});

function init(){
  let input = promptForIFS();
}

function promptForIFS(){
  let equations = [];
  rl.prompt();
  rl.on('line', (line) => {
  switch (isValidEquation(line)) {
    case true:
      console.log('valid input!');
	  equations.push(line.split(" "));
      break;
	case false:
	  if (line == ""){
	    makeFractal(equations);
	  }
	  console.log('invalid input!');
	  break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }
  rl.prompt();
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
  // return true if n is numeric
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function makeFractal(equations) {
  // generate fractal from IFS equations
  let points = [];
  points.push([1,1]); // starting point
  let pointCount = 0;
  let pointLimit = 1000;
  let next_equation = [];
  while (pointCount <= pointLimit){
    pointCount += 1;
    next_equation = selectEquation(equations);
    let next_point = generateNextPoint(points[points.length - 1], next_equation);
    points.push(next_point);
  }
  return points;
}

function generateNextPoint(point, IFSparams){
  // generate next point
  // using provided IFS equation parameters
  // if input point is (x,y)
  // and IFS params are a b c d e f
  // next point is (ax+by+e, cx+dy+f)
  console.log(point);
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
  // determine which interval contains selection
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
};

function plotPoints(points){
  // plot array of points
}

init();