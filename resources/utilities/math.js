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