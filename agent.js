class Agent {
    constructor(x, y, layer, eps) {
        this.head = createVector(x, y);
        this.layer = layer;
        this.eps = eps;

        this.tail = null;
        this.count = 0;
        this.path_len = 0;
        this.avg_path_len = 0;
        this.confidence = 1;
    }
    reset_path() {
        this.tail = null;
    }
    make_path() {
        this.count += 1;
        if (this.layer < num_of_layers-2) {
            let index = choose_tail(this.layer+1, this.eps, this.count);
            this.tail = agents[this.layer+1][index];
            this.confidence = get_confidence(this.layer, this.count);
            this.confidence *= this.tail.confidence;

            let x1 = this.head.x;
            let y1 = this.head.y;
            let x2 = this.tail.head.x;
            let y2 = this.tail.head.y;

            this.avg_path_len += (this.path_len-this.avg_path_len)/this.count;
            this.path_len = dist(x1, y1, x2, y2);

            if (this.eps-EPSILON_DECAY > 0) {
                this.eps -= EPSILON_DECAY;
            } 

            this.tail.make_path();
        } else {
            this.tail = agent1;
            agent1.count += 1;
            agent1.confidence = Math.pow(this.confidence, 2);
            
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

            if (DISPLAY === 2) {
                make_up = 0;
            } else {
                make_up = 0.25;
            }
            strokeWeight(this.confidence+make_up);
            stroke(this.layer, 1, this.confidence+make_up);
            line(x1, y1, x2, y2);

            if (SHOW_CONFIDENCE === 1) {
                noStroke();
                fill(num_of_layers, 0, 1);
                textSize(12);
                text(round(this.confidence, 2), x1, y1+14);
            }

            this.tail.show_path();
        }
    }
}
