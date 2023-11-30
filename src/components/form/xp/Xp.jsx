import React, { useState } from 'react'
import classes from './xp.module.css'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import LabelInput from '../form_components/LabelInput'
import LabelDate from '../form_components/LabelDate'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../../store/store'
import ExistingData from '../existing_data/ExistingData'


function Xp(props) {
    const xpFromStore = useSelector(state=>state.bioData.data.xp)
    const dispatch = useDispatch()
    const [ currentWork, setCurrentWork ] = useState(false)
    // const [ review, setReview ] = useState(false)
    const [ addMore, setAddMore ] = useState(true);
    const initialValue = {name: '', role: '', start_date: '', end_date: ''}
    const [ value, setValue ] = useState(initialValue)
    const [ validity, setValidity ] = useState(false)
    
    function valueChangeHandler(e){
        console.log('changed', e.target.value)
        setValue(prev=>{return{...prev, [e.target.name]: e.target.value}})
        setValidity(Object.values(value).every(Boolean))
        console.log(value)
    }
    function change(e){
        setCurrentWork((prev)=>!prev)
        currentWork && setValue(prev=>{return{...prev, [e.target.name]: 'Present'}})
    }
    function submitHandler(e){
        e.preventDefault();
        dispatch(bioActions.updateBioData({ xp: value }))
        console.log(value)
        // setReview(true)
        setCurrentWork(false)
        setAddMore(false)
        setValue(initialValue)
        setValidity(false)
    }
    function addItemHandler(){
        setAddMore(true)
    }

  return (
    <div className='formSectionContainer'>
        <div className='heading'>
            Experience section
        </div>
        {xpFromStore.length > 0 && <ExistingData onAddMore = {addItemHandler} target='xp'/>}
        {addMore && <FlexBox style={{alignItems: 'start'}}>
            <FlexBox direction = 'row' width = '100'>
                <LabelInput id='Name of the Company' placeholder='Company' labelName='Name of the Company'  onChange={valueChangeHandler} name='name'/>
            </FlexBox>
            <FlexBox direction = 'row' width = '100'>
                <LabelInput id='Job role' placeholder='Job role' labelName='Job role' onChange={valueChangeHandler} name='role'/>
            </FlexBox>
            <FlexBox direction='row' width = '100'>
                <LabelDate id='startDate' labelName='Start date' onChange={valueChangeHandler} name='start_date'/>
                <LabelDate id='endDate' labelName='End date' disabled={currentWork} onChange={valueChangeHandler} name='end_date'/>
            </FlexBox>
            <FlexBox direction='row' style={{'marginLeft': '1rem'}}>
                <input type='checkbox' id='currentWork' onChange={change} name='end_date'/>
                <label htmlFor="currentWork" style={{'marginLeft': '1rem'}}>Currently working</label>
            </FlexBox>
        </FlexBox>}
        <FlexBox direction='row'>
            <button onClick={submitHandler} disabled={!validity}>Save</button>
        </FlexBox>
        <center className='nextContainer'>
            <button onClick={()=>dispatch(bioActions.updateCurrentPage({direction: '-1'}))}>Back</button>
            <button onClick={()=>dispatch(bioActions.updateCurrentPage({direction: '1'}))}>Next section</button>
        </center>
    </div>
  )
}

export default Xp