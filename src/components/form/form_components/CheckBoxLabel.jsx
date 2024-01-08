import React from 'react'
import FlexBox from '../../cv_components/flexbox/FlexBox'

function CheckBoxLabel(props) {
  return (
    <FlexBox direction='row'>
        <input type='checkbox' id={props.id} onChange={props.onChange} name={props.labelName} checked={props.checked} style={{marginRight: '5px'}}/>
        <label htmlFor={props.id} style={{...props.style, marginLeft: '1rem'}} className='label'>{props.labelName}</label>
    </FlexBox>
  )
}

export default CheckBoxLabel