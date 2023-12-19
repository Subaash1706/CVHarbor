import React, { useEffect, useState } from 'react'
import classes from './landing.module.css'
import bgImage from '../../assets/images/image.png'
import fromImg from '../../assets/images/sample/Arrayfrom.png'
import *as images from './Images'


function Landing() {
  const [ hoveredState, setHoveredState ] = useState(false)
  const [ hoveredItem, setHoveredItem ] = useState('')
  const imageBaseUrl = "src/assets/images/sample/"
  function changeBg(e){
    setHoveredState(true)

  }
  const proceed = document.querySelector('.proceedButton');
  function changePosition(e){
    // console.log(e.target)
    proceed.style.left = `${e.clientX}px`;
    proceed.style.top =  `${e.clientY}px`;
    proceed.style.zIndex = '1';
    proceed.style.transform = 'translate(-50%, -50%)';
    proceed.style.pointerEvents = 'none'
  }
  useEffect(()=>{
    const totalFiles = Object.keys(images).length
    if(hoveredState){
      setInterval(()=>{
        const targetImage = (images[Object.keys(images)[Math.floor(Math.random()*totalFiles)]]).split('/').pop()
        setHoveredItem(targetImage)
      }, 1000)
    }
  }, [ hoveredState ])
  function renderSample(){
    const totalFiles = Object.keys(images).length
    return(
      Array.from({ length: totalFiles }, (_, ind)=><img key={ind} src ={ images[Object.keys(images)[ind]] }/>)
    )
  }
  return (
    <div className={ classes.landingPageContainer }>
      <div className={classes.landingPageTextContainer}>
        <div className={ classes.landingPageText} onMouseEnter={ changeBg } style={{ 'background': hoveredState
         ? `url(${imageBaseUrl}${hoveredItem})` :  '', 'color': hoveredState ? 'transparent' : 'rgb(0, 58, 0)' }} onMouseLeave={ ()=>{setHoveredItem(''); setHoveredState(false)} } onMouseMove={ changePosition }>
          Resume
        </div>
        <button className={`${classes.proceedButton} proceedButton`}>
          <span className={classes.arrow}>&gt;</span>
        </button>
      </div>
        <div className={classes.templateSampleScrollContainer}>
          <div className={ classes.templateSampleScroll }>
            { renderSample() }
            { renderSample() }
          </div>
        </div>
    </div>
  )
}

export default Landing