import classes from './MyCanvas.module.css';
import MySideNav from './MySideNav';
//import Dropdown from './Dropdown';
import {
	NavItem,
	NavIcon,
	NavText
  } from "@trendmicro/react-sidenav";
import iconLoad from './box-arrow-in-down.svg';
import iconSave from './box-arrow-down.svg';
import iconBrush from './brush.svg';
import iconEraser from './eraser.svg';
import iconRect from './square.svg';
import iconTri from './triangle.svg';
import iconCircle from './circle.svg';
import React, { useState } from 'react';
import Modal from './Modal/Modal';
import { Form, FormGroup, Label, Input, Button, Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap';
import { HexColorPicker } from "react-colorful";
import myimg from './456.PNG';
//import "react-colorful/dist/index.css";



export const MyCanvas = () => {
	const [loadModalActive, setLoadModalActive] = useState(false); // состояние модального окна
	const [brushModalActive, setBrushModalActive] = useState(false); 
	const [eraseModalActive, setEraseModalActive] = useState(false);
	const [drag, setDrag] = useState(false); // состояние перетаскивания
	const [rotateModalActive, setRotateModalActive] = useState(false);
	const [openEr,setOpenErase] = useState(false); // состояние dropdown кисти
	const [openBr,setOpenBrush] = useState(false); // состояние dropdown ластика
	const [brushVal, setBrushVal] = useState(10); // состояние размера кисти
	const [eraseVal, setEraseVal] = useState(20); // состояние размера ластика
  	//const [navState, setNavState] = useState(false)
	const [color, setColor] = useState("#aabbcc"); //состояние палитры
	
	function dragStartHandler(e) {
    	e.preventDefault();
    	setDrag(true); 
  	};

  	function dragLeaveHandler(e) {
    	e.preventDefault();
    	setDrag(false); 
  	}

  	function onDropHandler(e) {
    	e.preventDefault();
    	let files = [...e.dataTransfer.files];
    	console.log(files);
    //const formData = new FormData();
    //formData.append('file', files[0]);
    //formData.append('userId', 1);
    //axios.post('url', formData);
    	setDrag(false); 
  	}

	 
	function getImage(canvas){
    	let imageData = canvas.toDataURL();
    	let image = new Image();
    	image.src = imageData;
		image.crossOrigin = 'Anonymous'
    	return image;
	}

    window.addEventListener("load", function onWindowLoad(){
		document.querySelector('.authWindow').style.display = 'none';
        const canvasBg = document.getElementById("bg");
        const ctxBg = canvasBg.getContext("2d");
        const canvasFg = document.getElementById("fg");
        const ctxFg = canvasFg.getContext("2d");
		const canvasSave = document.getElementById("readyimg");
		const ctxSave = canvasSave.getContext('2d'); 
		
		const img = new Image();
	    img.src = myimg;
        img.addEventListener('load', function(){
            ctxBg.canvas.width  = img.width;
			ctxBg.canvas.height = img.height;
			ctxFg.canvas.width  = img.width;
			ctxFg.canvas.height = img.height;
			ctxSave.canvas.width  = img.width;
			ctxSave.canvas.height = img.height;
			ctxBg.drawImage(img, 0, 0);
		
			
		});
	
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
		}

		const mouseUp = (e) => {
			setMouseCoordinates(e);
			isDrawing = false;
			
			points.push({
				x: mouseX,
				y: mouseY,
				mode: "end"
			});
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
		}

		
		const triangleBtn = document.getElementById('triangleBtn');
		triangleBtn.addEventListener('click', triangleFunc);

		const rectBtn = document.getElementById('rectBtn');
		rectBtn.addEventListener('click', rectFunc);
		
		const circleBtn = document.getElementById('circleBtn');
		circleBtn.addEventListener('click', circleFunc);
		
		const brushBtn = document.getElementById('mybrushBtn');
		brushBtn.addEventListener('click', brushFunc);
		
		//переключение режима кисти на ластик
		const eraseBtn = document.getElementById('eraseBtn');
		eraseBtn.addEventListener('click', () => {	
			//canvasFg.removeEventListener('click',mouseCoordEvent);
			canvasFg.addEventListener('mousedown', mouseDown);
			canvasFg.addEventListener('mousemove', mouseMove);
			canvasFg.addEventListener('mouseup', mouseUp);
			ctxFg.globalCompositeOperation = 'destination-out';
		})

		
    });

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
	//сохранение изображения
	const saveImage = (image) => {
		var link = document.createElement("a");
	 
		link.setAttribute("href", image.src);
		link.setAttribute("download", "canvasImage");
		link.click();
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
            		<NavIcon><img className='icon1' alt='rotate' src={iconCircle}></img></NavIcon>
					<NavText>Поворот</NavText>
				</NavItem>

				<NavItem className="navItem" id='cropBtn'>
            		<NavIcon><img className='icon1' alt='crop' src={iconCircle}></img></NavIcon>
					<NavText>Обрезка</NavText>
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
          		<Form action="/fileload" encType="multipart/form-data" method="post">
            		<FormGroup>
              			<Label for="loadFile">
                		Загрузите файл
              			</Label>
              			<Input
                		id="loadFile"
                		name="uploadedFile"
                		type="file"
              			/>
						<Button>
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
          		<Button ><img src="" alt="rotateOnClock" /></Button>
        	</Modal>
			<Modal active={brushModalActive} setActive={setBrushModalActive}>
			<div>Размер</div>
			<Input
      									id="brushSize"
      									name="range"
      									type="range"
										min="0" 
										max="100"
										onChange={changeBrushSize}
										value={brushVal}
    								/>
							
					
									<div>Цвет</div> 
									<HexColorPicker color={color} onChange={setColor}/>
									<Button onClick={changeBrushColor}>Поменять цвет</Button>	
						
        	</Modal>
			<Modal active={eraseModalActive} setActive={setEraseModalActive}>
			 <div>Размер</div>
									<Input
      									id="eraseSize"
      									name="range"
      									type="range"
										min="0" 
										max="100"
										onChange={changeEraseSize}
										value={eraseVal}
    								/>	
						
        	</Modal>
		</div>  
      );
  }
  
  export default MyCanvas;