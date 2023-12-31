import React from 'react'
import PersonalInfo from './personal/PersonalInfo'
import classes from './form.module.css'
import Education from './education/Education'
import Skills from './skills/Skills'
import Xp from './xp/Xp'
import { useSelector, useDispatch } from 'react-redux'
import Additional from './additional/Additional'
import SelectiveAdditional from './additional/SelectiveAdditional'
import FlexBox from '../cv_components/flexbox/FlexBox'
import NavItem from '../navbar/NavItem'
import personSvg from '../../assets/svg/person_FILL1_wght400_GRAD0_opsz24.svg'
import educationSvg from '../../assets/svg/school_FILL1_wght400_GRAD0_opsz24.svg'
import skillSvg from '../../assets/svg/build_FILL1_wght400_GRAD0_opsz24.svg'
import xpSvg from '../../assets/svg/work_FILL1_wght400_GRAD0_opsz24.svg'
import addMoreSvg from '../../assets/svg/add_circle_FILL1_wght400_GRAD0_opsz24.svg'
import { bioActions } from '../store/store'

const miscArray = [ 'Certifications', 'Projects', 'Recognitions', 'Publications', 'Accomplishments', 'Languages', 'Volunteering' ]
function Form( props ) {
  const dispatch = useDispatch()
  const data = useSelector(state=>state.bioData.data)
  const { personal, education, skills, xp } = data
  const page = useSelector(state=>state.bioData.allSections)
  const restPages = page.slice( 5 )
  function checkValidity(target){
      console.log(target)
    return Object.values(target).every(Boolean)
  }
  const currentPage = useSelector(state=>state.bioData.currentForm)
  function navClickHandler(e){
    const target = e.target.target || e.currentTarget.target
    dispatch(bioActions.updateCurrentPage({target:target}))
}
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
        {/* <div className={classes.pageSelector}>
          <FlexBox direction='row'>
              <NavItem name={ personSvg } checked={personal.length != 0} id='Personal info' onClick={ navClickHandler } target='0'/>
              <NavItem name={ educationSvg } checked={education.length != 0} id='Education' onClick={ navClickHandler } target='1'/>
              <NavItem name={ skillSvg } checked={skills.length != 0} id='Skills' onClick={ navClickHandler } target='2'/>
              <NavItem name={ xpSvg } checked={xp.length != 0} id='Experience' onClick={ navClickHandler } target='3'/>
              <NavItem name={ addMoreSvg } id='Add more' onClick={ navClickHandler } target={ restPages.length > 0 ? '5' : '4' }/>
          </FlexBox>
        </div> */}
    </>
  )
}

export default Form
export { miscArray }