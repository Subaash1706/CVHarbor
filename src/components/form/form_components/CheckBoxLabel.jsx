import React from 'react'
import FlexBox from '../../cv_components/flexbox/FlexBox'


{/* <input type='checkbox' id='current' onChange={()=>setCurrentEducation(prev=>!prev)} name='end_date'/>
<label htmlFor="current" style={{'marginLeft': '1rem'}}>Currently studying</label> */}
function CheckBoxLabel(props) {
  return (
    <FlexBox direction='row'>
        <input type='checkbox' id={props.id} onChange={props.onChange} name={props.labelName} checked={props.checked}/>
        <label htmlFor={props.id} style={{...props.style, marginLeft: '1rem'}}>{props.labelName}</label>
    </FlexBox>
  )
}

export default CheckBoxLabel