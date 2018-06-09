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
and begin the iteration process.

Once the itration process finishes, the points are graphed to a canvas
and the resulting image is output as 'out.jpg' in the running directory.

## Iteration Process ##

The app takes an initial point (1,1)
and selects an equation from those entered using the weights provided.

If a point is (x,y) and equations are in the form a b c d e f

the next point generated is
(ax+by+e, cx+dy+f)

This point is used as the input in the next equaiton selected.
This process is repeated until the specified number of points
have been generated.

______________________________________________________

Uses node-canvas

https://github.com/Automattic/node-canvas

### License ###
MIT License