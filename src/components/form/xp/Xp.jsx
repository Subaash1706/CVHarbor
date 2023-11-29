import React, { useState } from 'react'
import classes from './xp.module.css'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import LabelInput from '../form_components/LabelInput'
import LabelDate from '../form_components/LabelDate'
import SelectorLabel from '../form_components/SelectorLabel'

function Xp(props) {
    const [ currentWork, setCurrentWork ] = useState(false)
  return (
    <div className='formSectionContainer'>
        <div className='heading'>
            Experience section
        </div>
        <FlexBox style={{alignItems: 'start'}}>
            <FlexBox direction = 'row' width = '100'>
                <LabelInput id='Name of the Company' placeholder='Company' labelName='Name of the Company' />
            </FlexBox>
            <FlexBox direction = 'row' width = '100'>
                <LabelInput id='Job role' placeholder='Job role' labelName='Job role'/>
            </FlexBox>
            <FlexBox direction='row' width = '100'>
                <LabelDate id='startDate' labelName='Start date'/>
                <LabelDate id='endDate' labelName='End date' disabled={currentWork}/>
            </FlexBox>
            <FlexBox direction='row' style={{'marginLeft': '1rem'}}>
                <input type='checkbox' id='currentWork' onChange={()=>setCurrentWork(prev=>!prev)}/>
                <label htmlFor="currentWork" style={{'marginLeft': '1rem'}}>Currently working</label>
            </FlexBox>
        </FlexBox>
        <FlexBox direction='row'>
            <button>Back</button>
            <button>Proceed</button>
        </FlexBox>
    </div>
  )
}

export default Xp