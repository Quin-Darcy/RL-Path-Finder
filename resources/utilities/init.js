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
            agents[i][j] = new Agent(x, y, i, eps, lcb_coeff);
        }
    }
}

function set_endpoints() {
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