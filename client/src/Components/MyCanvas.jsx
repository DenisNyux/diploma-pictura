import classes from './MyCanvas.module.css';
import MySideNav from './MySideNav';
import { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import iconLoad from './icons/box-arrow-in-down.svg';
import iconSave from './icons/box-arrow-down.svg';
import iconBrush from './icons/brush.svg';
import iconEraser from './icons/eraser.svg';
import iconRect from './icons/square.svg';
import iconTri from './icons/triangle.svg';
import iconCircle from './icons/circle.svg';
import iconRotate from './icons/rotate.svg';
import iconCrop from './icons/crop.svg';
import iconUndo from './icons/undo.svg';
import iconCounterclock from './icons/arrow-counterclockwise.svg';
import iconClockwise from './icons/arrow-clockwise.svg';
import iconFilter from './icons/asterisk.svg';
import iconGauss from './icons/bullseye.svg';
import React, { useState } from 'react';
import Modal from './Modal/Modal';
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { HexColorPicker } from "react-colorful";





export const MyCanvas = () => {
	const [loadModalActive, setLoadModalActive] = useState(true); // состояние модального окна
	const [brushModalActive, setBrushModalActive] = useState(false); 
	const [eraseModalActive, setEraseModalActive] = useState(false);
	const [cropModalActive, setCropModalActive] = useState(false);
	const [filterModalActive, setFilterModalActive] = useState(false);
	const [gaussModalActive, setGaussModalActive] = useState(false);
	const [drag, setDrag] = useState(false); // состояние перетаскивания
	const [rotateModalActive, setRotateModalActive] = useState(false);
	const [openEr,setOpenErase] = useState(false); // состояние dropdown кисти
	const [openBr,setOpenBrush] = useState(false); // состояние dropdown ластика
	const [brushVal, setBrushVal] = useState(10); // состояние размера кисти
	const [eraseVal, setEraseVal] = useState(20); // состояние размера ластика
	const [color, setColor] = useState("#aabbcc"); //состояние палитры
	const [angleValue, setAngleValue] = useState("0"); // состояние угла
	const [bs64, setBs64] = useState("");
	const [filename, setName] = useState("");
	const [bgPath, setBgPath] = useState("");
	const [fgPath, setFgPath] = useState("");
	const [gaussVal, setGaussVal] = useState(0);

	const API_URL = "http://palitra-redactor.ru:3030/api/"
	

    window.addEventListener("load", function onWindowLoad(){
		//document.querySelector('.authWindow').style.display = 'none';
        const canvasBg = document.getElementById("bg");
        const ctxBg = canvasBg.getContext("2d");
        const canvasFg = document.getElementById("fg");
        const ctxFg = canvasFg.getContext("2d");
		const canvasSave = document.getElementById("readyimg");
		const ctxSave = canvasSave.getContext('2d'); 
		// const img = new Image();
	    // img.src = myimg;
        // img.addEventListener('load', function(){
        //     ctxBg.canvas.width  = img.width;
		// 	ctxBg.canvas.height = img.height;
		// 	ctxFg.canvas.width  = img.width;
		// 	ctxFg.canvas.height = img.height;
		// 	ctxSave.canvas.width  = img.width;
		// 	ctxSave.canvas.height = img.height;
		// 	ctxBg.drawImage(img, 0, 0);
		// });
	
		//ctxBg.canvas.width  = window.innerWidth;
        //ctxBg.canvas.height = window.innerHeight;

		//чтобы отключить сглаживание изображения
		ctxBg.webkitImageSmoothingEnabled = false;
		ctxBg.msImageSmoothingEnabled = false;
		ctxBg.imageSmoothingEnabled = false;
        
		let points = [];
      		
        //ctxFg.canvas.width  = window.innerWidth;
    	//ctxFg.canvas.height = window.innerHeight;
		
		let mouseX = 0;
		let mouseY = 0;
		let isDrawing = false;

		const setMouseCoordinates = (e) => {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		};

		const mouseDown = (e) => {
			setMouseCoordinates(e);
			isDrawing = true;
			ctxFg.beginPath();
			ctxFg.moveTo(mouseX, mouseY);
			
			points.push({
			x: mouseX,
			y: mouseY,
			mode: "begin"
			});
			picsCashe.casheMut(true);
			document.querySelector('#resizeInp').value = 2
		}
		
		const mouseMove = (e) => {
			setMouseCoordinates(e);
			if(isDrawing){
				ctxFg.lineTo(mouseX, mouseY);
				ctxFg.stroke();
				   points.push({
					x: mouseX,
					y: mouseY,
					mode: "draw"
				});					
			}
			picsCashe.casheMut(true);
			document.querySelector('#resizeInp').value = 2
		}

		const mouseUp = (e) => {
			setMouseCoordinates(e);
			isDrawing = false;
			
			points.push({
				x: mouseX,
				y: mouseY,
				mode: "end"
			});
			picsCashe.casheMut(true);
			document.querySelector('#resizeInp').value = 2
		}
		// Обработчики рисования мышкой
		const brushFunc = () => {
			ctxFg.globalCompositeOperation = "source-over";
			//canvasFg.removeEventListener('click',mouseCoordEvent);
			canvasFg.addEventListener('mousedown', mouseDown);
			canvasFg.addEventListener('mousemove', mouseMove);
			canvasFg.addEventListener('mouseup', mouseUp);
		}
		let coord = [];

		const removeListeners = () => {
			ctxFg.globalCompositeOperation = "source-over";
			canvasFg.removeEventListener('mousedown', mouseDown);
			canvasFg.removeEventListener('mousemove', mouseMove);
			canvasFg.removeEventListener('mouseup', mouseUp);
		}

		// функция рисования треугольника
		const triangleFunc = () => {
			removeListeners();
			canvasFg.addEventListener('click', mouseTriCoordEvent);
		}

		const rectFunc = () => {
			removeListeners();
			canvasFg.addEventListener('click', mouseRectCoordEvent);
		}

		const mouseCropFunc = () => {
			removeListeners();
			canvasFg.addEventListener('click', mouseRectCropEvent);
		}

		const circleFunc = () => {
			removeListeners();
			canvasFg.addEventListener('click', mouseCircleCoordEvent);
		}

		const mouseTriCoordEvent = (e) => {
			console.log(coord);
			setMouseCoordinates(e);
			coord.push({
				x: mouseX,
				y: mouseY,
			});
			
			if (coord.length === 3) {
				isDrawing = true;
				ctxFg.beginPath();
				ctxFg.moveTo(coord[0]['x'], coord[0]['y']);
				ctxFg.lineTo(coord[1]['x'], coord[1]['y']);
				ctxFg.lineTo(coord[2]['x'], coord[2]['y']);
				ctxFg.closePath();
				ctxFg.stroke();
				isDrawing = false;
				canvasFg.removeEventListener('click',mouseTriCoordEvent);
				coord.length = 0;
			
			}
			picsCashe.casheMut(true);
			document.querySelector('#resizeInp').value = 2
		}

		const mouseRectCoordEvent = (e) => {
			console.log(coord);
			setMouseCoordinates(e);
			coord.push({
				x: mouseX,
				y: mouseY,
			});
			
			if (coord.length === 2) {
				isDrawing = true;
				const rectWidth = Math.abs(coord[1]['x'] - coord[0]['x']);
				const rectHeight = Math.abs(coord[1]['y'] -  coord[0]['y']);
				ctxFg.strokeRect(coord[0]['x'],coord[0]['y'],rectWidth,rectHeight);
				isDrawing = false;
				canvasFg.removeEventListener('click',mouseRectCoordEvent);
				coord.length = 0;
			
			}
			picsCashe.casheMut(true);
			document.querySelector('#resizeInp').value = 2
		}


		let cropCoord = [];
		const mouseRectCropEvent = (e) => {
			setMouseCoordinates(e);
			cropCoord.push({
				x: mouseX,
				y: mouseY,
			});
			
			// console.log(cropCoord);
			if (cropCoord.length === 2) {
				// console.log(cropCoord);
				// console.log(canvasFg.width, canvasFg.height)

				const qWidth = Math.abs(cropCoord[0].x - cropCoord[1].x)
				const qHeight = Math.abs(cropCoord[0].y - cropCoord[1].y)
				const qTop = cropCoord[0].y < cropCoord[1].y ? cropCoord[0].y : cropCoord[1].y
				const qLeft = cropCoord[0].x < cropCoord[1].x ? cropCoord[0].x : cropCoord[1].x
				console.log(qHeight, qWidth, qLeft, qTop)

				try{
					sendCrop(qLeft, qTop, qWidth, qHeight)
				}
				catch {
					console.log('err on crop')
				}
				// picsCashe.rewriteCache(false);
				// const [bgPath, fgPath] = picsCashe.getCache();
				// fetch(`${API_URL}crop?path${bgPath}`)

				cropCoord.length = 0
				canvasFg.removeEventListener('click',mouseRectCropEvent);
			}
			picsCashe.casheMut(true);
			document.querySelector('#resizeInp').value = 2;
		}

		const mouseCircleCoordEvent = (e) => {
			console.log(coord);
			setMouseCoordinates(e);
			coord.push({
				x: mouseX,
				y: mouseY,
			});
			
			if (coord.length === 2) {
				isDrawing = true;
				const radius = Math.abs(coord[1]['x'] -  coord[0]['x']);
				ctxFg.beginPath();
				ctxFg.arc(coord[0]['x'],coord[0]['y'],radius,0, 2*Math.PI, false);
				ctxFg.closePath();
				ctxFg.stroke();
				isDrawing = false;
				canvasFg.removeEventListener('click',mouseCircleCoordEvent);
				coord.length = 0;
			
			}
			picsCashe.casheMut(true);
			document.querySelector('#resizeInp').value = 2 
		}

		
		const triangleBtn = document.getElementById('triangleBtn');
		triangleBtn.addEventListener('click', triangleFunc);

		const rectBtn = document.getElementById('rectBtn');
		rectBtn.addEventListener('click', rectFunc);
		
		const circleBtn = document.getElementById('circleBtn');
		circleBtn.addEventListener('click', circleFunc);
		
		const brushBtn = document.getElementById('mybrushBtn');
		brushBtn.addEventListener('click', brushFunc);

		const cropBtn = document.getElementById('cropBtn');
		cropBtn.addEventListener('click', mouseCropFunc);
		
		//переключение режима кисти на ластик
		const eraseBtn = document.getElementById('eraseBtn');
		eraseBtn.addEventListener('click', () => {	
			//canvasFg.removeEventListener('click',mouseCoordEvent);
			canvasFg.addEventListener('mousedown', mouseDown);
			canvasFg.addEventListener('mousemove', mouseMove);
			canvasFg.addEventListener('mouseup', mouseUp);
			ctxFg.globalCompositeOperation = 'destination-out';
		})

	// 	function redrawAll(){

	// 		if(points.length===0){return;}
	
	// 		ctxFg.clearRect(0,0,canvasFg.width,canvasFg.height);
	
	// 		for(let i=0;i<points.length;i++){
	
	// 		  let pt=points[i];
	
	// 		  if(ctxFg.lineWidth!==pt.size){
	// 			  ctxFg.lineWidth=pt.size;
	// 		  }
	// 		  if(ctxFg.strokeStyle!==pt.color){
	// 			  ctxFg.strokeStyle=pt.color;
	// 		  }
	// 		  if(ctxFg.globalCompositeOperation!==pt.eraseMode){
	// 			ctxFg.globalCompositeOperation=pt.eraseMode;
	// 			}
	// 		  if(pt.mode==="begin"){
	// 			  ctxFg.beginPath();
	// 			  ctxFg.moveTo(pt.x,pt.y);
	// 		  }
	// 		  ctxFg.lineTo(pt.x,pt.y);
	// 		  if(pt.mode === "end" || (i===points.length-1)){
	// 			  ctxFg.stroke();
	// 		  }
	// 		}

	// 		ctxFg.stroke();
	// 	}
	
	// 	function undoLast(){
	// 		//console.log(points);
	// 		points.pop();
	// 		//console.log(points);
	// 		redrawAll();
	// 	}
	// 	const undoBtn = document.querySelector('#undo');
	// 	let interval;
	// 	const undoFuncDown = () => {
	// 	interval = setInterval(undoLast, 10);
	// 	}
	// 	const undoFuncUp = () => {
	// 		clearInterval(interval);
	// 		if(points.length!==0){points[points.length-1].mode =  "end";}
	// 	}

	// 	undoBtn.addEventListener('mousedown', undoFuncDown);
	// 	undoBtn.addEventListener('mouseup', undoFuncUp);
    });

	let encoded

	let picsCashe = {
		bg_path: null,
		fg_path: null,
		changable: true,
		casheMut: function(bool_val) {
			this.changable = bool_val
		},
		setCashe: function(values) {
			this.bg_path = values[0];
			this.fg_path = values[1];
		},
		getCache: function(){
			return [this.bg_path, this.fg_path]
		},
		rewriteCache: async function(mutability) {
			if (this.changable){
				// await fetch(API_URL + '?path=' + bgResult.path, {method: 'DELETE'})
				// await fetch(API_URL + '?path=' + fgResult.path, {method: 'DELETE'})
				const Fg = getImage(document.getElementById("fg"))
				.src
				.replace("data:", "").replace(/^.+,/, "");
				const Bg = getImage(document.getElementById("bg"))
				.src
				.replace("data:", "").replace(/^.+,/, "");

				const firstRequestOptions = prepareRequestOptions([["base64image", Bg]]);
				const secondRequestOptions = prepareRequestOptions([["base64image", Fg]]);

				const bgResult = await fetch(API_URL, firstRequestOptions)
				.then(response => response.json())
				.catch(error => console.log(`error occured on saving`));

				const fgResult = await fetch(API_URL, secondRequestOptions)
				.then(response => response.json())
				.catch(error => console.log(`error occured on saving`));

				this.setCashe([bgResult.path, fgResult.path]);
				this.casheMut(mutability);
				// return [bgResult.path, fgResult.path]

				
			}
			else {
				console.log('cant change cache')
			}
		}
	}


	async function handleChange(ev) {
		console.log('called encoded change')
		const file = ev.target.files[0];
		setName(file.name);
		setBs64(await getBase64(file))
	}

	const getBase64 = (file) => new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result.replace("data:", "").replace(/^.+,/, ""))
		reader.onerror = (error) => reject('Error: ', error);
	})

	const prepareRequestOptions = (searchParams) =>  {
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
		let urlencoded = new URLSearchParams();
		searchParams.forEach(el => urlencoded.append(el[0], el[1]))
		return {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		await fetch(API_URL + '?path=' + bgPath, {method: 'DELETE'})
		const requestOptions = prepareRequestOptions([["base64image", bs64], ["image_name", filename]])
		const result = await fetch(API_URL, requestOptions)
		.then(response =>
			response.json())
		// .then(r => console.log(r))
		.catch(error => console.log(`error occured ${error}`));
		await resizeCanvases(result.meta.width, result.meta.height).then(x=>console.log(x));
		await loadImgToBgCv(result.bs64string, result.meta.width, result.meta.height, result.meta.format)
		.then((x)=>console.log(x));
		setBgPath(result.path);
		// console.log(path)
		setLoadModalActive(false);

		picsCashe.casheMut(true);

	}

	const resizeCanvases = (wdh, hgt) => new Promise((resolve, reject) => {
		const ctxBg = document.getElementById("bg").getContext("2d");
		const ctxFg = document.getElementById("fg").getContext("2d");
		const ctxSave = document.getElementById("readyimg").getContext("2d");
		ctxBg.canvas.width  = wdh;
		ctxBg.canvas.height = hgt;
		ctxFg.canvas.width  = wdh;
		ctxFg.canvas.height = hgt;
		ctxSave.canvas.width  = wdh;
		ctxSave.canvas.height = hgt;
		resolve('canvases resized')
		reject('error occored with resizing canvases')
	})
	
	
	const loadImgToBgCv = (base64str, wdh, hgt, format) => new Promise((resolve, reject) =>{
		const new_img = new Image()
		new_img.src = `data:image/${format};base64,${base64str}`
		new_img.width = wdh
		new_img.height = hgt
		console.log('On BG we have')
		console.log(new_img)
		const canvasBg = document.getElementById("bg");
        const ctxBg = canvasBg.getContext("2d");
		new_img.onload = () => {
			ctxBg.drawImage(new_img, 0, 0);
			resolve('BG image was drawn on canvas')
			reject('Canvas error occured')
		} 
	})

	const loadImgToFgCv = (base64str, wdh, hgt, format) => new Promise((resolve, reject) =>{
		const new_img = new Image()
		new_img.src = `data:image/${format};base64,${base64str}`
		new_img.width = wdh
		new_img.height = hgt
		console.log('On FG we have')
		console.log(new_img)
        const canvasFg = document.getElementById("fg");
        const ctxFg = canvasFg.getContext("2d");
		new_img.onload = () => {
			ctxFg.drawImage(new_img, 0, 0);
			resolve('FG image was drawn on canvas')
			reject('Canvas error occured')
		} 
	})


	function dragStartHandler(e) {
    	e.preventDefault();
    	setDrag(true); 
  	};

  	function dragLeaveHandler(e) {
    	e.preventDefault();
    	setDrag(false); 
  	}

  	async function onDropHandler(e) {
    	e.preventDefault();
		await fetch(API_URL + '?path=' + bgPath, {method: 'DELETE'})
		setDrag(false); 
		const file = e.dataTransfer.files[0]
		console.log(file)
    	const requestOptions = prepareRequestOptions([["base64image", await getBase64(file)], ["image_name", file.name]])
		const result = await fetch(API_URL, requestOptions)
		.then(response =>
			response.json())
		// .then(r => console.log(r))
		.catch(error => console.log(`error occured ${error}`));
		await resizeCanvases(result.meta.width, result.meta.height).then(x=>console.log(x));
		await loadImgToBgCv(result.bs64string, result.meta.width, result.meta.height, result.meta.format)
		.then((x)=>console.log(x))
		setBgPath(result.path)
		setLoadModalActive(false);
		
		picsCashe.casheMut(true);

  	}


	// function prepareGetOptions(params) {

	// }

	async function rotateImage(angle){
		const Fg = getImage(document.getElementById("fg"))
		.src
		.replace("data:", "").replace(/^.+,/, "");
		const Bg = getImage(document.getElementById("bg"))
		.src
		.replace("data:", "").replace(/^.+,/, "");

		const firstRequestOptions = prepareRequestOptions([
			["base64image", Bg], 
			["image_name", filename],
			["angle", angle]
		]);

		const secondRequestOptions = prepareRequestOptions([
			["base64image", Fg], 
			["image_name", filename],
			["angle", angle]
		]);

		const bgResult = await fetch(API_URL + "rotate", firstRequestOptions)
		.then(response => response.json())
		// .then(x => console.log(x))
		.catch(error => console.log(`error occured on sending rotate req`));
		await resizeCanvases(bgResult.meta.width, bgResult.meta.height).then((x)=>console.log(x));
		await loadImgToBgCv(bgResult.bs64string, bgResult.meta.width, bgResult.meta.height, bgResult.meta.format)
		.then((x)=>console.log(x));
		

		const fgResult = await fetch(API_URL + "rotate", secondRequestOptions)
		.then(response => response.json())
		.catch(error => console.log(`error occured on sending rotate req`));
		await loadImgToFgCv(fgResult.bs64string, fgResult.meta.width, fgResult.meta.height, fgResult.meta.format)
		.then((x)=>console.log(x));
		

		document.querySelector('#resizeInp').value = 2
		picsCashe.casheMut(true);
		// await fetch(API_URL + '?path=' + path, {method: 'DELETE'})
	}


	

	async function handleScaleChange() {
		await picsCashe.rewriteCache(false);
		const [bgPath, fgPath] = picsCashe.getCache();
		const kf = Number(document.querySelector('#resizeInp').value) / 2;
		
		const bgResult = await fetch(`${API_URL}resize?path=${bgPath}&kf=${kf}`, {method: 'GET'})
		.then(x=>x.json())
		await resizeCanvases(bgResult.meta.width, bgResult.meta.height).then((x)=>console.log(x));
		await loadImgToBgCv(bgResult.bs64string, bgResult.meta.width, bgResult.meta.height, bgResult.meta.format)
		.then((x)=>console.log(x));


		const fgResult = await fetch(`${API_URL}resize?path=${fgPath}&kf=${kf}`, {method: 'GET'})
		.then(x=>x.json())
		await loadImgToFgCv(fgResult.bs64string, fgResult.meta.width, fgResult.meta.height, fgResult.meta.format)
		.then((x)=>console.log(x));


	}

	async function sendCrop(lt, tp, wd, hg){
		const Fg = getImage(document.getElementById("fg"))
		.src
		.replace("data:", "").replace(/^.+,/, "");
		const Bg = getImage(document.getElementById("bg"))
		.src
		.replace("data:", "").replace(/^.+,/, "");

		const firstRequestOptions = prepareRequestOptions([
			["base64image", Bg], 
			["image_name", filename],
			["left", lt],
			["top", tp],
			["width", wd],
			["height", hg]
		]);

		const secondRequestOptions = prepareRequestOptions([
			["base64image", Fg], 
			["image_name", filename],
			["left", lt],
			["top", tp],
			["width", wd],
			["height", hg]
		]);

		const bgResult = await fetch(API_URL + "crop", firstRequestOptions)
		.then(response => response.json())
		.catch(error => console.log(`error occured on sending rotate req`));
		await resizeCanvases(bgResult.meta.width, bgResult.meta.height).then((x)=>console.log(x));
		await loadImgToBgCv(bgResult.bs64string, bgResult.meta.width, bgResult.meta.height, bgResult.meta.format)
		.then((x)=>console.log(x));
		

		const fgResult = await fetch(API_URL + "crop", secondRequestOptions)
		.then(response => response.json())
		.catch(error => console.log(`error occured on sending rotate req`));
		await loadImgToFgCv(fgResult.bs64string, fgResult.meta.width, fgResult.meta.height, fgResult.meta.format)
		.then((x)=>console.log(x));

	}

	async function handleScaleChange() {
		await picsCashe.rewriteCache(false);
		const [bgPath, fgPath] = picsCashe.getCache();
		const kf = Number(document.querySelector('#resizeInp').value) / 2;
		
		const bgResult = await fetch(`${API_URL}resize?path=${bgPath}&kf=${kf}`, {method: 'GET'})
		.then(x=>x.json())
		await resizeCanvases(bgResult.meta.width, bgResult.meta.height).then((x)=>console.log(x));
		await loadImgToBgCv(bgResult.bs64string, bgResult.meta.width, bgResult.meta.height, bgResult.meta.format)
		.then((x)=>console.log(x));


		const fgResult = await fetch(`${API_URL}resize?path=${fgPath}&kf=${kf}`, {method: 'GET'})
		.then(x=>x.json())
		await loadImgToFgCv(fgResult.bs64string, fgResult.meta.width, fgResult.meta.height, fgResult.meta.format)
		.then((x)=>console.log(x));
	}


	async function gauss(kf) {
		const Fg = getImage(document.getElementById("fg"))
		.src
		.replace("data:", "").replace(/^.+,/, "");
		const Bg = getImage(document.getElementById("bg"))
		.src
		.replace("data:", "").replace(/^.+,/, "");

		const firstRequestOptions = prepareRequestOptions([
			["base64image", Bg], 
			["image_name", filename],
			["kf", kf]
		]);

		const secondRequestOptions = prepareRequestOptions([
			["base64image", Fg], 
			["image_name", filename],
			["angle", kf]
		]);

		const bgResult = await fetch(API_URL + "gblur", firstRequestOptions)
		.then(response => response.json())
		// .then(x => console.log(x))
		.catch(error => console.log(`error occured on sending rotate req`));
		await resizeCanvases(bgResult.meta.width, bgResult.meta.height).then((x)=>console.log(x));
		await loadImgToBgCv(bgResult.bs64string, bgResult.meta.width, bgResult.meta.height, bgResult.meta.format)
		.then((x)=>console.log(x));
		

		const fgResult = await fetch(API_URL + "gblur", secondRequestOptions)
		.then(response => response.json())
		.catch(error => console.log(`error occured on sending rotate req`));
		await loadImgToFgCv(fgResult.bs64string, fgResult.meta.width, fgResult.meta.height, fgResult.meta.format)
		.then((x)=>console.log(x));
		

		document.querySelector('#resizeInp').value = 2
		picsCashe.casheMut(true);
	}


	


	// async function rotateImage(angle) {
	// 	const Fg = getImage(document.getElementById("fg"))
	// 	.src
	// 	.replace("data:", "").replace(/^.+,/, "");
	// 	const Bg = getImage(document.getElementById("bg"))
	// 	.src
	// 	.replace("data:", "").replace(/^.+,/, "");

	// 	const firstRequestOptions = prepareRequestOptions([
	// 		["base64image", Bg], 
	// 		["image_name", filename],
	// 		["angle", angle]
	// 	]);
	// 	const bgResult = await fetch(API_URL + "/rotate", firstRequestOptions)
	// 	.then(response => response.json())
	// 	.catch(error => console.log(`error occured on sending rotate req`));
	// 	await resizeCanvases(bgResult.meta.width, bgResult.meta.height).then((x)=>console.log(x));
	// 	await loadImgToBgCv(bgResult.bs64img, bgResult.meta.width, bgResult.meta.height, bgResult.meta.format)
	// 	.then((x)=>console.log(x));
		// 	const secondRequestOptions = prepareRequestOptions([
	// 		["base64image", Fg], 
	// 		["image_name", filename],
	// 		["angle", angle]
	// 	]);


	// 	const fgResult = await fetch(API_URL + "/rotate", secondRequestOptions)
	// 	.then(response => response.json())
	// 	.catch(error => console.log(`error occured on sending rotate req`));
	// 	await loadImgToFgCv(fgResult.bs64img, fgResult.meta.width, fgResult.meta.height, fgResult.meta.format)
	// 	.then((x)=>console.log(x));
	// 	picsCashe.casheMut(true);
	// 	document.querySelector('#resizeInp').value = 2
	// }

		

	// let encoded, filename;
	


	// async function handleChange(event) {
	// 	console.log('called encoded change')
	// 	const file = event.target.files[0];
	// 	filename = file.name;
	// 	encoded = await getBase64(file)
	// }

	// 

	// const getBase64 = (file) => new Promise(function (resolve, reject) {
	// 	let reader = new FileReader();
	// 	reader.readAsDataURL(file);
	// 	reader.onload = () => resolve(reader.result.replace("data:", "").replace(/^.+,/, ""))
	// 	reader.onerror = (error) => reject('Error: ', error);
	// })



	// const prepareRequestOptions = (searchParams) =>  {
	// 	let myHeaders = new Headers();
	// 	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
		
	// 	let urlencoded = new URLSearchParams();
	// 	searchParams.forEach(el => urlencoded.append(el[0], el[1]))
	// 	return {
	// 		method: 'GET',
	// 		headers: myHeaders,
	// 		body: urlencoded,
	// 		redirect: 'follow'
	// 	}
	// }


		
	// 	const secondRequestOptions = prepareRequestOptions([
	// 		["base64image", Fg], 
	// 		["image_name", filename],
	// 		["angle", angle]
	// 	]);
	// 	const fgResult = await fetch(API_URL + "/rotate", secondRequestOptions)
	// 	.then(response => response.json())
	// 	.catch(error => console.log(`error occured on sending rotate req`));
	// 	await loadImgToFgCv(fgResult.bs64img, fgResult.meta.width, fgResult.meta.height, fgResult.meta.format)
	// 	.then((x)=>console.log(x));
	// 	picsCashe.casheMut(true);
	// 	document.querySelector('#resizeInp').value = 2
	// }




	// const rewriteCache = (mutability) => new Promise((resolve, reject) =>{
	// 	console.log('called rewritor')
	// 	const Fg = getImage(document.getElementById("fg"))
	// 	.src
	// 	.replace("data:", "").replace(/^.+,/, "");
	// 	const Bg = getImage(document.getElementById("bg"))
	// 	.src
	// 	.replace("data:", "").replace(/^.+,/, "");
	// 	picsCashe.changeCashe([Bg, Fg]);
	// 	picsCashe.casheMut(mutability);
	// 	resolve(picsCashe.getCache())
	// 	reject('cache error ')
	// });


	// async function handleScaleInput() {
	// 	const [Bg, Fg] = await rewriteCache(false).then(x => x)

	// 	const firstRequestOptions = prepareRequestOptions([
	// 		["base64image", Bg], 
	// 		["image_name", filename],
	// 		["kf", Number(document.querySelector('#resizeInp').value) / 2]
	// 	]);
	// 	const bgResult = await fetch(API_URL + "/resize", firstRequestOptions)
	// 	.then(response => response.json())
	// 	.catch(error => console.log(`error occured on sending rotate req`));
	// 	await resizeCanvases(bgResult.meta.width, bgResult.meta.height).then((x)=>console.log(x));
	// 	await loadImgToBgCv(bgResult.bs64img, bgResult.meta.width, bgResult.meta.height, bgResult.meta.format)
	// 	.then((x)=>console.log(x));

	// 	const secondRequestOptions = prepareRequestOptions([
	// 		["base64image", Fg], 
	// 		["image_name", filename],
	// 		["kf", Number(document.querySelector('#resizeInp').value)/2]
	// 	]);
	// 	const fgResult = await fetch(API_URL + "/resize", secondRequestOptions)
	// 	.then(response => response.json())
	// 	.catch(error => console.log(`error occured on sending rotate req`));
	// 	await loadImgToFgCv(fgResult.bs64img, fgResult.meta.width, fgResult.meta.height, fgResult.meta.format)
	// 	.then((x)=>console.log(x));
	// }

	const getImage = canvas =>{
    	let imageData = canvas.toDataURL();
    	let image = new Image();
    	image.src = imageData;
		// image.crossOrigin = 'Anonymous'
    	return image;
	}

	// функция изменяющая размер кисти через ползунок
	const changeBrushSize = () => {
		const canvasFg = document.getElementById("fg");
		const ctxFg = canvasFg.getContext("2d");
		const brushInp = document.getElementById('brushSize');
		setBrushVal(brushInp.value);
		ctxFg.lineWidth = brushVal;
	}
	// функция изменяющая размер ластика через ползунок
	const changeEraseSize = () => {
		const canvasFg = document.getElementById("fg");
		const ctxFg = canvasFg.getContext("2d");
		const eraseInp = document.getElementById('eraseSize');
		setEraseVal(eraseInp.value);
		ctxFg.lineWidth = eraseVal;
	}

	// функция изменения цвета кисти
	const changeBrushColor = () => {
		const canvasFg = document.getElementById("fg");
		const ctxFg = canvasFg.getContext("2d");
		ctxFg.strokeStyle = color;
	}
	//изменение угла поворота изображения
	const changeAngle = () => {
		const angleInp = document.getElementById('angle');
		setAngleValue(angleInp.value);
	}
	//сохранение изображения
	const saveImage = (image) => {
		var link = document.createElement("a");
		link.setAttribute("href", image.src);
		link.setAttribute("download", "canvasImage");
		link.click();
	}
	// изм коэф Гаусса

	const changeGaussKf = () => {
		const gaussInp = document.querySelector('#gauss');
		setGaussVal(gaussInp.value);
	}
	const saveImgBtn = () =>{
		const canvasSave = document.getElementById("readyimg");
		const canvasFg = document.getElementById("fg");
		const canvasBg = document.getElementById("bg");
		const img1 = getImage(canvasBg);
		const img2 = getImage(canvasFg);
		const ctx = canvasSave.getContext('2d');
		img1.onload = () => {
			ctx.drawImage(img1,0,0)
			img2.onload = () => {
			   ctx.drawImage(img2,0,0);
			   let img3 = getImage(canvasSave);
			   saveImage(img3);
			}
		}
	}


    return (
        <div>
			<MySideNav>
				{/* <NavItem id="undo">
					<NavIcon><img className='icon1' alt='icon1' src={iconUndo}></img></NavIcon>
					<NavText>Отменить действие</NavText>
				
				</NavItem> */}

          		<NavItem className="navItem" onClick = {() => setLoadModalActive(true)}>
            		<NavIcon><img className='icon1' alt='icon1' src={iconLoad}></img></NavIcon>
					<NavText>Загрузить</NavText>
				</NavItem>
            	
				<NavItem onClick={saveImgBtn}>
					<NavIcon><img alt='save' src={iconSave}></img></NavIcon>
					<NavText>Сохранить</NavText>
				</NavItem>

            	<NavItem className="navItem" id="mybrushBtn"  onClick = {() => setBrushModalActive(true)}>
					<NavIcon><img alt='Brush' src={iconBrush}></img></NavIcon>
					<NavText>Кисть</NavText>
				</NavItem>
				<NavItem className="navItem" id="eraseBtn" onClick = {() => setEraseModalActive(true)}>
					<NavIcon><img alt='Eraser' src={iconEraser}></img></NavIcon>
					<NavText>Ластик</NavText>
				</NavItem>
				
				<NavItem className="navItem" id='rectBtn'>
            		<NavIcon><img className='icon1' alt='rect' src={iconRect}></img></NavIcon>
					<NavText>Прямоугольник</NavText>
				</NavItem>

				<NavItem className="navItem" id='triangleBtn'>
            		<NavIcon><img className='icon1' alt='triangle' src={iconTri}></img></NavIcon>
					<NavText>Треугольник</NavText>
				</NavItem>
				
				<NavItem className="navItem" id='circleBtn'>
            		<NavIcon><img className='icon1' alt='circle' src={iconCircle}></img></NavIcon>
					<NavText>Круг</NavText>
				</NavItem>

				<NavItem className="navItem" id='rotateBtn' onClick = {() => setRotateModalActive(true)}>
            		<NavIcon><img className='icon1' alt='rotate' src={iconRotate}></img></NavIcon>
					<NavText>Поворот</NavText>
				</NavItem>

				<NavItem className="navItem" id='cropBtn'>
            		<NavIcon><img className='icon1' alt='crop' src={iconCrop}></img></NavIcon>
					<NavText>Обрезка</NavText>
				</NavItem>
				<NavItem className="navItem" id='gaussBtn' onClick = {() => setGaussModalActive(true)}>
            		<NavIcon><img className='icon1' alt='gauss' src={iconGauss}></img></NavIcon>
					<NavText>Размытие по Гауссу</NavText>
				</NavItem>
				<NavItem className="navItem" id='filterBtn' onClick = {() => setFilterModalActive(true)}>
            		<NavIcon><img className='icon1' alt='filter' src={iconFilter}></img></NavIcon>
					<NavText>Фильтры</NavText>
				</NavItem>
        	</MySideNav>  
        
            <form id="form" action="" method="post">
	            <div className="paint-canvas"  onMouseOver = {() => {setOpenBrush(false); setOpenErase(false)}} >
		            <canvas id='bg' className={classes.cnvs_bg}></canvas>
					<canvas id='fg' className={classes.cnvs_fg}></canvas>
					<canvas id='readyimg' className={classes.cnvs_save}></canvas>
		            <input id="canvas_img" type="hidden" name="canvas_img" value=""/>
	            </div>
            </form>
			<Modal active={loadModalActive} setActive={setLoadModalActive}>
          		<Form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
            		<FormGroup>
              			<Label for="loadFile">
                			Загрузите файл
              			</Label>
              			<Input
                			id="loadFile"
                			type="file"
							onChange={handleChange}
              			/>
						<Button className={classes.button}>
    						Загрузить
  						</Button>
            		</FormGroup>
          		</Form>
          		<div className="text-between">или</div>
          	    	{drag
          	    	? <div className="drop-area"
                  	onDragStart={e => dragStartHandler(e)}
                  	onDragLeave={e => dragLeaveHandler(e)}
                  	onDragOver={e => dragStartHandler(e)}
                  	onDrop={e => onDropHandler(e)}
                	>Отпустите файл</div>
          	    	: <div className="drop-area"
                  	onDragStart={e => dragStartHandler(e)}
                  	onDragLeave={e => dragLeaveHandler(e)}
                  	onDragOver={e => dragStartHandler(e)}
                	>Перетащите файл сюда
                	</div>
        	    	}
        	</Modal>
			<Modal active={rotateModalActive} setActive={setRotateModalActive}>
				<Form>
					<FormGroup>
						<Label for="angle">Введите угол поворота</Label>
						<Input
							id="angle"
							name="angle"
							type="text"
							onChange={changeAngle}
							value={angleValue}
						/>
					</FormGroup>
					<Button className={classes.button_form} onClick={()=>rotateImage(angleValue)} >Ок</Button>
				
					<FormGroup>
					<Button type='button' className={classes.button} onClick={()=>rotateImage("90")}><img src={iconClockwise}  id="clockwise" alt="rotateOnClock" /></Button><br/>
					<Button type='button' className={classes.button} onClick={()=>rotateImage("270")}><img src={iconCounterclock}  alt="rotateOnClock" /></Button>
					</FormGroup>
						</Form>		
        	</Modal>
			<Modal active={brushModalActive} setActive={setBrushModalActive}>
				<div>Размер</div>
				<Input
      				id="brushSize"
      				type="range"
					min="0" 
					max="100"
					onChange={changeBrushSize}
					value={brushVal}
					// onBeforeInput={saveCache}
    			/>		
				<div>Цвет</div> 
				<HexColorPicker color={color} onChange={setColor}/>
				<Button className={classes.button} onClick={changeBrushColor}>Поменять цвет</Button>	
        	</Modal>
			<Modal active={eraseModalActive} setActive={setEraseModalActive}>
			 <div>Размер</div>
				<Input
      				id="eraseSize"
      				type="range"
					min="0" 
					max="100"
					onChange={changeEraseSize}
					value={eraseVal}
    			/>		
        	</Modal>
			<Modal active={cropModalActive} setActive={setCropModalActive}>
				<Form>
					<FormGroup>
						<Input
							id="inp1"
							type="text"
						/>
					</FormGroup>
					<FormGroup><Input
							id="inp2"
							type="text"
						/></FormGroup>
						
						<FormGroup><Input
							id="inp3"
							type="text"
						/></FormGroup>
						
						<FormGroup>
						<Input
							id="inp4"
							type="text"
						/>
					</FormGroup>
					<Button type='button' className={classes.button}>Обрезать</Button>
				</Form>
			</Modal>

			<Modal active={gaussModalActive} setActive={setGaussModalActive}>
				<Form>
					<FormGroup>
						<Label for="gauss">Размытие по Гауссу</Label>
						<Input
							id="gauss"
							name="gauss"
							type="text"
							onChange={changeGaussKf}
							value={gaussVal}
						/>
					</FormGroup>
					<Button type='button' className={classes.button} onClick={() => gauss(gaussVal)}>Ок</Button>
				</Form>
			</Modal>
			<Modal active={filterModalActive} setActive={setFilterModalActive}>
				<Button type='button' className={classes.button}>Негатив</Button>
				<Button type='button' className={classes.button}>Черно-белый</Button>
				<Button type='button' className={classes.button}>Сепия</Button>
			</Modal>
			<div id="resize">
			<div>Масштаб</div>
			<Input
      				id="resizeInp"
      				type="range"
					min="1" 
					max="3"
					step="0.1"
					onChange={handleScaleChange}
					// onBeforeInput = {handleScaleBeforeInput}
    			/>		
			</div>
		</div>  
      );
  }
  
  export default MyCanvas;