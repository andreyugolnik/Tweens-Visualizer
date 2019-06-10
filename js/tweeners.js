function tween_GetList() {
    return [
        { fn: tween_Linear, name: "Linear" },
        { fn: tween_Bounce, name: "Bounce" },
        { fn: tween_Back, name: "Back" },
        { fn: tween_Elastic, name: "Elastic" },
        { fn: tween_Quad, name: "Quad" },
        { fn: tween_Cubic, name: "Cubic" },
        { fn: tween_Quart, name: "Quart" },
        { fn: tween_Quint, name: "Quint" },
        { fn: tween_Circ, name: "Circle" },
        { fn: tween_Sine, name: "Sine" }
    ];
}

function tween_Linear(t) {
    return t;
}

function tween_Bounce(t) {
    const v = 1.0 - t;
    let c;
    let d;

    if (v < (1.0 / 2.75)) {
        c = v;
        d = 0.0;
    } else if (v < (2.0 / 2.75)) {
        c = v - 1.5 / 2.75;
        d = 0.75;
    } else if (v < (2.5 / 2.75)) {
        c = v - 2.25 / 2.75;
        d = 0.9375;
    } else {
        c = v - 2.625 / 2.75;
        d = 0.984375;
    }

    return 1.0 - (7.5625 * c * c + d);
}

// -----------------------------------

function tween_Back(t) {
    const s = 1.70158;
    return t * t * ((s + 1.0) * t - s);
}

// -----------------------------------

function tween_Elastic(t) {
    const v = t - 1.0;
    const p = 0.3;

    return -Math.pow(2.0, 10.0 * v) * Math.sin((v - p / 4.0) * 2.0 * Math.PI / p);
}

// -----------------------------------

function tween_Quad(t) {
    return t * t;
}

// -----------------------------------

function tween_Cubic(t) {
    return t * t * t;
}

// -----------------------------------

function tween_Quart(t) {
    return t * t * t * t;
}

// -----------------------------------

function tween_Quint(t) {
    return t * t * t * t * t;
}

// -----------------------------------

function tween_Circ(t) {
    return 1.0 - Math.sqrt(1.0 - t * t);
}

// -----------------------------------

function tween_Sine(t) {
    return 1.0 - Math.cos(t * Math.PI / 2);
}
