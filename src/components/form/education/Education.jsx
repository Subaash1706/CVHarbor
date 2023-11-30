import React, { useEffect, useState } from 'react'
import classes from './education.module.css'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import LabelInput from '../form_components/LabelInput'
import SelectorLabel from '../form_components/SelectorLabel'
import LabelDate from '../form_components/LabelDate'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../../store/store'
import ExistingData from '../existing_data/ExistingData'

function Education(props) {
    const dispatch = useDispatch();
    const eduDataFromStorer = useSelector(state=>state.bioData.data.education)
    const [ currentEducation, setCurrentEducation ] = useState(false);
    const initialState = { name: '', course: '', stream: '', start_date: '', end_date: '', grade: ''}
    const [ addMore, setAddMore ] = useState(true);
    const [ value, setValue ] = useState(initialState)
    const [ validity, setValidity ] = useState(false)

    function valueChangeHandler(e){
        setValue(prev=>{return{...prev, [e.target.name]: e.target.value}})
    }
    useEffect(()=>{
        setValidity(Object.values(value).every(Boolean))
    }, [ value ])
    function valueSelectionHandler(e){
        const selected = e.target.options[e.target.selectedIndex].value
        setValue(prev=>{return{...prev, [e.target.name]: selected}})
    }
    useEffect(()=>{
        currentEducation && setValue(prev=>{return{...prev, ['end_date']: 'Present'}})
    }, [ currentEducation ])

    function submitHandler(e){
        e.preventDefault();
        dispatch(bioActions.updateBioData({ education: value }))
        // setReview(true)
        setAddMore(false)
        setCurrentEducation(false)
        setValue(initialState)
        setValidity(false)
    }
    function addItemHandler(){
        setAddMore(true)
    }
    const courseArr = ['High School education', 'Higher secondary school educaton', 'BTech', 'BE', 'BSc', 'Bsc(Hons)', 'BArch', 'BCom', 'BCA', 'BBA', 'MTech', 'ME', 'MSc', 'MCom', 'MCA', 'MBA' ]
  return (
    <div className='formSectionContainer'>
        {eduDataFromStorer.length > 0 && <ExistingData onAddMore = {addItemHandler} target='education'/>}
        {addMore && <><div className='heading'>Education Section</div>
        <FlexBox style={{alignItems: 'start'}}>
            <LabelInput id='Name of the Institute' placeholder='Institute' labelName='Name of the Institute'  name='name' onChange={valueChangeHandler}/>
            <FlexBox direction = 'row' width = '100'>
                <SelectorLabel id='Course' labelName='Course/Degree' options={courseArr} name='course' onChange={valueSelectionHandler}/>
                <LabelInput id='Stream' placeholder='Stream' labelName='Stream' name='stream' onChange={valueChangeHandler}/>
            </FlexBox>
            <FlexBox direction='row' width = '100'>
                <SelectorLabel id='grade' labelName='Choose category' options={['Choose Percentage/CGPA', 'Percentage', 'GPA']} name='selector' onChange={valueSelectionHandler}/>
                <LabelInput id='grade' placeholder='Grade/Percentage' labelName='Grade/Percentage' type='number' name='grade' onChange={valueChangeHandler}/>
            </FlexBox>
            <FlexBox direction='row' width = '100'>
                <LabelDate id='startDate' labelName='Start date' name='start_date' onChange={valueChangeHandler}/>
                <LabelDate id='endDate' labelName='End date' disabled={currentEducation} name='end_date' onChange={valueChangeHandler}/>
            </FlexBox>
            <FlexBox direction='row' style={{'marginLeft': '1rem'}}>
                <input type='checkbox' id='current' onChange={()=>setCurrentEducation(prev=>!prev)} name='end_date'/>
                <label htmlFor="current" style={{'marginLeft': '1rem'}}>Currently studying</label>
            </FlexBox>
        </FlexBox></> }
        <FlexBox direction='row'>
            <button onClick={submitHandler} disabled={!validity}>Save</button>
        </FlexBox>
        <center className='nextContainer'>
            <button onClick={()=>dispatch(bioActions.updateCurrentPage({direction: '-1'}))}>Back</button>
            <button onClick={()=>dispatch(bioActions.updateCurrentPage({direction: '1'}))}>Next Section</button>
        </center>
    </div>

  )
}

export default Education