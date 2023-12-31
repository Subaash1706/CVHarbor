import React, { useEffect, useState } from 'react'
import classes from './landing.module.css'
// import bgImage from '../../assets/images/image.png'
// import fromImg from '../../assets/images/sample/Arrayfrom.png'
// import *as images from './Images'
import {harvardFileArray, mitFileArray, modernFileArray} from '../imageSelector'


function Landing(props) {
  const imageArray = [...harvardFileArray, ...mitFileArray, ...modernFileArray]
  const [ hoveredState, setHoveredState ] = useState(false)
  const [ hoveredItem, setHoveredItem ] = useState('')
  // const imageBaseUrl = "src/assets/images/sample/"
  function changeBg(e){
    setHoveredState(true)

  }
  function changePosition(e){
    const proceed = document.querySelector('.proceedButton');
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
        const targetImage = (imageArray[Math.floor(Math.random()*totalFiles)])
        setHoveredItem(targetImage)
      }, 1000)
    }
  }, [ hoveredState ])
  function renderSample(){
    // const totalFiles = Object.keys(images).length

    const totalFiles = imageArray.length
    return(
      Array.from({ length: totalFiles }, (_, ind)=><img key={ind} src ={ imageArray[ind] }/>)
    )
  }
  return (
    <div className={ classes.landingPageContainer }>
      <div className={classes.landingPageTextContainer}>
        <div className={ classes.landingPageText} onMouseEnter={ changeBg } style={{ 'background': hoveredState
         ? `url(${hoveredItem})` :  '', 'color': hoveredState ? 'transparent' : 'rgb(0, 58, 0)' }} onMouseLeave={ ()=>{setHoveredItem(''); setHoveredState(false)} } onMouseMove={ changePosition } onClick={()=>{props.overlayStatus(true); console.log('clicked')}}>
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