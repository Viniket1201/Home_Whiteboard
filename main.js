const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 400;

let start_background = "white";
let ctx = canvas.getContext("2d");
ctx.fillStyle = start_background;
ctx.fillRect(0, 0, canvas.width, canvas.height);

const pen = document.getElementById("pen");
const straight = document.getElementById("straight");
const square = document.getElementById("square");
const oval = document.getElementById("oval");

var check = true;
var rect = true;
var tool_default = "line";
const dtool = document.getElementById("dtool");

var tools = [];

dtool.addEventListener('click', (e) => {
    var className = e.target.className;

    if (tools.length === 0) {
        if (className == "pen drawing") {
            tools.push(className);
            pencil();
        } else if (className == "erase drawing") {
            tools.push(className);
            eraser();
        } else if (className == "square drawing") {
            tools.push(className);
            rectangle();
        } else if (className == "straight drawing") {
            tools.push(className);
            line();
        } else {
            tools.push(className);
            circle();
        }
    } else {
        tools.pop();
        if (className == "pen drawing") {
            tools.push(className);
            pencil();
        } else if (className == "erase drawing") {
            tools.push(className);
            eraser();
        } else if (className == "square drawing") {
            tools.push(className);
            rectangle();
        } else if (className == "straight drawing") {
            tools.push(className);
            line();
        } else {
            tools.push(className);
            circle();
        }
    }
});

function pencil() {
    rect = false;
    check = true;

    canvas.onmousedown = startDrawing;
    canvas.onmousemove = draw;
    canvas.onmouseup = stopDrawing;
    canvas.onmouseout = stopDrawing;

    function startDrawing(e) {
        is_drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function draw(e) {
        if (!is_drawing) return;
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.strokeStyle = draw_color;
        ctx.lineWidth = draw_width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }

    function stopDrawing() {
        if (!is_drawing) return;
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
}

function line() {
    canvas.onmousedown = startDrawingLine;
    canvas.onmouseup = stopDrawingLine;

    let startX, startY;
    function startDrawingLine(e) {
        is_drawing = true;
        startX = e.clientX - canvas.offsetLeft;
        startY = e.clientY - canvas.offsetTop;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
    }

    function stopDrawingLine(e) {
        if (!is_drawing) return;
        let endX = e.clientX - canvas.offsetLeft;
        let endY = e.clientY - canvas.offsetTop;
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = draw_color;
        ctx.lineWidth = draw_width;
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
}

function rectangle() {
    canvas.onmousedown = startDrawingRect;
    canvas.onmouseup = stopDrawingRect;

    let startX, startY;
    function startDrawingRect(e) {
        is_drawing = true;
        startX = e.clientX - canvas.offsetLeft;
        startY = e.clientY - canvas.offsetTop;
    }

    function stopDrawingRect(e) {
        if (!is_drawing) return;
        let endX = e.clientX - canvas.offsetLeft;
        let endY = e.clientY - canvas.offsetTop;
        ctx.strokeRect(startX, startY, endX - startX, endY - startY);
        ctx.strokeStyle = draw_color;
        ctx.lineWidth = draw_width;
        is_drawing = false;
    }
}

function eraser() {
    canvas.onmousedown = startErasing;
    canvas.onmousemove = erase;
    canvas.onmouseup = stopErasing;

    function startErasing(e) {
        is_drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function erase(e) {
        if (!is_drawing) return;
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.strokeStyle = start_background;
        ctx.lineWidth = erase_width;
        ctx.stroke();
    }

    function stopErasing() {
        if (!is_drawing) return;
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
}

function circle() {
    // Similar to rectangle, but use `arc` for circular drawing.
}
