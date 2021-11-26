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