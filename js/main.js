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

const tweeners = {}

function fillTweens(element, selectedIndex) {
    const list = tween_GetList();

    let select = document.getElementById(element);
    for (let i = 0; i < list.length; i++) {
        let option = document.createElement("option");
        option.text = list[i].name;
        select.add(option);
    }

    select.selectedIndex = selectedIndex;
}

function getTweenValue(tween, t) {
    if (tween.mode === 'In') {
        return tween.fn(t);
    } else if (tween.mode === 'Out') {
        return 1.0 - tween.fn(1.0 - t);
    } else {
        if (t < 0.5) {
            return tween.fn(2.0 * t) * 0.5;
        }
        else
        {
            return 0.5 + (1.0 - tween.fn(1.0 - (2.0 * t - 1.0))) * 0.5;
        }
    }
}

let circle,
    line,
    message;

function setup() {
    let rect = new PIXI.Graphics();
    rect.lineStyle(1, 0xffffff, 1);
    rect.moveTo(0, canvasSize.padding);
    rect.lineTo(canvasSize.w, canvasSize.padding);
    rect.moveTo(0, canvasSize.h - canvasSize.padding);
    rect.lineTo(canvasSize.w, canvasSize.h - canvasSize.padding);
    rect.moveTo(canvasSize.padding, 0);
    rect.lineTo(canvasSize.padding, canvasSize.h);
    rect.moveTo(canvasSize.w - canvasSize.padding, 0);
    rect.lineTo(canvasSize.w - canvasSize.padding, canvasSize.h);
    app.stage.addChild(rect);

    line = new PIXI.Graphics();
    line.lineStyle(4, 0xFFFF50, 1);
    app.stage.addChild(line);

    fillTweens("tween_x", 1);
    fillTweens("tween_y", 3);
    fillTweens("tween_s", 0);
    updateTweens();

    circle = new PIXI.Graphics();
    circle.beginFill(0xffc20c);
    circle.lineStyle(4, 0xffffff, 1);
    circle.drawCircle(0, 0, 15);
    circle.endFill();
    app.stage.addChild(circle);

    message = new PIXI.Text("0.0");
    message.style = {
        fill: "white",
        font: "16px"
    };
    message.position.set(10, 10);
    app.stage.addChild(message);

    app.ticker.add(dt => gameLoop(dt));
}

setup();

function updateTweens() {
    const list = tween_GetList();

    const x = document.getElementById("tween_x");
    const x_fn = list[x.selectedIndex].fn;
    if (x_fn) {
        const mode = document.getElementById("tween_x_mode");
        tweeners.x = {
            fn: x_fn,
            mode: mode.options[mode.selectedIndex].text
        };
    } else {
        tweeners.x = null;
    }

    const y = document.getElementById("tween_y");
    const y_fn = list[y.selectedIndex].fn;
    if (y_fn) {
        const mode = document.getElementById("tween_y_mode");
        tweeners.y = {
            fn: y_fn,
            mode: mode.options[mode.selectedIndex].text
        };
    } else {
        tweeners.y = null;
    }

    const s = document.getElementById("tween_s");
    const s_fn = list[s.selectedIndex].fn;
    if (s_fn) {
        const mode = document.getElementById("tween_s_mode");
        tweeners.s = {
            fn: s_fn,
            mode: mode.options[mode.selectedIndex].text
        };
    } else {
        tweeners.s = null;
    }

    createLine();
}

function createLine() {
    const width = canvasSize.w - canvasSize.padding * 2;
    const height = canvasSize.h - canvasSize.padding * 2;

    line.clear();

    const count = 100;
    for (let i = 0; i <= count; i++) {
        const t = i / count;
        let x = canvasSize.padding;
        if (tweeners.x) {
            x += getTweenValue(tweeners.x, t) * width;
        }

        let y = canvasSize.padding;
        if (tweeners.y) {
            y += getTweenValue(tweeners.y, t) * height;
        }

        if (i == 0) {
            line.moveTo(x, y);
        } else {
            line.lineTo(x, y);
        }
    }
}

let time = 0.0;

function gameLoop(dt) {
    time = (time + dt * 0.005) % 1;
    const t = time;
    message.text = (time * 100).toFixed(0) + "%";

    circle.x = canvasSize.padding;
    if (tweeners.x) {
        let width = canvasSize.w - canvasSize.padding * 2;
        circle.x += getTweenValue(tweeners.x, t) * width;
    }

    circle.y = canvasSize.padding;
    if (tweeners.y) {
        let height = canvasSize.h - canvasSize.padding * 2;
        circle.y += getTweenValue(tweeners.y, t) * height;
    }

    let s = 0.5;
    if (tweeners.s) {
        s += 0.5 * getTweenValue(tweeners.s, t);
    }
    circle.scale.set(s, s);
}
