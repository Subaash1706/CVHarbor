import React, { useEffect, useState } from 'react'
import classes from './navbar.module.css'
import NavItem from './NavItem'
import personSvg from '../../assets/svg/person_FILL1_wght400_GRAD0_opsz24.svg'
import educationSvg from '../../assets/svg/school_FILL1_wght400_GRAD0_opsz24.svg'
import skillSvg from '../../assets/svg/build_FILL1_wght400_GRAD0_opsz24.svg'
import xpSvg from '../../assets/svg/work_FILL1_wght400_GRAD0_opsz24.svg'
import addMoreSvg from '../../assets/svg/add_circle_FILL1_wght400_GRAD0_opsz24.svg'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../store/store'
import FlexBox from '../cv_components/flexbox/FlexBox'
import Overlay from '../landing/Overlay'

function Navbar(props) {
    const [ navExpanded, setNavExpanded ] = useState(false)
    const data = useSelector(state=>state.bioData.data)
    const { personal, education, skills, xp } = data
    const page = useSelector(state=>state.bioData.allSections)
    const restPages = page.slice( 5 )
    function checkValidity(target){
        console.log(target)
      return Object.values(target).every(Boolean)
    }
    const dispatch = useDispatch()
    function navClickHandler(e){
        props.onItemChoose(e.target.id);
        dispatch(bioActions.updateCurrentPage({target: e.target.target}))
    }
    function navExpandFunction(){
      setNavExpanded(prev=>!prev)
    }
    useEffect(()=>{
      props.onNavExpanded(navExpanded)
    }, [ navExpanded ])
    useEffect(()=>{
      if(!props.landingPageStatus){
          const navbar = document.querySelector('.navbarWrapper')
          const nav = navbar.firstChild;
          const brand = document.querySelector('.navbarBrand')
          navbar.style.top = '0'
          nav.style.borderRadius = '0%';
          nav.style.width = '100%';
      }

    }, [ props.landingPageStatus ])
    // useEffect(()=>{
    //   const navbar = document.querySelector(".navbarContainer")
    //   navbar.style.height = navExpanded ? '25vh' : 'fit-content';
    // }, [ navExpanded ])
  return (
    <div className={`${classes.navbarWrapper} navbarWrapper`}>
        <nav className={`${classes.navbarContainer} navbarContainer`}>
          <div className={`${classes.navbarBrand} navbarBrand`}>
              CV.Harbor
          </div>
          <ul className={classes.navUl}>
              <button className={classes.toggleButton} onClick={navExpandFunction}></button>
              {/* <br />
              { navExpanded && <FlexBox direction='row'>
                  <NavItem name={ personSvg } checked={personal.length != 0} id='Personal info' onClick={ navClickHandler } target='0'/>
                  <NavItem name={ educationSvg } checked={education.length != 0} id='Education' onClick={ navClickHandler } target='1'/>
                  <NavItem name={ skillSvg } checked={skills.length != 0} id='Skills' onClick={ navClickHandler } target='2'/>
                  <NavItem name={ xpSvg } checked={xp.length != 0} id='Experience' onClick={ navClickHandler } target='3'/>
                  <NavItem name={ addMoreSvg } id='Add more' onClick={ navClickHandler } target={ restPages.length > 0 ? '5' : '4' }/>
              </FlexBox>} */}
          </ul>
      </nav>
    </div>

  )
}

export default Navbar