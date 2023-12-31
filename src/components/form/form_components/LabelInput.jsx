import React from 'react'
import FlexBox from '../../cv_components/flexbox/FlexBox'

function LabelInput(props) {
  return (
    <FlexBox style={{alignItems: 'start', ...props.style, 'flex': '1'}} width='100'>
        <label htmlFor={props.id} style={{display: 'none'}}>{props.labelName}</label >
        <input onBlur={props.onBlur} type={props.type || 'text'} id={props.id} placeholder={props.placeholder} onChange={props.onChange} name={props.name} value={ props.value } disabled={props.disabled} />
    </FlexBox>
  )
}

export default LabelInput