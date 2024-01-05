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
    // console.log('eduData', eduDataFromStorer)
    const [ currentEducation, setCurrentEducation ] = useState(false);
    const initialState = { name: '', course: '', stream: '', start_date: '', end_date: '', grade: ''}
    const [ addMore, setAddMore ] = useState(true);
    let [ value, setValue ] = useState(initialState)
    const [ editableValue, setEditableValue ] = useState( initialState )
    // const [ existing, setExisting ] = useState(false)
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
        if( value.name && value.stream ) setValue(prev=>{
            const newId = `${prev.name.slice(0, 5)}${prev.stream.slice(0, 4)}`; 
            return { ...prev, id: newId};
        })
    }
    useEffect(()=>{
        currentEducation && setValue(prev=>{return{...prev, ['end_date']: 'Present'}})
    }, [ currentEducation ])

    function submitHandler(e){
        e.preventDefault();
        if(!Object.values(editableValue).every(Boolean)){
            dispatch(bioActions.updateBioData({ education: value }))
        }
        else{
            const existing = eduDataFromStorer.findIndex(item=>item.id === editableValue.id)
            console.log(existing, editableValue)
            const dupe = [...eduDataFromStorer]
            dupe.splice(existing, 1, value)
            dispatch(bioActions.replaceBioData({education: dupe}))
            setEditableValue(initialState)
        }
        setAddMore(false)
        setCurrentEducation(false)
        setValue(initialState)
        setValidity(false)
    }
    function addItemHandler(){
        setAddMore(true)
    }
    function existingItemHandler(e, id){
        const existing = eduDataFromStorer.findIndex(item=>item.id === id)
        const dupe = [...eduDataFromStorer]   
        if(existing !== -1){
            if(e.target.id === 'delete') dupe.splice(existing, 1)
            else if(e.target.id === 'edit'){
                const editable = dupe[existing]
                const { name, course, stream, grade, start_date, end_date } = editable
                setEditableValue({name, course, stream, grade, start_date, end_date, id})
                setValue(editable)
                setAddMore(true)
            }
            dispatch(bioActions.replaceBioData({ education: dupe }))
        }
    }
    function togglePage(e){
        if(e.target.id === 'previous') dispatch(bioActions.updateCurrentPage({direction: '-1'}))
        else if(e.target.id === 'next') dispatch(bioActions.updateCurrentPage({direction: '1'}))
    }
    const courseArr = ['Select Course', 'High School education', 'Higher secondary school educaton', 'BTech', 'BE', 'BSc', 'Bsc(Hons)', 'BArch', 'BCom', 'BCA', 'BBA', 'MTech', 'ME', 'MSc', 'MCom', 'MCA', 'MBA' ]
  return (
    <div className='formSectionContainer'>
        <FlexBox direction='row' style={{justifyContent: 'space-between'}} >
            <div className='heading'>
                Education
            </div>
        </FlexBox>
        {eduDataFromStorer.length > 0 && <ExistingData onAddMore = {addItemHandler} target='education' onClick={ existingItemHandler }/>}
        {(addMore || !eduDataFromStorer.length > 0) && <> 

        <FlexBox style={{alignItems: 'start'}}>
            <LabelInput id='Name of the Institute' placeholder='Institute' labelName='Name of the Institute'  name='name' onChange={valueChangeHandler} value={value.name}/>
                <SelectorLabel id='Course' labelName='Course/Degree' options={courseArr} name='course' onChange={valueSelectionHandler} defaultValue={value.course ? courseArr.findIndex(item=>item===value.course) : 0}/>
                <LabelInput id='Stream' placeholder='Stream' labelName='Stream' name='stream' onChange={valueChangeHandler} value={value.stream}/>
                <SelectorLabel id='grade' labelName='Choose category' options={['Choose Percentage/CGPA', 'Percentage', 'GPA']} name='selector' onChange={valueSelectionHandler} defaultValue={value.selector ? courseArr.findIndex(item=>item===value.selector) : 0}/>
                <LabelInput id='grade' placeholder='Grade/Percentage' labelName='Grade/Percentage' type='number' name='grade' onChange={valueChangeHandler} value={value.grade}/>
                <LabelDate id='startDate' labelName='Start date' name='start_date' onChange={valueChangeHandler} value={value.start_date}/>
                <LabelDate id='endDate' labelName='End date' disabled={currentEducation} name='end_date' onChange={valueChangeHandler} value={value.end_date}/>
            <FlexBox direction='row' style={{'marginLeft': '1rem'}}>
                <input type='checkbox' id='current' onChange={()=>setCurrentEducation(prev=>!prev)} name='end_date'/>
                <label htmlFor="current" style={{'marginLeft': '1rem'}}>Currently studying</label>
            </FlexBox>
                <label htmlFor="accomplishments" style={{'textAlign': 'left', margin: '8px 0px', 'fontSize': '1.05rem'}}>Accomplishments / Achievements (optional)</label>
                <textarea name="accomplishments" id="accomplishments" placeholder='Hit Enter for new bullet point' onChange={valueChangeHandler} value={value.accomplishments && value.accomplishments} className='textArea' ></textarea>
                <FlexBox width='100'>
                    <button onClick={submitHandler} disabled={!validity} className='proceedButton'>Save</button>
                </FlexBox>
        </FlexBox></> }
    </div>

  )
}

export default Education