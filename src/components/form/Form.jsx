import React from 'react'
import PersonalInfo from './personal/PersonalInfo'
import classes from './form.module.css'
import Education from './education/Education'
import Skills from './skills/Skills'
import Xp from './xp/Xp'

function Form(props) {
  const { onItemChoose:chosen } = props
  function submitHandler(e){
    e.preventDefault()
  }
  return (
    <form onSubmit={submitHandler}>
        { chosen === 'Personal info' && <PersonalInfo /> }
        { chosen === 'Education' && <Education /> }
        { chosen === 'Skills' && <Skills />}
        { chosen === 'Experience' && <Xp />}
    </form>
  )
}

export default Form