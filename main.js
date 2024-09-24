Solve the error in this code

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


// document.onload = () => {
//     pencil();
// }


var check = true;
var rect = true;
// var tool;
var tool_default = "line";
const dtool = document.getElementById("dtool");


// if (tools[tool_default]) {
//     tool = new tools[tool_default]();
//     dtool.value = tool_default;
//   }
var tools = [];

dtool.addEventListener('click',(e) => {
    var className = e.target.className;
    var pre;
    if(tools.lenght === 0){
        pre = e.target;
        
        if(className == "pen drawing"){
            tools.push(className);
            pencil();
        }else if(className == "erase drawing"){
            tools.push(className);
            eraser();
        }else if(className == "square drawing"){
            tools.push(className);
            rectangle();
        }else if(className == "straight drawing"){
            tools.push(className);
            line();
        }else{
            tools.push(className);
            circle();
        }
    }else{
        tools.pop();
        // pre.removeEventListener();

        // windows.onload = () => {
            if(className == "pen drawing"){
                tools.push(className);
                pencil();
            }else if(className == "erase drawing"){
                tools.push(className);
                eraser();
            }else if(className == "square drawing"){
                tools.push(className);
                rectangle();
            }else if(className == "straight drawing"){
                tools.push(className);
                line();
            }else{
                tools.push(className);
                circle();
            }

        // }
    }
  
});


// function changeTool (ev) {
//     if (tools[this.value]) {
//       tool = new tools[this.value]();
//     }
//   }
//insert text 
function enterText(){

    // alert("hello");
    // alert(check);
    // if(check === false){
    //     check = true;
    // }else if(check === true){
    //     check = false;
        
    // }
    // alert(check);
    check = false;
    if(check === false){
        var mouseX = 0;
        var mouseY = 0;
        var startingX = 0;

        var recentWords = [];
        var undoList = [];

        function saveState(){
            undoList.push(canvas.toDataURL());
        }

        saveState();

        function undo(){
            undoList.pop();
            var imgData = undoList[undoList.length - 1];
            var image = new Image();

            image.src = imgData;
            image.onload = function (){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
            }
        }

        canvas.addEventListener("click", function (e) {
            // alert("clicked");
            // mouseX = e.pageX - canvas.offsetLeft;
            // mouseY = e.pageY - canvas.offsetTop;
            mouseX = e.clientX - canvas.offsetLeft;
            mouseY = e.clientY - canvas.offsetTop;
            startingX = mouseX;


            recentWords = [];
            return false;
            // e.preventDefault();

        }, false);

        document.addEventListener("keydown", function (e){
            // alert("keypressed")
            // alert(e.key)
            ctx.font = "30px Arial";
            ctx.color = draw_color;

            if(e.key === "Backspace"){
                undo();
                var recentWord = recentWords[recentWords.length - 1];
                mouseX -= ctx.measureText(recentWord).width + 1;
                recentWords.pop();

            }else if (e.key === "Enter"){
                mouseX = startingX;
                mouseY += 20;
            }else{
                 
                ctx.strokeText(e.key, mouseX, mouseY);
                // alert("fill");
                mouseX += ctx.measureText(e.key).width + 1;
                saveState();
                recentWords.push(e.key);
            }
            // ctx.fillText(e.key, mouseX, mouseY);
           

            
        }, false);
    }
    // alert(check);
}



