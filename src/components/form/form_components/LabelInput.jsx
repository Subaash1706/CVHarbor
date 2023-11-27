import React from 'react'
import FlexBox from '../../cv_components/flexbox/FlexBox'

function LabelInput(props) {
  return (
    <FlexBox style={{alignItems: 'start'}}>
        <label htmlFor={props.id}>{props.labelName}</label>
        <input type={props.type} id={props.id} placeholder={props.placeholder}/>
    </FlexBox>
  )
}

export default LabelInput