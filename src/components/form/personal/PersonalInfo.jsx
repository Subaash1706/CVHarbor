import React from 'react'
import classes from './personal.module.css'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import LabelInput from '../form_components/LabelInput'

function PersonalInfo() {
  return (
    <div className='formSectionContainer'>
        <div className='heading'>Personal Info</div>
        <FlexBox style={{alignItems: 'start'}}>
            <FlexBox direction='row'>
                <LabelInput id='firstName' labelName='First Name' placeholder='First name'/>
                <LabelInput id='lastName' labelName='Last Name' placeholder='Last name'/>
            </FlexBox>
            <FlexBox direction='row'>
                <LabelInput id='email' labelName='Email' placeholder='Email'/>
                <LabelInput id='phone' labelName='Phone' placeholder='Phone' />
            </FlexBox>
            <FlexBox direction='row'>
                <LabelInput id='linkedIn' labelName='LinkedIn link' placeholder='LinkedIn'/>
            </FlexBox>
            <button className={classes.proceed}>Proceed</button>
        </FlexBox>
    </div>
  )
}

export default PersonalInfo