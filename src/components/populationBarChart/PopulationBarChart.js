import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  
  const canvasRef = useRef(null)
 

  const drawBar = (ctx,canvas) => {
    ctx.fillStyle = 'navy';
    const namesArray = props.fiveplanetsdetails.map(planet => planet.name);
    const populationsArray = props.fiveplanetsdetails.map(planet => planet.population);
    const width = 50;
    let currX = 50;
    const base = 200;
    for (var i=0; i<namesArray.length; i++){
      const h = Math.log(populationsArray[i])*10
      ctx.fillRect(currX, canvas.height - h, width, h);
      ctx.fillText(populationsArray[i], currX ,canvas.height - h -10);
      ctx.fillText(namesArray[i], currX ,canvas.height - h -20);
      currX += width +10;
    }


  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    //Our draw came here
    drawBar(context,canvas)
    
    
  }, [])
  
  return <canvas ref={canvasRef} width={600} height={300} {...props}/>
}

export default Canvas
