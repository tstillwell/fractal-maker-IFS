#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter an IFS equation ', (equation) => {
  console.log(`${equation}`);
  rl.close();
});