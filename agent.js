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
            let index = choose_tail();
            this.tail = agents[this.layer+1][index];

            let x1 = this.head.x;
            let y1 = this.head.y;
            let x2 = this.tail.head.x;
            let y2 = this.tail.head.y;

            this.avg_path_len += (this.path_len-this.avg_path_len)/this.count;
            this.path_len = dist(x1, y1, x2, y2);

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

            textSize(12);
            text(round(this.avg_path_len), x1, y1+14);

            this.tail.show_path();
        }
    }
}

function choose_tail() {
    return Math.floor(random(0, num_of_agents));
}

function get_path_len(root) {
    if (!root.tail) {
        return 0;
    }
    root.tail.path_len = get_path_len(root.tail);
    root.path_len += root.tail.path_len;
    return root.path_len;
}