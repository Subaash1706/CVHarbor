import React from 'react'
import FlexBox from '../../cv_components/flexbox/FlexBox'

function LabelDate(props) {
  return (
    <FlexBox style={{alignItems: 'start', 'flex': '1'}}>
        <label htmlFor={props.id}>{props.labelName}</label>
        <input type='month' id={props.id} placeholder={props.placeholder} disabled={props.disabled}/>
    </FlexBox>
  )
}

export default LabelDate