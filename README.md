# UnitProject
Final Project: Three-Part Pendulum Simulation
Description
This project simulates a chaotic three-part pendulum system using object-oriented programming in p5.js. Each pendulum segment is connected to the next, demonstrating complex oscillatory motion.

Modeling Components
PendulumSegment Class: Represents each segment of the pendulum. Each segment manages its angle, angular velocity, angular acceleration, length, and position.

ThreePartPendulum Class: Manages three interconnected PendulumSegment instances, calculating their interactions and rendering the complete pendulum system.

Variables and Data Structures
Gravity: A constant to simulate the gravitational force acting on each pendulum segment.

Damping: A factor to simulate energy loss over time, preventing perpetual motion.

Time Step: A fixed value to control the simulation's update rate.

Array of PendulumSegment Instances: Stores the three segments for easy iteration and management.

Setup Function
Initialize the canvas size.

Create instances of PendulumSegment with specified lengths and initial angles.

Instantiate the ThreePartPendulum with the created segments.

Draw Function Flow
Clear the background to prepare for new frame rendering.

Update the physics of each pendulum segment:

Calculate angular acceleration based on gravity and the angles of connected segments.

Update angular velocity and angle.

Apply damping to simulate energy loss.

Render each segment by drawing lines between their calculated positions.
thecodingtrain.com
+4
natureofcode.com
+4
SoBrief
+4

Class Details
PendulumSegment
Properties:

length: Length of the pendulum segment.

angle: Current angle from the vertical.

angularVelocity: Rate of change of the angle.

angularAcceleration: Rate of change of the angular velocity.

origin: The pivot point of the segment.

position: The end point of the segment calculated from the origin and angle.

Methods:

update: Calculates the new angle based on physics.

display(): Draws the segment on the canvas.

ThreePartPendulum
Properties:

segments: An array containing the three PendulumSegment instances.

Methods:

update: Updates each segment's physics, considering the influence of connected segments.

display: Calls the display() method of each segment to render the complete pendulum.

This structure provides a clear roadmap for implementing the three-part pendulum simulation. By focusing on object-oriented principles and the physics of oscillation, you can create a visually engaging and educational model of complex pendulum motion.
