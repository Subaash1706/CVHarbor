import React, { useState } from 'react'
import classes from './personal.module.css'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import LabelInput from '../form_components/LabelInput'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../../store/store'

function PersonalInfo() {
    const dispatch = useDispatch()
    const [ personalInfo, setPersonalInfo ] = useState({name: '', secondName: '', email: '', phone: '', linkedIn: ''})
    const [ validity, setValidity ] = useState(false)
    function valueChangeHandler(e){
        setPersonalInfo(prev=>{return{...prev, [e.target.name]: e.target.value}})
        setValidity(Object.values(personalInfo).every(Boolean))
    }
    function submitHandler(e){
        e.preventDefault()
        dispatch(bioActions.updateBioData({ personal: personalInfo }))
    }
  return (
    <div className='formSectionContainer'>
        <div className='heading'>Personal Info</div>
            <FlexBox style={{alignItems: 'start'}}>
                <FlexBox direction='row'>
                    <LabelInput id='firstName' labelName='First Name' placeholder='First name' name='name' onChange={ valueChangeHandler } value={ personalInfo.name }/>
                    <LabelInput id='lastName' labelName='Last Name' placeholder='Last name' name='secondName' onChange={ valueChangeHandler } value={ personalInfo.secondName }/>
                </FlexBox>
                <FlexBox direction='row'>
                    <LabelInput id='email' labelName='Email' placeholder='Email' name='email' onChange={ valueChangeHandler } value={ personalInfo.email }/>
                    <LabelInput id='phone' labelName='Phone' placeholder='Phone' name='phone' onChange={ valueChangeHandler } value={ personalInfo.phone }/>
                </FlexBox>
                <FlexBox direction='row'>
                    <LabelInput id='linkedIn' labelName='LinkedIn link' placeholder='LinkedIn' name='linkedIn' onChange={ valueChangeHandler } value={ personalInfo.linkedIn }/>
                </FlexBox>
            </FlexBox>
        <center>
            <button className={classes.proceed} onClick={submitHandler} disabled={!validity}>Save</button>
        </center>
        <center className='nextContainer'>
            <button className='nextSection' >Next Section</button>
        </center>
    </div>
  )
}

export default PersonalInfo