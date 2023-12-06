import React, { useState, useEffect } from 'react';
import classes from './skills.module.css';
import FlexBox from '../../cv_components/flexbox/FlexBox';
import SkillsInput from './SkillsInput';
import Grid from '../../cv_components/grid/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { bioActions } from '../../store/store';
import LabelInput from '../form_components/LabelInput';

function Skills(props) {
  const dispatch = useDispatch();
  const skillsFromStore = useSelector(state=>state.bioData.data.skills)
  const [value, setValue] = useState('');
  const [ validity, setValidity ] = useState(false);
  function valueChangeHandler(e){
    setValue(e.target.value)
    value && setValidity(true)
  }
  function submitHandler(){
    const skillsArr = value.split('\n')
    dispatch(bioActions.updateBioData({skills: skillsArr}))
    setValue('')
  }
  return (
    <div>
      <div className='formSectionContainer'>
        <div className='heading'>Skills section</div>
      <FlexBox width='100' style={{'alignItems': 'start'}} direction='row'>
        <div>
            <label htmlFor="skills" style={{'textAlign': 'left', margin: '8px 0px', 'fontSize': '1.05rem'}}>skills / Achievements (optional)</label>
            <textarea name="skills" id="skills" placeholder='Hit Enter for new bullet point' className='textArea' onChange={valueChangeHandler} value={value}></textarea>
        </div>
        <div className={classes.previewContainer}>
          <div>Preview</div>
          <ul className={classes.previewWindow}>
            { value && value.split('\n').map((item, ind)=><li key={`${ind}_${item}`}>{item}</li>)}
          </ul>
        </div>
      </FlexBox>
      <FlexBox direction='row'>
          <button onClick={submitHandler} disabled={!validity}>Save</button>
      </FlexBox>
      <center className='nextContainer'>
        <button onClick={()=>dispatch(bioActions.updateCurrentPage({direction: '-1'}))}>Back</button>
        <button onClick={()=>dispatch(bioActions.updateCurrentPage({direction: '1'}))}>Next section</button>
      </center>
      </div>
    </div>

  );
}

export default Skills;
