// Display
let W = window.innerWidth;
let H = window.innerHeight;
let X_PAD = W/8;
let Y_PAD = H/8;
let w = W-2*X_PAD;
let h = H-2*Y_PAD;
let DIAG = Math.sqrt(w*w+h*h);

// Environmental Constants
let num_of_layers = 16;
let num_of_agents = 16; // per layer
let min_dist = w;
let RANDOM_ENDPOINTS = 0;

// Algorithm Constants
let eps = 0.1;
let EPSILON_DECAY = 0;
let decay = 0.01;
let ucb_coeff = 2;
