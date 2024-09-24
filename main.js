const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 400;

let start_background = "white";
let ctx = canvas.getContext("2d");
ctx.fillStyle = start_background;
ctx.fillRect(0, 0, canvas.width, canvas.height);

const dtool = document.getElementById("dtool");

let currentTool = null;
let tools = [];
let is_drawing = false;

let draw_color = "black";
let draw_width = "5";
let erase_width = "50";

let store = [];
let restore = [];
let index = -1;

// Add event listeners to the tool buttons
dtool.addEventListener('click', (e) => {
    const className = e.target.className;
    if (tools.length === 0) {
        selectTool(className);
    } else {
        tools.pop(); // remove previous tool
        selectTool(className);
    }
});

// Function to select a drawing tool
function selectTool(tool) {
    if (tool === "pen drawing") {
        tools.push(tool);
        pencil();
    } else if (tool === "erase drawing") {
        tools.push(tool);
        eraser();
    } else if (tool === "square drawing") {
        tools.push(tool);
        rectangle();
    } else if (tool === "straight drawing") {
        tools.push(tool);
        line();
    } else if (tool === "circle drawing") {
        tools.push(tool);
        circle();
    }
}

// Pencil tool logic
function pencil() {
    removeCanvasEvents();
    canvas.addEventListener("mousedown", startDrawing, false);
    canvas.addEventListener("mousemove", draw, false);
    canvas.addEventListener("mouseup", stopDrawing, false);
    canvas.addEventListener("mouseout", stopDrawing, false);
}

function startDrawing(e) {
    is_drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function draw(e) {
    if (is_drawing) {
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.strokeStyle = draw_color;
        ctx.lineWidth = draw_width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }
}

function stopDrawing(e) {
    if (is_drawing) {
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
        store.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index++;
    }
}

// Eraser tool logic
function eraser() {
    removeCanvasEvents();
    canvas.addEventListener("mousedown", startErasing, false);
    canvas.addEventListener("mousemove", erase, false);
    canvas.addEventListener("mouseup", stopErasing, false);
    canvas.addEventListener("mouseout", stopErasing, false);
}

function startErasing(e) {
    is_drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function erase(e) {
    if (is_drawing) {
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.strokeStyle = start_background;
        ctx.lineWidth = erase_width;
        ctx.stroke();
    }
}

function stopErasing(e) {
    if (is_drawing) {
        ctx.closePath();
        is_drawing = false;
        store.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index++;
    }
}

// Line tool logic
function line() {
    removeCanvasEvents();
    let startX, startY;
    canvas.addEventListener("mousedown", (e) => {
        startX = e.clientX - canvas.offsetLeft;
        startY = e.clientY - canvas.offsetTop;
        is_drawing = true;
    });

    canvas.addEventListener("mouseup", (e) => {
        if (is_drawing) {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.strokeStyle = draw_color;
            ctx.lineWidth = draw_width;
            ctx.stroke();
            ctx.closePath();
            is_drawing = false;
            store.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            index++;
        }
    });
}

// Rectangle tool logic
function rectangle() {
    removeCanvasEvents();
    let startX, startY;
    canvas.addEventListener("mousedown", (e) => {
        startX = e.clientX - canvas.offsetLeft;
        startY = e.clientY - canvas.offsetTop;
        is_drawing = true;
    });

    canvas.addEventListener("mouseup", (e) => {
        if (is_drawing) {
            ctx.beginPath();
            ctx.rect(startX, startY, e.clientX - startX - canvas.offsetLeft, e.clientY - startY - canvas.offsetTop);
            ctx.strokeStyle = draw_color;
            ctx.lineWidth = draw_width;
            ctx.stroke();
            ctx.closePath();
            is_drawing = false;
            store.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            index++;
        }
    });
}

// Circle tool logic
function circle() {
    removeCanvasEvents();
    let startX, startY;
    canvas.addEventListener("mousedown", (e) => {
        startX = e.clientX - canvas.offsetLeft;
        startY = e.clientY - canvas.offsetTop;
        is_drawing = true;
    });

    canvas.addEventListener("mouseup", (e) => {
        if (is_drawing) {
            let radius = Math.sqrt(Math.pow(e.clientX - startX - canvas.offsetLeft, 2) + Math.pow(e.clientY - startY - canvas.offsetTop, 2));
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = draw_color;
            ctx.lineWidth = draw_width;
            ctx.stroke();
            ctx.closePath();
            is_drawing = false;
            store.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            index++;
        }
    });
}

// Function to remove canvas events before switching tools
function removeCanvasEvents() {
    canvas.removeEventListener("mousedown", startDrawing);
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mouseup", stopDrawing);
    canvas.removeEventListener("mouseout", stopDrawing);
    canvas.removeEventListener("mousedown", startErasing);
    canvas.removeEventListener("mousemove", erase);
    canvas.removeEventListener("mouseup", stopErasing);
    canvas.removeEventListener("mouseout", stopErasing);
}

// Undo and Redo functionality
function undo_last() {
    if (index <= 0) {
        clear_canvas();
    } else {
        index--;
        restore.push(store.pop());
        ctx.putImageData(store[index], 0, 0);
    }
}

function redo_last() {
    if (restore.length > 0) {
        index++;
        let redoImage = restore.pop();
        store.push(redoImage);
        ctx.putImageData(redoImage, 0, 0);
    }
}

// Clear canvas
function clear_canvas() {
    ctx.fillStyle = start_background;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    store = [];
    index = -1;
}
