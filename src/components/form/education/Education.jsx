import React, { useState } from 'react'
import classes from './education.module.css'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import LabelInput from '../form_components/LabelInput'
import SelectorLabel from '../form_components/SelectorLabel'
import LabelDate from '../form_components/LabelDate'
import Grid from '../../cv_components/grid/Grid'

function Education(props) {
    const [ currentEducation, setCurrentEducation ] = useState(false);
    function change(){
        setCurrentEducation((prev)=>!prev)
    }
    const courseArr = ['High School education', 'Higher secondary school educaton', 'BTech', 'BE', 'BSc', 'Bsc(Hons)', 'BArch', 'BCom', 'BCA', 'BBA', 'MTech', 'ME', 'MSc', 'MCom', 'MCA', 'MBA' ]
  return (
    <div className='formSectionContainer'>
        <div className='heading'>Education Section</div>
        <FlexBox style={{alignItems: 'start'}}>
            <LabelInput id='Name of the Institute' placeholder='Institute' labelName='Name of the Institute' />
            <FlexBox direction = 'row' width = '100'>
                <SelectorLabel id='Course' labelName='Course/Degree' options={courseArr}/>
                <LabelInput id='Stream' placeholder='Stream' labelName='Stream'/>
            </FlexBox>
            <FlexBox direction='row' width = '100'>
                <SelectorLabel id='grade' labelName='Choose category' options={['Percentage', 'GPA']} />
                <LabelInput id='grade' placeholder='Grade/Percentage' labelName='Grade/Percentage' type='number'/>
            </FlexBox>
            <FlexBox direction='row' width = '100'>
                <LabelDate id='startDate' labelName='Start date'/>
                <LabelDate id='endDate' labelName='End date' disabled={currentEducation}/>
            </FlexBox>
            <FlexBox direction='row' style={{'marginLeft': '1rem'}}>
                <input type='checkbox' id='current' onChange={change}/>
                <label htmlFor="current" style={{'marginLeft': '1rem'}}>Currently studying</label>
            </FlexBox>
        </FlexBox>
        <FlexBox direction='row'>
            <button>Back</button>
            <button>Proceed</button>
        </FlexBox>
    </div>

  )
}

export default Education