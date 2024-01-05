import React, { useEffect, useState } from 'react'
import Backdrop from './Backdrop'
import classes from './modal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../store/store'

function Modal(props) {
    const [ checkStatus, setCheckStatus ] = useState(false)
    const dispatch = useDispatch()
    const currentSection = useSelector(state=>state.bioData.currentForm)
    const [ proceed, setProceed ] = useState(false)
    function handleSkippedSection(e){
        if(e.target.id==='proceed')  dispatch(bioActions.updateCurrentPage({direction: '1'}))
        setProceed(true)
    }
    useEffect(()=>{
        if(checkStatus) dispatch(bioActions.updateSkippedSections(currentSection))
    }, [ checkStatus ])
    useEffect(()=>{
        if(proceed) {
            props.onProceed(proceed); 
        }
    }, [ proceed ])
    const skipped = useSelector(state=>state.bioData.skippedSections)
    // console.log(skipped)
  return (
    <Backdrop>
        <div className={classes.modalWrapper}>
            <div className={classes.modalContainer}>
                <div className={classes.contentWrapper}>
                    <div className={classes.illustrationContainer}>
                        {/* <img src={skipGif} alt="" /> */}
                    </div>
                    <div className={classes.content}>
                        <div className={classes.modalHeading}>{props.heading}Skip section</div>
                        <div className={classes.modalBody}>{props.content}
                            You are about to skip this section. Do you want to proceed ?
                            <br />
                        </div>
                    </div>
                </div>
                <div className={classes.modalButtonContainer}>
                        <div className={classes.skipCheckBox}>
                            <input type="checkbox" id='skipSection' name='skipSection' onChange={(e)=>{setCheckStatus(e.target.checked)}} checked={checkStatus}/>
                            <label htmlFor="skipSection" id='skipSectionLabel' className={classes.skipSectionLabel}>Exclude current section from Resume</label>
                        </div>
                        <div>
                            <button onClick={handleSkippedSection} id='cancel' className={classes.cancel}>Cancel</button>
                            <button onClick={handleSkippedSection} id='proceed' className={classes.proceed} disabled={!checkStatus}>Proceed</button>
                        </div>
                </div>
            </div>
        </div>
    </Backdrop>
  )
}

export default Modal