// drawing board

    // alert(check);
    let draw_color = "black";
    let draw_width = "5";
    let erase_width = "50";
    let is_drawing = false;

    let store = [];
    let restore = [];
    let index = -1;

    function change_color(element){
        // draw_color = element.style.background;
        start_background = element.style.background;
        ctx.fillStyle = start_background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
// check = false;
function pencil(){
    // square.unbind('click');
    // oval.unbind('click');
    // straight.unbind('click');
    
    // if(document.getElementById("straight").clicked != true){
    //     alert("heloo");
    //     document.getElementById("straight").clicked = false;
    // }
    rect = false;
    // document.getElementById("line").off('click');
    lcheck = false;
    check = true;
    if(check === true){
        canvas.addEventListener("touchstart", start, false);
        canvas.addEventListener("touchmove", draw, false);
        canvas.addEventListener("mousedown", start, false);
        canvas.addEventListener("mousemove", draw, false);
        

        canvas.addEventListener("touchend", stop, false);
        canvas.addEventListener("mouseup", stop, false);
        canvas.addEventListener("mouseout", stop, false);


        function start(e) {
            is_drawing = true;
            ctx.beginPath();
            ctx.moveto(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            // e.preventDefault();

        }

        function draw(e) {
            if(is_drawing){
                ctx.lineTo(e.clientX - canvas.offsetLeft , e.clientY - canvas.offsetTop);
                ctx.strokeStyle = draw_color;
                ctx.lineWidth = draw_width;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.stroke();
            }
        }

        function stop(e){
            if(is_drawing){
                ctx.stroke();
                ctx.closePath();
                is_drawing = false;

            }
            // e.preventDefault();
            if(e.type != "mouseout"){
            store.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
            index += 1;
            }

        }
    }
   
}
let lcheck = true;
function line(){
    // document.getElementById("pen").off('click');
    // var tool = this;
    // this.started = false;

    
    lcheck = true;
    check = false;
   
        canvas.addEventListener("touchstart", start, false);
        // canvas.addEventListener("touchmove", draw, false);
        canvas.addEventListener("mousedown", start, false);
        // canvas.addEventListener("mousemove", draw, false);

        canvas.addEventListener("touchend", stop, false);
        canvas.addEventListener("mouseup", stop, false);
        canvas.addEventListener("mouseout", stop, false);


        function start(e) {
            // tool.started = true;
            is_drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            // e.preventDefault();
            // e.stopImmediatePropagation();

        }
        // function draw(e) {
        //     if(!tool.started){
        //         return;
        //         // ctx.lineTo(e.clientX - canvas.offsetLeft , e.clientY - canvas.offsetTop);
        //         // ctx.strokeStyle = draw_color;
        //         // ctx.lineWidth = draw_width;
        //         // ctx.lineCap = "round";
        //         // ctx.lineJoin = "round";
        //         // ctx.stroke();
        //     }
            // ctx.clearRect(0, 0, canvas.width, canvas.height);

            // ctx.beginPath();
            // ctx.moveTo(tool.x, tool.y);
            // ctx.lineTo(e.x,   e.y);
            // ctx.stroke();
            // ctx.closePath();
        //   };
      
        // }

        function stop(e){
            if(is_drawing){
                // ctx.moveto(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                ctx.lineTo(e.clientX - canvas.offsetLeft , e.clientY - canvas.offsetTop);
                ctx.strokeStyle = draw_color;
                ctx.lineWidth = draw_width;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.closePath();
                ctx.stroke();
                
                is_drawing = false;
                // tool.started = false;

            }
            // e.preventDefault();
            if(e.type != "mouseout"){
            store.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
            index += 1;
            }
            // e.stopImmediatePropagation();

        }
    
}

function rectangle(){
    // var tool = this;
    // this.started = false;
    // lcheck = true;
    // check = false;
    
        canvas.addEventListener("touchstart", start, false);
        // canvas.addEventListener("touchmove", draw, false);
        canvas.addEventListener("mousedown", start, false);
        // canvas.addEventListener("mousemove", draw, false);

        canvas.addEventListener("touchend", stop, false);
        canvas.addEventListener("mouseup", stop, false);
        canvas.addEventListener("mouseout", stop, false);
        
        var preX;
        // var newX;
        var preY;
        // var newY;


        function start(e) {
            // tool.started = true;
            is_drawing = true;
            ctx.beginPath();
            // ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.strokeRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 0, 0);
            preX = e.clientX - canvas.offsetLeft;
            preY = e.clientY - canvas.offsetTop;
            e.preventDefault();

        }

        // function draw(e) {
        //         if(!tool.started){
        //             return;
        //             // ctx.lineTo(e.clientX - canvas.offsetLeft , e.clientY - canvas.offsetTop);
        //             // ctx.strokeStyle = draw_color;
        //             // ctx.lineWidth = draw_width;
        //             // ctx.lineCap = "round";
        //             // ctx.lineJoin = "round";
        //             // ctx.stroke();
        //         }

        //     }
        function stop(e){
            if(is_drawing){
                // ctx.moveto(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                ctx.strokeRect(preX , preY, e.clientX - canvas.offsetLeft - preX, e.clientY - canvas.offsetTop - preY);
                ctx.strokeStyle = draw_color;
                // ctx.lineWidth = draw_width;
                // ctx.lineCap = "round";
                // ctx.lineJoin = "round";
                ctx.closePath();
                // ctx.stroke();
                
                is_drawing = false;
                // tool.started = false;

            }
            e.preventDefault();
            if(e.type != "mouseout"){
            store.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
            index += 1;
            }

        }
    
}

function circle(){
    lcheck = true;
    check = false;
    if(lcheck === true){
        canvas.addEventListener("touchstart", start, false);
        // canvas.addEventListener("touchmove", draw, false);
        canvas.addEventListener("mousedown", start, false);
        // canvas.addEventListener("mousemove", draw, false);

        canvas.addEventListener("touchend", stop, false);
        canvas.addEventListener("mouseup", stop, false);
        canvas.addEventListener("mouseout", stop, false);
        
        var preX;
        // var newX;
        var preY;
        // var newY;


        function start(e) {
            is_drawing = true;
            ctx.beginPath();
            // ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.arc(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 0, 0, 2 * Math.PI);
            preX = e.clientX - canvas.offsetLeft;
            preY = e.clientY - canvas.offsetTop;
            e.preventDefault();

        }
        function stop(e){
            if(is_drawing){
                // ctx.moveto(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                ctx.arc(preX + (e.clientX - canvas.offsetLeft - preX)/2 , preY, (e.clientX - canvas.offsetLeft - preX)/2, 0, 2 * Math.PI);
                ctx.strokeStyle = draw_color;
                ctx.stroke();
                // ctx.lineWidth = draw_width;
                // ctx.lineCap = "round";
                // ctx.lineJoin = "round";
                ctx.closePath();
                // ctx.stroke();
                
                is_drawing = false;

            }
            e.preventDefault();
            if(e.type != "mouseout"){
            store.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
            index += 1;
            }

        }
    }
}


function eraser(){
        
        canvas.addEventListener("touchstart", start, false);
        canvas.addEventListener("touchmove", draw, false);
        canvas.addEventListener("mousedown", start, false);
        canvas.addEventListener("mousemove", draw, false);

        canvas.addEventListener("touchend", stop, false);
        canvas.addEventListener("mouseup", stop, false);
        canvas.addEventListener("mouseout", stop, false);


        function start(e) {
            is_drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            e.preventDefault();

        }

        function draw(e) {
            if(is_drawing){
                ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                ctx.strokeStyle = start_background;
                ctx.lineWidth = erase_width;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.stroke();
            }
        }

        function stop(e){
            if(is_drawing){
                ctx.stroke();
                ctx.closePath();
                is_drawing = false;

            }
            e.preventDefault();
            if(e.type != "mouseout"){
            store.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
            index += 1;
            }

        }
}

function clear_canvas(){
    ctx.fillStyle = start_background;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    store = [];
    index = -1;
}

function undo_last(){
    let tmp;
    if(index <= 0){
        clear_canvas();

    }else{
        index -= 1;
        tmp = store.pop();
        restore.push(tmp);
        ctx.putImageData(store[index], 0, 0);
    }

}
function redo_last(){
    let a;
    // if(index == store.length){
    //     clear_canvas();

    // }else{
        index += 1;
        a = restore.pop();
        store.push(a);
        ctx.putImageData(store[index], 0, 0);
    // }

}
