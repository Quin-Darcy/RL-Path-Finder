// Display functions
function show_all_agents() {
    let layer_space = (W-2*X_PAD) / (num_of_layers-1);
    let agent_space = (H-2*Y_PAD) / (num_of_agents-1);
    fill(0);
    strokeWeight(1);

    let x; let y;
    for (let i = 0; i < num_of_layers; i++) {
        // x-axis values
        if (PLOT_PROGRESS === 1) {
            noStroke();
            fill(num_of_layers/2, 0.4, 1);
            text(Math.floor(iters/num_of_layers)*i, i*layer_space+X_PAD-4, H-Y_PAD+24);
        }

        noFill();
        stroke(i, 1, 1);
        for (let j = 0; j < num_of_agents; j++) {
            noFill();
            stroke(i, 1, 1);
            x = agents[i][j].head.x;
            y = agents[i][j].head.y;
            ellipse(x, y, diameter);

            // y-axis values
            if (PLOT_PROGRESS === 1) {
                if (i === 0) {
                    noStroke();
                    fill(num_of_layers/2, 0.4, 1);
                    text(round((1-j/(num_of_agents-1))*100)+'%', X_PAD-48, j*agent_space+Y_PAD+5);
                }
            }
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