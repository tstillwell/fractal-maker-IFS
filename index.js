#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function init(){
  let equation = promptForIFS();
  if equation == (false) || ("end"){
    return;
  }
  else {
    let prompt_for_more_equations = true;
    let equations = [];
    while (prompt_for_more_equations == true){
      let next_equation = promptForIFS();
      if (next_equation == ""){
        prompt_for_more_equations = false;
      }
      else if (next_equation == false){
        console.log("Bad input. Aborting");
        return;
      }
      else {
        equations.append(next_equation);
      }
    }
    return makeFractal(equations);
  }
}

function promptForIFS(){
  let prompt = "Please enter an IFS equation. "
  prompt += "Leave line blank to finish input\n";
  rl.question(prompt, (equation) => {
    if (isValidEquation(`${equation}`)){
      // process equation params
      return equation.split(" ");
    }
    else if (`${equation}` == ''){
      return "end";
    }
    else {
      console.log("Invalid equation"); 
      return false;
    }
    rl.close();
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
  points.append([1,1]); // starting point
  let pointCount = 0;
  let pointLimit = 1000;
  let next_equation = [];
  while (pointCount <= pointLimit){
    pointCount += 1;
    //next_equation = selectEquation(equations);
    //let next_point = generateNextPoint();
    points.append(next_point);
  }
  return points;
}

function generateNextPoint(point, IFSparams){
  // generate next point
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
    probabilities.append(equation[-1]);
  }
  return getRandom(equations, probabilties);
  // determine which interval contains selection
}

function getRandom (equations, weights) {
  // https://stackoverflow.com/a/28933315
  // use weighted random selection
  let num = Math.random(),
  let s = 0,
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