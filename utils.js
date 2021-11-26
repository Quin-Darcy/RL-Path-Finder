// Display
let W = window.innerWidth;
let H = window.innerHeight;
let X_PAD = W/8;
let Y_PAD = H/8;
let w = W-2*X_PAD;
let h = H-2*Y_PAD;
let DIAG = Math.sqrt(w*w+h*h);
let PLOT_PROGRESS = 1;
let SHOW_CONFIDENCE = 0;

// Environmental Constants
let RANDOM_ENDPOINTS = 1;
let num_of_layers = 7;
let num_of_agents = 7; // per layer
let agents = [];
let agent0;
let agent1;
let min_len;
let max_len;
let avg_len;
let iter_num;
let progress;

// Algorithm Constants
let iters = 10000;
let eps = 0.1;
let EPSILON_DECAY = 0;
let decay = 0.0001;
let ucb_coeff = 2;

// Initialization functions
function initialize() {
    iter_num = 0;
    progress = [];
    set_agents();
    set_endpoints();
    get_min_len();
    get_max_len();
}

function set_agents() {
    let layer_space = (W-2*X_PAD) / (num_of_layers-1);
    let agent_space = (H-2*Y_PAD) / (num_of_agents-1);

    let x; let y;
    for (let i = 0; i < num_of_layers; i++) {
        agents[i] = [];
        for (let j = 0; j < num_of_agents; j++) {
            x = i*layer_space+X_PAD;
            y = j*agent_space+Y_PAD;
            agents[i][j] = new Agent(x, y, i, eps);
        }
    }
}

function set_endpoints() {
    let start_index; let end_index;
    if (RANDOM_ENDPOINTS === 1) {
        start_index = round(random(0, num_of_agents-1));
        end_index = round(random(0, num_of_agents-1));
    } else {
        start_index = Math.floor(num_of_agents/2);
        end_index = start_index;
    }
    agent0 = agents[0][start_index];
    agent1 = agents[num_of_layers-1][end_index];
}

// Display functions
function show_all_agents() {
    fill(0);
    strokeWeight(1);

    let x; let y;
    for (let i = 0; i < num_of_layers; i++) {
        stroke(i, 1, 1);
        for (let j = 0; j < num_of_agents; j++) {
            x = agents[i][j].head.x;
            y = agents[i][j].head.y;
            ellipse(x, y, 6);
        }
    }
}

function update_progress() {
    let x = map(iter_num/iters, 0, 1, X_PAD, W-X_PAD);
    let p = abs(avg_len - min_len);
    let q = max_len - min_len;
    let y = map(1-p/q, 0.8, 0.95, H-Y_PAD, Y_PAD);
    if(y < Y_PAD) {
        y = Y_PAD;
    }
    if (y > H-Y_PAD) {
        y = H-Y_PAD;
    }
    progress.push(createVector(x, y));
}

function plot_progress() {
    update_progress();
    for (let i = 0; i < progress.length; i++) {
        noStroke();
        fill(num_of_layers/2, 0.4, 1);
        ellipse(progress[i].x, progress[i].y, 1.5);
    }
}

// Other functions
function get_min_len() {
    let x1 = agent0.head.x;
    let y1 = agent0.head.y;
    let x2 = agent1.head.x;
    let y2 = agent1.head.y;
    min_len = dist(x1, y1, x2, y2);
}
function get_max_len() {
    let seg_sum = 0;
    let x1 = agents[1][0].head.x;
    let y1 = agents[1][0].head.y;
    let x2 = agents[1][num_of_agents-1].head.x;
    let y2 = agents[1][num_of_agents-1].head.y;
    let d1 = dist(agent0.head.x, agent0.head.y, x1, y1);
    let d2 = dist(agent0.head.x, agent0.head.y, x2, y2);

    seg_sum += max([d1, d2]);

    x1 = agents[num_of_layers-2][0].head.x;
    y1 = agents[num_of_layers-2][0].head.y;
    x2 = agents[num_of_layers-2][num_of_agents-1].head.x;
    y2 = agents[num_of_layers-2][num_of_agents-1].head.y;
    d1 = dist(x1, y1, agent1.head.x, agent1.head.y);
    d2 = dist(x2, y2, agent1.head.x, agent1.head.y);

    seg_sum += max([d1, d2]);

    if (num_of_layers > 3) {
        x1 = agents[1][0].head.x;
        y1 = agents[1][0].head.y;
        x2 = agents[2][num_of_agents-1].head.x;
        y2 = agents[2][num_of_agents-1].head.y;
        seg_sum += (num_of_layers-3) * dist(x1, y1, x2, y2);
    }
    max_len = seg_sum;
}
