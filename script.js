let agents = [];
let agent0;
let agent1;

function setup() {
    createCanvas(W, H);
    background(0)
    colorMode(HSB, num_of_layers, 1, 1);
    set_agents();

    let start_index = Math.floor(num_of_agents/2);
    let end_index = start_index;
    agent0 = agents[0][start_index];
    agent1 = agents[num_of_layers-1][start_index];
}

function draw() {
    background(0);
    show_all_agents();

    agent0.make_path();
    agent0.show_path();
    get_path_len(agent0);
    //agent0.reset_path();
}








//===============Peripheral Functions===============//

function mouseClicked() {
    noLoop();
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

function show_all_agents() {
    fill(0);
    strokeWeight(1);

    let x; let y;
    for (let i = 0; i < num_of_layers; i++) {
        stroke(i, 1, 1);
        for (let j = 0; j < num_of_agents; j++) {
            x = agents[i][j].head.x;
            y = agents[i][j].head.y;
            ellipse(x, y, 5);
        }
    }
}