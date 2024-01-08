import React, { useState } from 'react'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import LabelInput from '../form_components/LabelInput'
import LabelDate from '../form_components/LabelDate'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../../store/store'
import ExistingData from '../existing_data/ExistingData'

function SelectiveAdditional(props) {
    const { onAdditionalValue: nextAdditional } = props
    const currentPage = useSelector(state=>state.bioData.currentForm)
    const currentPageLowerCase = currentPage[0].toLowerCase() + currentPage.slice(1)
    const currentPageFromStore = useSelector(state=>state.bioData.data[currentPageLowerCase])
    const dispatch = useDispatch()
    const [ existing, setExisting ] = useState(false)
    const [ addMore, setAddMore ] = useState(true)
    const [ value, setValue ] = useState({name: ''})
    const [ editableValue, setEditableValue ] = useState({ name: '' })
    function valueChangeHandler(e) {
        const { id, value } = e.target;
        setValue(prev=>{return{...prev, [id]: value}})
        setValue(prev=>{
            const newId = `${prev.name.slice(0, 2)}_${prev.name.slice(1, prev.name.length-1)}_${prev.name.slice(2, prev.name.length-2)}`; 
            return { ...prev, id: newId};
        })
    }
    function saveHandler(){
        props.onRetreat(true)
        if(!Object.values(editableValue).every(Boolean)) {dispatch(bioActions.updateBioData({ [currentPageLowerCase]: value }))}
        else{
            const existing = currentPageFromStore.findIndex(item=>item.id === editableValue.id)
            const dupe = [...currentPageFromStore]
            dupe.splice(existing, 1, value)
            dispatch(bioActions.replaceBioData({[currentPageLowerCase]: dupe}))
            setEditableValue({name: ''})
        }
        if(Object.values(value).some(Boolean)){
            setExisting(true)
            setAddMore(false)
        }
        else setAddMore(true)
        setValue({name: ''})
    }
    function addMoreHandler(){
        setAddMore(true)
    }
    function existingItemHandler(e, id){
        const existing = currentPageFromStore.findIndex(item=>item.id === id)
        const dupe = [...currentPageFromStore]   
        if(existing !== -1){
            if(e.target.id === 'delete') dupe.splice(existing, 1)
            else if(e.target.id === 'edit'){
                const editable = dupe[existing]
                const { name, id } = editable
                setEditableValue({name, id})
                setValue(editable)
                setAddMore(true)
            }
            dispatch(bioActions.replaceBioData({ [currentPageLowerCase]: dupe }))
        }
    }
  return ( <>
            { (existing || currentPageFromStore.length > 0) && <ExistingData onAddMore={addMoreHandler} target={currentPageLowerCase} onClick={existingItemHandler}/>} 
            { (addMore || nextAdditional || !currentPageFromStore.length > 0) && <FlexBox key={`${currentPage}`} style={{'alignItems': 'start', marginBottom: '2rem', 'borderRadius': '10px'}} width='100'>
                    <LabelInput id='name' labelName='Add a heading' name='name' onChange={(e)=>valueChangeHandler(e, currentPage)} value={value.name} placeholder='Name/Title'/>
                    <LabelDate id='date' labelName='Month and Year of completion' name="date" onChange={(e)=>valueChangeHandler(e, currentPage)} value={value.date && value.date}/>
                    <textarea style={{width: '100%', height: '8rem', resize: 'none', padding: '8px', fontSize: '1.25rem'}}  placeholder='Enter a brief description. Use new line to create points' onChange={(e)=>valueChangeHandler(e, currentPage)} id='description' className='textArea' value={value.description && value.description}></textarea>
                <FlexBox width='100'>
                    <button onClick={saveHandler} className='proceedButton'>Save</button>
                </FlexBox>
            </FlexBox> }
   </> )
}

export default SelectiveAdditional