import React, { useState } from 'react'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import CheckBoxLabel from '../form_components/CheckBoxLabel'
import LabelInput from '../form_components/LabelInput'
import LabelDate from '../form_components/LabelDate'
import { useDispatch } from 'react-redux'
import { bioActions } from '../../store/store'

function SelectiveAdditional(props) {
    const dispatch = useDispatch()
    const initialState = 
        props.checkedArray.map((item)=>{
            return {[item]: [{heading: '', date: '', description: ''}]}
            
        })
    const [ value, setValue ] = useState( initialState )
    function valueChangeHandler(e, item, itemIndex) {
        const { id, value: inputValue } = e.target;
        setValue(prev=>{
            const upd = [...prev];
            upd[itemIndex][item][0][id]= inputValue
            return upd
        })
    }
    function submitHandler(){
        props.onAdditionalValue(value)
    }
  return ( <>
    { props.checkedArray.map((item,ind)=>{
        return(
            <FlexBox key={`${ind}_${item}`} style={{'alignItems': 'start', border: '1px solid gray', marginBottom: '2rem', padding: '2rem', 'borderRadius': '10px'}}>
            <div className='subHeading' style={{width: '100%', borderBottom: '1px solid gray', padding: '8px', 'marginBottom': '5px'}}>{item}</div>
            <FlexBox direction='row' width='100'>
                <LabelInput id='heading' labelName='Add a heading' name='Heading' onChange={(e)=>valueChangeHandler(e, item, ind)} value={value[ind][item][0]['heading']}/>
                <LabelDate id='date' labelName='Month and Year of completion' name="Date" onChange={(e)=>valueChangeHandler(e, item, ind)} value={value[ind][item][0]['date']}/>
            </FlexBox >
            <FlexBox width='100'>
                <textarea style={{width: '100%', height: '8rem', resize: 'none', padding: '8px', fontSize: '1.25rem'}}  placeholder='Enter a brief description. Use new line to create points' onChange={(e)=>valueChangeHandler(e, item, ind)} id='description' value={value[ind][item][0]['description']}></textarea>
            </FlexBox>
            <center style={{ width: '100%'}}>
                <button onClick={submitHandler}>Save</button>
            </center>
            <a style={{'fontSize': '1.25rem', 'cursor': 'pointer'}}>+Add more</a>
        </FlexBox>
        )
    }) 
 }
    </>)
}

export default SelectiveAdditional