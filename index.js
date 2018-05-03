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
	// if input point is (x,y)
	// and IFS params are a b c d e f
    // next point is (ax+by+e, cx+dy+f)
	let next_point_x = IFSparams[0] * point[0] + IFSparams[1] * point[1] + IFSparams[4];
	let next_point_y = IFSparams[2] * point[0] + IFSparams[3] * point[1] + IFSparams[5];
	let next_point = [next_point_x, next_point_y];
}

function plotPoints(points){
  // plot array of points
}