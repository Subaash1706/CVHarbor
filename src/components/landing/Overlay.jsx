import React from 'react'
import classes from './overlay.module.css'
import FlexBox from '../cv_components/flexbox/FlexBox'

function Overlay(props) {
  return (
    <div className={`${classes.overlayContainer} ${props.className==='navActive' ? 'wrapperActive' : 'wrapperExit'}`} style={{...props.style}}>
        <div data-index = '1' className={`${props.className}`}></div>
        <div data-index = '2' className={`${props.className}`}></div>
        <div data-index = '3' className={`${props.className}`}></div>
        <div data-index = '4' className={`${props.className}`}></div>
        <div data-index = '5' className={`${props.className}`}></div>
        <div className={`${classes.content} ${props.className==='navActive' ? 'contentActive' : 'contentExit'}`}>{props.content}</div>
    </div>
  )
}

export default Overlay