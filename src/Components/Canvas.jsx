import React, { useRef, useEffect, useState, useCallback } from 'react'
//import resizeCanvasToDisplaySize from 'resizeCanvas';

function resizeCanvasToDisplaySize(canvas) {
    
  const { width, height } = canvas.getBoundingClientRect()

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    return true // here you can return some usefull information like delta width and delta height instead of just true
    // this information can be used in the next redraw...
  }

  return false
}

const Canvas = props => {
  const { color, ...rest } = props
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0
  });

  const drawImg = (ctx) => {
    const img = new Image();
      img.src = 'https://static.zerochan.net/Sakurajima.Mai.full.3105110.jpg';
        img.addEventListener('load', function(){
            ctx.drawImage(img, 0, 0);
    });
  }

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
    drawImg(ctx.current);
  }, []);


  const draw = useCallback((x, y) => {
    if (mouseDown) {
      ctx.current.beginPath();
      ctx.current.strokeStyle = color;
      ctx.current.lineWidth = 10;
      ctx.current.lineJoin = 'round';
      ctx.current.moveTo(lastPosition.x, lastPosition.y);
      ctx.current.lineTo(x, y);
      ctx.current.closePath();
      ctx.current.stroke();

      setPosition({
        x,
        y
      })
    }
  }, [lastPosition, mouseDown, color, setPosition])

  const download = async () => {
    const image = canvasRef.current.toDataURL('image/png');
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  }

  const clear = () => {
    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
  }

  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    })
    setMouseDown(true)
  }

  const onMouseUp = (e) => {
    setMouseDown(false)
  }

  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY)
  }

  
  return <canvas
  ref={canvasRef}
  onMouseDown={onMouseDown}
  onMouseUp={onMouseUp}
  onMouseLeave={onMouseUp}
  onMouseMove={onMouseMove}
/>
}
  
export default Canvas;