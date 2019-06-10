let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}

PIXI.utils.sayHello(type)

const canvasSize = {
    w: 512,
    h: 512,
    padding: 128
};
//Create a Pixi Application
let app = new PIXI.Application({
    width: canvasSize.w,
    height: canvasSize.h,
    antialias: true
});
document.body.appendChild(app.view);
// console.log("size: " + app.renderer.view.width + " x " + app.renderer.view.height);

let Loader = PIXI.Loader.shared;

Loader
    .add([
        "images/circle.png"
    ])
    .load(setup);

const tweeners = {}

function setTwenners(x, y, s) {
    tweeners.x = x;
    tweeners.y = y;
    tweeners.s = s;
}

function fillTweens(element) {
    const list = tween_GetList();

    let select = document.getElementById(element);
    for (let i = 0; i < list.length; i++) {
        var option = document.createElement("option");
        option.text = list[i].name;
        select.add(option);
    }
}

function createLine() {
    const width = canvasSize.w - canvasSize.padding * 2;
    const height = canvasSize.h - canvasSize.padding * 2;

    line.clear();
    line.moveTo(0, 0);
    for (let i = 0; i <= 1.0; i += 0.01) {
        const x = tweeners.x(i) * width;
        const y = tweeners.y(i) * height;
        line.lineTo(x, y);
    }
}

let circle,
    line;

function setup() {
    line = new PIXI.Graphics();
    line.lineStyle(2, 0xFFFFFF, 1);
    app.stage.addChild(line);

    fillTweens("tween_x");
    fillTweens("tween_y");
    fillTweens("tween_s");
    updateTweens();

    circle = new PIXI.Sprite(Loader.resources["images/circle.png"].texture);
    circle.anchor.set(0.5, 0.5);
    app.stage.addChild(circle);

    app.ticker.add(delta => gameLoop(delta));

}

function updateTweens() {
    const list = tween_GetList();
    let tween_x = document.getElementById("tween_x");
    let tween_y = document.getElementById("tween_y");
    let tween_s = document.getElementById("tween_s");
    setTwenners(
        list[tween_x.selectedIndex].fn,
        list[tween_y.selectedIndex].fn,
        list[tween_s.selectedIndex].fn);

    createLine();
}

let time = 0.0;

function gameLoop(delta) {
    let t = time <= 1.0 ? time : 1.0;

    line.x = canvasSize.padding;
    line.y = canvasSize.padding;

    const width = canvasSize.w - canvasSize.padding * 2;
    const height = canvasSize.h - canvasSize.padding * 2;

    circle.x = canvasSize.padding + tweeners.x(t) * width;
    circle.y = canvasSize.padding + tweeners.y(t) * height;
    const s = 0.25 + 0.75 * tweeners.s(t);
    circle.scale.set(s, s);

    time += delta * 0.01;
    if (time >= 1.0) {
        time = 0.0;
    }
}
