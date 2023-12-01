import React, { useEffect, useState } from 'react'
import classes from './additional.module.css'
import { useDispatch } from 'react-redux'
import { bioActions } from '../../store/store'
import SelectorLabel from '../form_components/SelectorLabel'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import CheckBoxLabel from '../form_components/CheckBoxLabel'
import SelectiveAdditional from './SelectiveAdditional'

function Additional(props) {
    const dispatch = useDispatch()
    const [ isChecked, setisChecked ] = useState({
        Certifications: false, 
        Projects: false, 
        Recognition: false, 
        Publications: false,
        Accomplishments: false,
        Languages: false,
        Volunteering: false
    });
    const [ checkedArr, setCheckedArr ] = useState([])
    const [ proceedState, setProceedState ] = useState(false)
    const [ additionalValue, setAdditionalValue ] = useState([])
    function checkChangeHandler(e){
        setisChecked(prev=>{return{...prev, [e.target.id]: e.target.checked}})
    }
    useEffect(()=>{
        setCheckedArr([...Object.keys(isChecked).filter((check)=>isChecked[check])])  
    }, [ isChecked ])
    function additionalValueFn(data){
        setAdditionalValue(data)
    }
    function submitHandler(){
        console.log(additionalValue)
    }
  return (
    <div className='formSectionContainer'>
        <div className="heading">Additional</div>
        { !proceedState && <FlexBox style={{ 'alignItems': 'start', marginTop: '1rem'}}>
            <CheckBoxLabel id='Certifications' labelName='Certifications' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Certifications}/>
            <CheckBoxLabel id='Projects' labelName='Projects' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Projects}/>
            <CheckBoxLabel id='Recognition' labelName='Recognition' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Recognition}/>
            <CheckBoxLabel id='Publications' labelName='Publications' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Publications}/>
            <CheckBoxLabel id='Accomplishments' labelName='Accomplishments' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Accomplishments}/>
            <CheckBoxLabel id='Languages' labelName='Languages' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Languages}/>
            <CheckBoxLabel id='Volunteering' labelName='Volunteering' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Volunteering}/>
        </FlexBox> }
        {
            proceedState && <SelectiveAdditional checkedArray = { checkedArr } onAdditionalValue={additionalValueFn}/>
        }

        <center>
            <button onClick={()=>{setProceedState(true);proceedState && submitHandler()}} disabled={!checkedArr.length> 0}>Proceed</button>
        </center>

        <center className='nextContainer'>
            <button onClick={()=>dispatch(bioActions.updateCurrentPage({direction: '-1'}))}>Back</button>
        </center>
    </div>
  )
}

export default Additional