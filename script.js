function setup() {
    createCanvas(W, H);
    background(0)
    colorMode(HSB, num_of_layers, 1, 1);
    initialize();
}

function draw() {
    background(0);
    iter_num += 1;
    
    if (avg_len > 0) {
        plot_progress();
    }
    show_all_agents();
    
    avg_len = agent0.avg_path_len;
    agent0.make_path();
    agent0.show_path();
    get_path_len(agent0);
    update_progress();

    if (frameCount % (num_of_layers-2) === 0) {
        agent0.reset_path();
    }
    if (frameCount % iters === 0) {
        initialize();
    }

}

function mouseClicked() {
    noLoop();
}
