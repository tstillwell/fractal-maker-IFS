# fractal-maker-IFS

An iterated function system (IFS) node CLI app to create
fractals from a set of IFS equations.

https://en.wikipedia.org/wiki/Iterated_function_system

Input one equation per line.

Each equation should be in the form "a b c d e f p". All equation
parameters must be numeric. a - f are the numeric coefficients for affine
transformation, and p is the probability weight for the equation.

Total probability weights for all equations should not exceed one.

Once all equations have been input, enter a blank line to terminate input
and begin graphing the image.

Image is output as 'out.jpg' in the current directory.

node canvas

https://github.com/Automattic/node-canvas

MIT License