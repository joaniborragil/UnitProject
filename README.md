Project Description
An interactive triple pendulum simulation demonstrating chaotic motion with draggable pendulum bobs and a dynamic trailing path visualizing its complex oscillations.

Things I am modeling:
Three interconnected PendulumSegment objects forming a three-part pendulum system.

Each segment has its own length, angle, angular velocity, and angular acceleration.

The pendulum arms influence each other’s motion, approximating coupled physics.

A trail of the last pendulum bob’s position to visualize chaotic patterns.

Variables and Data Structures
Segments array: Stores the three PendulumSegment objects.

Angles array: Current angles for each pendulum arm.

Angular velocities & accelerations arrays: Track motion dynamics.

Trail array: Stores recent positions of the last bob for drawing its path.

Dragging state variables: To handle mouse interaction and allow dragging of any pendulum bob.

Setup
Create a canvas sized 800x600.

Initialize the ThreePartPendulum object with an origin point near the top-center.

Set initial angles to start the pendulum in motion.

Prepare empty trail array for tracking bob’s path.

Draw Flow
Clear the background every frame.

Update pendulum physics or update angles if dragging.

Calculate new positions for each pendulum segment.

Append last bob position to trail array and limit its length.

Render trail with semi-transparent stroke.

Render each pendulum arm with distinct color and thickness.

Handle user mouse interaction to drag bobs and set initial angles.

Classes and Their Responsibilities
PendulumSegment
Properties: origin (start point), length, angle, angular velocity, angular acceleration, position (end point), damping factor.

Actions:

Calculate new position based on current angle and length.

Update angle using velocity and acceleration with damping applied.

Display the arm (line) and bob (circle) with a given color.

ThreePartPendulum
Properties:

origin (fixed anchor point).

Arrays of lengths, angles, angular velocities, angular accelerations.

segments array of PendulumSegment instances.

trail array storing last bob’s positions.

draggingSegment index to track which bob is being dragged.

Constants for gravity and damping.

Actions:

update():

If dragging, update the angle of dragged segment based on mouse position.

Else, compute new accelerations and velocities for realistic motion physics.

Update segments’ positions accordingly.

Update trail with the last bob’s position.

display():

Draw the trail and each pendulum segment with distinct colors and line weights.

tryDrag(x, y): Detect if a bob is close enough to mouse for dragging.

stopDrag(): Release the dragging state.

Code Status
Core physics and rendering implemented.

Mouse interaction and dragging for setting initial conditions working.

Visual trail showing chaotic motion implemented.

Potential improvements: More precise triple pendulum physics, energy conservation checks, UI controls.

