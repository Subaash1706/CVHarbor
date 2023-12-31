import React, { useEffect, useState } from 'react'
import classes from './carousal.module.css'
import arrowSvg from '../../assets/svg/arrow_right_alt_FILL0_wght400_GRAD0_opsz24.svg'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../store/store'
import Hr from '../cv_components/Hr'

const SelectorCarousal = React.memo((props) => {
  const [ spinner, setSpinner ] = useState(true)
    const { imageArray } = props
    const currentTemplate = useSelector(state=>state.bioData.selectedTemplate.category)
    const dispatch = useDispatch()
    function templateChooseHandler(e){  
      dispatch(bioActions.setCurrentTemplate({chosenTemplate: e.target.id}))
    }
   function templateSelectHandler(e){
    dispatch(bioActions.setCurrentTemplate({templateNumber: e.target.id}))
    // props.onTemplateSelect(true)
   }
   function renderSpinnerAndTemplate(){
      setTimeout(()=>{
        setSpinner(false)
      }, 1000)
   }
    return(
      <div className={classes.templateSelectorContainer}>
        <h1>Choose the desired template for your Resume</h1>
        <div className={classes.templateLinkWrapper}>
          <ul className={classes.templateLinkContainer}>
              <li onClick={templateChooseHandler} id='har'className={currentTemplate==='har' ? classes.active : ''}><a id='har' >Harvard templates</a></li>
              <li onClick={templateChooseHandler} id='mit'className={currentTemplate==='mit' ? classes.active : ''}><a id='mit' >Mit templates</a></li>
              <li onClick={templateChooseHandler} id='mod'className={currentTemplate==='mod' ? classes.active : ''}><a id='mod' >Modern templates</a></li>
            </ul>
        </div>
        {spinner && <div className={classes.loader}></div>}
        <div className={classes.templatePreviewWrapper}> 
              {
                renderSpinnerAndTemplate()
              }
              { !spinner && 
                imageArray.map((item, ind)=>{
                  return (
                    <div key={ind} className={classes.templatePreview}>
                        <img src={item} onClick={templateSelectHandler} id={ind+1}/>
                        Template {ind+1}
                    </div>
                  )
                })
              }
        </div>
      </div>
    )
})

export default SelectorCarousal