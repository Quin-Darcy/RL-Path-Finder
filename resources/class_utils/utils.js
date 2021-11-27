function choose_tail(layer, epsilon, lcb, count) {
    if (ALGORITHM === 1) {
        return epsilon_greedy(layer, epsilon, count);
    } else if (ALGORITHM === 2) {
        return lower_confidence_bound(layer, lcb, count);
    }
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

function get_confidence(layer, count) {
    let confidence = count / iters;
    let mean = 0;
    let confs = [];
    let dists = [];
    let dist_from_mean;
    let min_dist;
    let max_dist;
    let adjusted_confidence;
    for (let i = 0; i < num_of_agents; i++) {
        mean += agents[layer][i].count / iters;
        confs[i] = agents[layer][i].count / iters;
    } 
    mean = mean / num_of_agents;

    for (let i = 0; i < num_of_agents; i++) {
        dists[i] = confs[i] - mean;
    }
    min_dist = min(dists);
    max_dist = max(dists);
    dist_from_mean = confidence - mean;

    if (DISPLAY === 2) {
        l_bound = 0;
    } else {
        l_bound = 0.5;
    }

    adjusted_confidence = map(dist_from_mean, min_dist, max_dist, l_bound, u_bound);
    if (adjusted_confidence >= u_bound) {
        adjusted_confidence = u_bound;
    }
    return adjusted_confidence;
}