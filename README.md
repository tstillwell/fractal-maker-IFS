# fractal-maker-IFS

An iterated function system (IFS) to create
fractals from a set of IFS equations.

https://en.wikipedia.org/wiki/Iterated_function_system

Input one equation per line with a probability weight as the last parameter.

Each equation should be in the form "a b c d e f p". All equation
parameters must be numeric. a - f are the numeric coefficients for affine
transformation, and p is the probability weight for the equation.

Total probability rate for all equations should not exceed one.

Once all equations have been input, enter a blank line to terminate input
and begin graphing the image.

node canvas

https://github.com/Automattic/node-canvas

MIT License