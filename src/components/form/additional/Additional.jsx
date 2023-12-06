import React, { useEffect, useState } from 'react'
import classes from './additional.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../../store/store'
import SelectorLabel from '../form_components/SelectorLabel'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import CheckBoxLabel from '../form_components/CheckBoxLabel'
import SelectiveAdditional from './SelectiveAdditional'
import { miscArray } from '../Form'

function Additional(props) {
    const dispatch = useDispatch()
    const bio = useSelector(state=>state.bioData.data)
    const currentPage = useSelector(state=>state.bioData.currentForm)
    const { personal, education, skills, xp, certifications, ...rest } = bio
    const [ isChecked, setisChecked ] = useState({
        Certifications: false, 
        Projects: false, 
        Recognitions: false, 
        Publications: false,
        Accomplishments: false,
        Languages: false,
        Volunteering: false
    });
    const [ checkedArr, setCheckedArr ] = useState([])
    const [ proceedState, setProceedState ] = useState(false)
    const [ nextAdditionalValue, setNextAdditionalValue ] = useState( false )
    function checkChangeHandler(e){
        setisChecked(prev=>{return{...prev, [e.target.id]: e.target.checked}})
    }
    useEffect(()=>{
        setCheckedArr([...Object.keys(isChecked).filter((check)=>isChecked[check])])  
    }, [ isChecked ])
    useEffect(()=>{
        if(miscArray.includes( currentPage )){
            setProceedState(true) 
        }
    }, [ currentPage ])
    // useEffect(()=>{
    //     console.log(rest)
    //     if(Object.values(rest).some(array=>array.length > 0)) setProceedState(true)
    // }, [])
    function preProceedState(){
        dispatch(bioActions.updatePagesArray(checkedArr))
        dispatch(bioActions.updateCurrentPage({direction: '1'}))
    }
    // console.log(proceedState)
    function submitHandler(){
        dispatch(bioActions.updateCurrentPage({direction: '1'}))
    }
    console.log(proceedState)
  return (
    <div className='formSectionContainer'>
        <div className="heading">Additional{proceedState && `: ${currentPage}`}</div>
        { (!proceedState ) ? <FlexBox style={{ 'alignItems': 'start', marginTop: '1rem'}}>
                <CheckBoxLabel id='Certifications' labelName='Certifications' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Certifications}/>
                <CheckBoxLabel id='Projects' labelName='Projects' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Projects}/>
                <CheckBoxLabel id='Recognitions' labelName='Recognitions' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Recognitions}/>
                <CheckBoxLabel id='Publications' labelName='Publications' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Publications}/>
                <CheckBoxLabel id='Accomplishments' labelName='Accomplishments' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Accomplishments}/>
                <CheckBoxLabel id='Languages' labelName='Languages' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Languages}/>
                <CheckBoxLabel id='Volunteering' labelName='Volunteering' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Volunteering}/>
            </FlexBox> : <SelectiveAdditional onAdditionalValue={nextAdditionalValue} onRetreat={()=>setNextAdditionalValue(false)}/> }
        <center>
            <button onClick={preProceedState} style={{'display': proceedState ? 'none': 'block'}} disabled={!checkedArr.length> 0}>Proceed</button>
        </center>
        <center className='nextContainer'>
            <button onClick={()=>dispatch(bioActions.updateCurrentPage({direction: '-1'}))}>Back</button>
            <button style={{'display': !proceedState ? 'none': ''}} onClick={()=>{dispatch(bioActions.updateCurrentPage({direction: '1'})); setNextAdditionalValue(true)}}>Next Section</button>
        </center>
    </div>
  )
}

export default Additional