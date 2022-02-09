import classes from './MyCanvas.module.css';

export const MyCanvas = () => {
    window.addEventListener("load", function onWindowLoad(){
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        var points = [];
        var img = new Image();
 
	    img.src = 'https://static.zerochan.net/Sakurajima.Mai.full.3105110.jpg';
       
        img.addEventListener('load', function(){
            ctx.drawImage(img, 0, 0);
            var mouseX = 0;
		var mouseY = 0;
		
		// Стиль линии
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2; 
		var isDrawing = false;
 
		// Обработчики рисования мышкой
		canvas.addEventListener('mousedown', function(event) {
			setMouseCoordinates(event);
			isDrawing = true;
			ctx.beginPath();
			ctx.moveTo(mouseX, mouseY);
				
			points.push({
				x: mouseX,
				y: mouseY,
				mode: "begin"
			});
		});
 
		canvas.addEventListener('mousemove', function(event) {
			setMouseCoordinates(event);
			if(isDrawing){
				ctx.lineTo(mouseX, mouseY);
				ctx.stroke();
			   	points.push({
					x: mouseX,
					y: mouseY,
					mode: "draw"
				});					
			}
		});
 
		canvas.addEventListener('mouseup', function(event) {
			setMouseCoordinates(event);
			isDrawing = false;
				
			points.push({
				x: mouseX,
				y: mouseY,
				mode: "end"
			});
		});
 
		function setMouseCoordinates(event) {
			mouseX = event.offsetX;
			mouseY = event.offsetY;
		}
        });
     
    });
      return (
        <div>
            <a href="#" id="undo">Отменить</a>
            <a href="#" id="clear">Очистить</a>
 
            <form id="form" action="" method="post">
	            <div className="paint-canvas">
		            <canvas id='canvas' className={classes.cnvs}></canvas>
		            <input id="canvas_img" type="hidden" name="canvas_img" value=""/>
	            </div>
            </form>
        </div>
       
      );
  }
  
  export default MyCanvas;