// 캔버스 부르기
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#line-width");
const lineColor = document.querySelector("#line-color");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const mode = document.getElementById("mode");
const clear = document.getElementById("clearmode");
const eraser =document.getElementById("erasermode");

let isPainting = false;
let isFilling = false;

// 캔버스 크기 조정
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

const colors = [
    "#f03e3e",
    "#e64980",
    "#be4bdb",
    "#7950f2",
    "#4c6ef5",
    "#228be6",
    "#15aabf",
    "#12b886",
    "#40c057",
    "#82c91e",
    "#fab005",
    "#fd7e14"];

function onMousemove (event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }

    ctx.moveTo(event.offsetX, event.offsetY);
    // const strokeColor = colors[Math.floor(Math.random() * colors.length)]
    // ctx.strokeStyle = strokeColor;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

function startPainting(event) {
    isPainting = true;
}

function canclePainting(event) {
    isPainting = false;
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
    ctx.beginPath();
}

function onLineColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
    ctx.beginPath();
}

function onColorOptionClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    lineColor.value = colorValue;
    ctx.beginPath();
}

function modeClick() {
    if(isFilling) {
        isFilling = false;
        mode.innerText = "Convert to FILL mode"
    } else {
        isFilling = true;
        mode.innerText = "Convert to DRAW mode";
    }
   
}

function onCanvasClickToFilling() {
    if(isFilling) {
        ctx.fillRect(0, 0, 800, 800);
    }
}

function onClear() {
    if(isFilling) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 800);
    } else {
        isFilling = true;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 800);
    }
}

function onEraser() {
    ctx.strokeStyle = "white";
    isFilling = false; 
    ctx.beginPath();
}

canvas.addEventListener("mousemove", onMousemove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave", canclePainting);
lineWidth.addEventListener("change", onLineWidthChange);
lineColor.addEventListener("change", onLineColorChange);
mode.addEventListener("click", modeClick);
canvas.addEventListener("click", onCanvasClickToFilling)
clear.addEventListener("click", onClear);
eraser.addEventListener("click", onEraser);

colorOption.forEach((lineColor) => lineColor.addEventListener("click", onColorOptionClick, false));