import React from 'react'
import FlexBox from '../../cv_components/flexbox/FlexBox'

function SelectorLabel({ options, id, labelName, onChange, name, defaultValue }) {
  return (
    <FlexBox style={{alignItems: 'start', 'flex': '1'}} width='100'>
        <label htmlFor={id} style={{display: 'none'}}>{labelName}</label>
        <select id={id} onChange={onChange} name={name} defaultValue={options[defaultValue]}>
            {options.map((item)=><option key={item}>{item}</option>)}
        </select>
    </FlexBox>
  )
}

export default SelectorLabel