import React, { useState, useEffect } from 'react';
import classes from './skills.module.css';
import FlexBox from '../../cv_components/flexbox/FlexBox';
import Grid from '../../cv_components/grid/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { bioActions } from '../../store/store';
import LabelInput from '../form_components/LabelInput';
import ExistingData from '../existing_data/ExistingData';

function Skills(props) {
  const { log: l } = console
  const dispatch = useDispatch();
  const skillsFromStore = useSelector(state=>state.bioData.data.skills)
  const [ existing, setExisting ] = useState(false)
  const [ skillCount, setSkillCount ] = useState( skillsFromStore.flat().length > 0 ? 1 : 3)
  const [value, setValue] = useState([]);
  const [ editableValue, setEditableValue ] = useState('')

  function valueChangeHandler(e){
    const targetIndex = e.target.id.split(' ')[1];
    setValue(prev=>{
      const newArr = [...prev];
      newArr[targetIndex] = e.target.value
      return newArr
    })
  }
  function addMoreHandler(){
      setSkillCount(prev=> prev += 1)  
  }
  function submitHandler(){
      if(!!editableValue){
          const copy = [...skillsFromStore.flat()]
          const targetIndex = copy.findIndex(item=>item === editableValue)
          copy.splice( targetIndex, 1, value)
          setSkillCount(0)
          dispatch(bioActions.replaceBioData({'skills': [...copy]}))
      }
      else{
        dispatch(bioActions.updateBioData({skills: [...value]}))
        setExisting(true)
        setSkillCount( 0 )
        setValue( [] )
      }
  }
  function valueModifyHandler(e, mappedItem){
    const copy = [...skillsFromStore.flat()]
    const targetIndex = copy.findIndex(item=>item === mappedItem)
    if( targetIndex !== -1){
      if( e.target.id==='edit' ){
        setSkillCount( 1 )
        setEditableValue(mappedItem)
        setValue( [mappedItem] )
        l('copy', copy)
      }
      else if( e.target.id==='delete' ){
        copy.splice( targetIndex, 1 )
      }

    dispatch(bioActions.replaceBioData({ 'skills': copy }))
    }
  }
  return (
    <div>
      <div className='formSectionContainer'>
        <FlexBox direction='row' style={{justifyContent: 'space-between'}}>
          <div className='heading'>Skills</div>
          <center>
          </center>
        </FlexBox>
        { (existing || skillsFromStore.flat().length > 0) && <ExistingData dataArray={ skillsFromStore.flat() } onClick={ valueModifyHandler }/>}
        <Grid balanced = {true} cols={2} style={{gap: '8px'}}>
        { 
            Array.from({ length: skillCount }, (_, ind)=>{
              return <LabelInput 
                key={ `${ind}_${ind}` } 
                id = { `Skill ${ ind }` }
                placeholder='Enter a skill'
                labelName={ `Skill ${+ind+1}` }
                name={ `Skill ${ind+1}` }
                onChange={ valueChangeHandler } 
                value = { value[ind] }
              />})
        }
        </Grid>
        <FlexBox width='100'>
            <button onClick={addMoreHandler} className='addmoreButton'>Add more</button>
            <button onClick={submitHandler} disabled={!value.length > 0} className='proceedButton'>Save</button>
        </FlexBox>
      </div>
    </div>

  );
}

export default Skills;
