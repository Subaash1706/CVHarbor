import React, { useState, useEffect } from 'react';
import classes from './skills.module.css';
import FlexBox from '../../cv_components/flexbox/FlexBox';
import SkillsInput from './SkillsInput';
import Grid from '../../cv_components/grid/Grid';

function Skills(props) {
  const [count, setCount] = useState(1);
  const [input, setInput] = useState([]);

  useEffect(() => {
    setInput(Array.from({ length: count }, (_, ind) => (
      <SkillsInput key={ind} id={ind} onDelete={() => deleteHandler(ind)} />
    )));
  }, [count]);

  function deleteHandler(targetIndex) {
    count > 1 && setInput(prevInput => prevInput.filter((_, index) => index !== targetIndex));
  }

  return (
    <div className='formSectionContainer'>
      <div className='heading'>Skills section</div>
      <Grid balanced='true' cols='2' style={{ 'gap': '18px' }}>
        {input}
      </Grid>
      <a className={classes.addMore} onClick={() => setCount(prev => prev + 1)}>
        Add more
      </a>
      <FlexBox direction='row'>
                <button>Back</button>
                <button>Proceed</button>
      </FlexBox>
    </div>
  );
}

export default Skills;
