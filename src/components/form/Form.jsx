import React from 'react'
import PersonalInfo from './personal/PersonalInfo'
import classes from './form.module.css'

function Form(props) {
  return (
    <form>
        <PersonalInfo />
    </form>
  )
}

export default Form