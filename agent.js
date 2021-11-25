class Agent {
    constructor(x, y, layer, eps) {
        this.head = createVector(x, y);
        this.layer = layer;
        this.eps = eps;

        this.tail = null;
        this.count = 0;
        this.path_len = 0;
        this.avg_path_len = 0;
    }
    reset_path() {
        this.tail = null;
    }
    make_path() {
        this.count += 1;
        if (this.layer < num_of_layers-2) {
            let index = choose_tail(this.layer+1, this.eps, this.count);
            this.tail = agents[this.layer+1][index];

            let x1 = this.head.x;
            let y1 = this.head.y;
            let x2 = this.tail.head.x;
            let y2 = this.tail.head.y;

            this.avg_path_len += (this.path_len-this.avg_path_len)/this.count;
            this.path_len = dist(x1, y1, x2, y2);

            if (EPSILON_DECAY === 1) {
                if (this.eps-decay > 0) {
                    this.eps -= decay;
                }
            }

            this.tail.make_path();
        } else {
            this.tail = agent1;
            
            let x1 = this.head.x;
            let y1 = this.head.y;
            let x2 = this.tail.head.x;
            let y2 = this.tail.head.y;

            this.avg_path_len += (this.path_len-this.avg_path_len)/this.count;
            this.path_len = dist(x1, y1, x2, y2);
        }
    }
    show_path() {
        if (this.tail && this.layer < num_of_layers-1) {
            let x1 = this.head.x;
            let y1 = this.head.y;
            let x2 = this.tail.head.x;
            let y2 = this.tail.head.y;

            strokeWeight(1);
            stroke(this.layer, 1, 1);
            line(x1, y1, x2, y2);

            noStroke();
            fill(num_of_layers, 0, 1);
            textSize(12);
            text(round(this.avg_path_len), x1, y1+14);

            this.tail.show_path();
        }
    }
}

function choose_tail(layer, epsilon, count) {
    //return epsilon_greedy(layer, epsilon, count);
    return upper_confidence_bound(layer, epsilon, count);
}

function get_path_averages(layer) {
    let avgs = [];
    for (let i = 0; i < num_of_agents; i++) {
        avgs[i] = agents[layer][i].avg_path_len;
    }
    return avgs;
}

function get_path_len(root) {
    if (!root.tail) {
        return 0;
    }
    root.tail.path_len = get_path_len(root.tail);
    root.path_len += root.tail.path_len;
    return root.path_len;
}

//==============Learning ALgorithms==============//
function epsilon_greedy(layer, epsilon, count) {
    let index;
    let p = random(0, 1);
    let avgs = get_path_averages(layer);

    if (epsilon === 0 && count === 0) {
        index = Math.floor(random(0, num_of_agents));
    } else if (p < epsilon) {
        index = Math.floor(random(0, num_of_agents));
    } else {
        index = avgs.indexOf(min(avgs));
    }

    return index;
}

function upper_confidence_bound(layer, epsilon, count) {
    let index;
    let p = random(0, 1);
    let avgs = get_path_averages(layer);

    for (let i = 0; i < num_of_agents; i++) {
        if (agents[layer][i].count > 0) {
            avgs[i] -= ucb_coeff * Math.sqrt(Math.log(frameCount) / agents[layer][i].count);
        } else {
            avgs[i] = 0;
        }
    }

    if (epsilon === 0 && count === 0) {
        index = Math.floor(random(0, num_of_agents));
    } else if (p < epsilon) {
        index = Math.floor(random(0, num_of_agents));
    } else {
        index = avgs.indexOf(min(avgs));
    }

    return index;
}
