import React from 'react'
import PersonalInfo from './personal/PersonalInfo'
import classes from './form.module.css'
import Education from './education/Education'
import Skills from './skills/Skills'

function Form(props) {
  const { onItemChoose:chosen } = props
  return (
    <form>
        { chosen === 'Personal info' && <PersonalInfo /> }
        { chosen === 'Education' && <Education /> }
        { chosen === 'Skills' && <Skills />}
    </form>
  )
}

export default Form