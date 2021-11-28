function reset() {
    loop();
    W = window.innerWidth;
    H = window.innerHeight;
    createCanvas(W, H);
    background(0);
    colorMode(HSB, num_of_layers, 1, 1);
    initialize();
    draw();
}

window.addEventListener("resize", onResize);

function onResize() {
    reset();
}

window.addEventListener('load', () => {
    document.getElementById('info-button').addEventListener('click', () => {
        document.getElementById('info').classList.toggle('hidden');
    });

    document.getElementById('algo-select').addEventListener('change', event => {
        ALGORITHM = parseInt(event.target.value);
        eps = 0.1;
        DECAY = 0;
    });

    document.getElementById('display-select').addEventListener('change', event => {
        DISPLAY = parseInt(event.target.value);
        reset();
    });

    document.getElementById('progress-select').addEventListener('change', event => {
        PLOT_PROGRESS = parseInt(event.target.value);
        reset();
    });

    document.getElementById('layers').addEventListener('change', event => {
        num_of_layers = parseInt(event.target.value);
        reset();
    });

    document.getElementById('agents').addEventListener('change', event => {
        num_of_agents = parseInt(event.target.value);
        reset();
    });

    document.getElementById('epsilon').addEventListener('change', event => {
        eps = parseFloat(event.target.value);;
        //reset();
    });

    document.getElementById('decay').addEventListener('change', event => {
        DECAY = parseFloat(event.target.value);;
        //reset();
    });

    document.getElementById('ucb').addEventListener('change', event => {
        lcb_coeff = parseFloat(event.target.value);;
        //reset();
    });

    document.getElementById('iterations').addEventListener('change', event => {
        iters = parseFloat(event.target.value);;
        //reset();
    });

    /*document.getElementById('reset-button').addEventListener('click', () => {
        reset();
    });

    document.getElementById('stop-button').addEventListener('click', () => {
        noLoop();
    });*/

});