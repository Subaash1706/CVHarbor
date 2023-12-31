import React from 'react'
import classes from './nextcontainer.module.css'
import arrowSvg from '../../assets/svg/arrow_right_alt_FILL0_wght400_GRAD0_opsz24.svg'
import PageCounter from '../PageCounter'
import { useSelector } from 'react-redux'
import { bioActions } from '../store/store'
import { current } from '@reduxjs/toolkit'

function NextContainer( props ) {
  const allPagesArray = useSelector(state=>state.bioData.allSections)
  const currentPage = useSelector(state=>state.bioData.currentForm)
  const currentPageIndex = allPagesArray.findIndex(page=>page===currentPage)
  const data = useSelector(state=>state.bioData.data)
  const dataKeys = Object.keys(data)
  const currentKey = dataKeys[currentPageIndex]
  const currentFormFromStore = data[currentKey] 
  function nextClickHandler(e){
    props.onClick(e)
    if(!currentFormFromStore.length > 0) props.onTriggerModal(true)
    else return;
  }
  return (
    <center className={ `${classes.nextContainer} nextContainer` }>
      <PageCounter />
        { props.back && 
        <button onClick={(e)=>props.onClick(e)} id='previous' className={classes.previous} disabled={props.backDisabled}>
            <img src={arrowSvg}/>
            Back
        </button> }
        { props.next && 
            <button onClick={(e)=>nextClickHandler(e)} id='next' disabled={props.nextDisabled} className={classes.next}>
                Next
               <img src={arrowSvg}/>
            </button>
         }
    </center>
  )
}

export default NextContainer