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
and graph the image.

Image is output as 'out.jpg' in the running directory.

## Iteration Process ##

The app takes an initial point (1,1)
and selects an equation entered using the weights provided.

If a point is (x,y) and equations are in the form a b c d e f

the next point generated is
(ax+by+e, cx+dy+f)

Another equation is selected and the previously generated point
is used as the input until the specified number of points
have been generated.

______________________________________________________

Uses node-canvas

https://github.com/Automattic/node-canvas

### License ###
MIT License