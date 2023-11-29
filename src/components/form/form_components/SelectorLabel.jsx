import React from 'react'
import FlexBox from '../../cv_components/flexbox/FlexBox'

function SelectorLabel({ options, id, labelName, onChange, name }) {
  return (
    <FlexBox style={{alignItems: 'start', 'flex': '1'}}>
        <label htmlFor={id}>{labelName}</label>
        <select id={id} onChange={onChange} name={name}>
            {options.map((item)=><option key={item}>{item}</option>)}
        </select>
    </FlexBox>
  )
}

export default SelectorLabel