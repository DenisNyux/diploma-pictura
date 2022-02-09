import classes from './MyCanvas.module.css';
import MySideNav from './MySideNav';
import Dropdown from './Dropdown';
import SideNav, {
	Toggle,
	Nav,
	NavItem,
	NavIcon,
	NavText
  } from "@trendmicro/react-sidenav";
import icon11 from './box-arrow-in-down.svg';
import React, { useState } from 'react';
import Modal from './Modal/Modal';
import { Form, FormGroup, Label, Input} from 'reactstrap';


export const MyCanvas = () => {
	const [modalActive, setModalActive] = useState(false);
	const [drag, setDrag] = useState(false);

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
    window.addEventListener("load", function onWindowLoad(){
        var canvasBg = document.getElementById("bg");
        var ctxBg = canvasBg.getContext("2d");
        ctxBg.canvas.width  = window.innerWidth;
        ctxBg.canvas.height = window.innerHeight;

		//чтобы отключить сглаживание
		ctxBg.mozImageSmoothingEnabled = false;
		ctxBg.webkitImageSmoothingEnabled = false;
		ctxBg.msImageSmoothingEnabled = false;
		ctxBg.imageSmoothingEnabled = false;
        var points = [];
        var img = new Image();
	    img.src = 'https://static.zerochan.net/Sakurajima.Mai.full.3105110.jpg';
        img.addEventListener('load', function(){
            ctxBg.drawImage(img, 0, 0);
		});
		
		var canvasFg = document.getElementById("fg");
        var ctxFg = canvasFg.getContext("2d");
        ctxFg.canvas.width  = window.innerWidth;
        ctxFg.canvas.height = window.innerHeight;
		
		var mouseX = 0;
		var mouseY = 0;
		
		// Стиль линии
		//ctx.strokeStyle = 'red';
		//ctx.lineWidth = 2; 
		var isDrawing = false;
 
		// Обработчики рисования мышкой
		const brushFunc = (e) => {
			ctxFg.globalCompositeOperation = "source-over";
			ctxFg.strokeStyle = 'red';
			
			canvasFg.addEventListener('mousedown', (e) => {
			setMouseCoordinates(e);
			isDrawing = true;
			ctxFg.beginPath();
			ctxFg.moveTo(mouseX, mouseY);
				
			points.push({
				x: mouseX,
				y: mouseY,
				mode: "begin"
			});
		});

		const brushInp = document.getElementById('brushSize');
		brushInp.addEventListener('change', (e) => {
			let size = brushInp.value;
			ctxFg.lineWidth = size;
		})

		
		const eraseInp = document.getElementById('eraseSize');
		eraseInp.addEventListener('change', (e) => {
			let size = eraseInp.value;
			ctxFg.lineWidth = size;
		})

		canvasFg.addEventListener('mousemove', (e) => {
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
		});
 
		canvasFg.addEventListener('mouseup', (e) => {
			setMouseCoordinates(e);
			isDrawing = false;
				
			points.push({
				x: mouseX,
				y: mouseY,
				mode: "end"
			});
		});
 
		function setMouseCoordinates(e) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		};
	}
		const brushBtn = document.getElementById('mybrushBtn');
		brushBtn.addEventListener('click', brushFunc);
		const eraseBtn = document.getElementById('eraseBtn');
		eraseBtn.addEventListener('click', () => {	ctxFg.globalCompositeOperation = 'destination-out';
		ctxFg.lineWidth = 5; })
    });

	const [openEr,setOpenErase] = useState(false);
	const [openBr,setOpenBrush] = useState(false);
	
      return (
        <div>
			<MySideNav>
          		<NavItem className="navItem" onClick = {() => setModalActive(true)}>
            	<NavIcon><img className='icon1' alt='icon1' src={icon11}></img></NavIcon><NavText>Загрузка</NavText></NavItem>
            	<NavItem className="navItem" id="eraseBtn" onMouseOver = {() => setOpenErase(true)}>
					<NavIcon></NavIcon>
					<NavText>Ластик</NavText>
					{openEr ? <Dropdown>
								<NavItem ><NavText>Размер</NavText>
									<input id="eraseSize" type="range" min="0" max="100" step="1"/></NavItem>
							  </Dropdown> : null}
				</NavItem>
            	<NavItem className="navItem" id="mybrushBtn" onMouseOver = {() => setOpenBrush(true)}>
					<NavIcon></NavIcon>
					<NavText>Кисть</NavText>
					{openBr ? <Dropdown>
								<NavItem ><NavText>Размер</NavText>
									<input id="brushSize" type="range" min="0" max="100" step="1"/></NavItem>
								<NavItem><NavText>Цвет</NavText></NavItem>
							  </Dropdown> : null}
				</NavItem>
        	</MySideNav>  
        
            <form id="form" action="" method="post">
	            <div className="paint-canvas"  onMouseOver = {() => {setOpenBrush(false); setOpenErase(false)}}>
		            <canvas id='bg' className={classes.cnvs_bg}></canvas>
					<canvas id='fg' className={classes.cnvs_fg}></canvas>
		            <input id="canvas_img" type="hidden" name="canvas_img" value=""/>
	            </div>
            </form>
			<Modal active={modalActive} setActive={setModalActive}>
          		<Form>
            		<FormGroup>
              			<Label for="exampleFile">
                		Загрузите файл
              			</Label>
              			<Input
                		id="exampleFile"
                		name="file"
                		type="file"
              			/>
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
		</div>       
      );
  }
  
  export default MyCanvas;