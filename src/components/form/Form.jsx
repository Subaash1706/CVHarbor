import React from 'react'
import PersonalInfo from './personal/PersonalInfo'
import classes from './form.module.css'
import Education from './education/Education'
import Skills from './skills/Skills'
import Xp from './xp/Xp'
import { useSelector } from 'react-redux'
import Additional from './additional/Additional'

const miscArray = [ 'Certifications', 'Projects', 'Recognitions', 'Publications', 'Accomplishments', 'Languages', 'Volunteering' ]
function Form( props ) {
  const currentPage = useSelector(state=>state.bioData.currentForm)
  function submitHandler(e){
    e.preventDefault()
  }
  return (
    <>
    <form onSubmit={submitHandler} style={{...props.style}}>
        { currentPage === 'Personal Info' && <PersonalInfo /> }
        { currentPage === 'Education' && <Education /> }
        { currentPage === 'Skills' && <Skills />}
        { currentPage === 'Experience' && <Xp />}
        { currentPage === 'Additional' && <Additional />}
        { miscArray.includes( currentPage ) && <Additional /> }
    </form>
    </>
  )
}

export default Form
export { miscArray }