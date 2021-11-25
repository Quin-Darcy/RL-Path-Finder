class Agent {
    constructor(x, y, layer, eps) {
        this.head = createVector(x, y);
        this.layer = layer;
        this.eps = eps;

        this.tail = null;
        this.segment_len = 0;
        this.path_len = 0;
        this.avg_path_len = 0;
    }
    reset_path() {
        this.tail = null;
    }
    make_path() {
        if (this.layer < num_of_layers-2) {
            let index = choose_tail();
            this.tail = agents[this.layer+1][index];
            this.tail.make_path();
        } else {
            this.tail = agent1;
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

            this.tail.show_path();
        }
    }
}

function choose_tail() {
    return Math.floor(random(0, num_of_agents));
}