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
import { current } from '@reduxjs/toolkit'

function Navbar(props) {
    const [ navExpanded, setNavExpanded ] = useState(false)
    const [ toggleStatus, setToggleStatus ] = useState(false)
    const data = useSelector(state=>state.bioData.data)
    const currentTemplate = useSelector(state=>state.bioData.selectedTemplate)
    const templateNumber = useSelector(state=>state.bioData.selectedTemplate.templateNumber)
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
      if(props.landingPageStatus){  //put ! symbol at the front IMPORTANT
          const navbar = document.querySelector('.navbarWrapper')
          const nav = navbar.firstChild;
          const brand = document.querySelector('.navbarBrand')
          navbar.style.top = '0'
          nav.style.borderRadius = '0%';
          nav.style.width = '100%';
      }
    }, [ props.landingPageStatus ])
    function printHandler(status){
      props.printStatus(status)
      setTimeout(() => {
        abortPrint(false)
      }, 3000);
    }
    function abortPrint(state){
      props.printStatus(state)
    }
  return (
    <div className={`${classes.navbarWrapper} navbarWrapper`}>
        <nav className={`${classes.navbarContainer} navbarContainer`}>
          <div className={`${classes.navbarBrand} navbarBrand`}>
              CV.Harbor
          </div>
          <div className={classes.toggleButton} onClick={()=>setToggleStatus(prev=>!prev)}></div>
          <div className={classes.navItems}>
            {!!templateNumber && <a className={classes.changeTemplateLink} onClick={()=>dispatch(bioActions.setCurrentTemplate({templateNumber: ''}))}>Change template</a>}
            {!!templateNumber && <a className={classes.printTemplateLink} onClick={()=>printHandler(true)}>Print</a>}
          </div>
      </nav>
          {toggleStatus && <div className={classes.expandedNav}>
            {!!templateNumber && <a className={classes.expandedNavChange} onClick={()=>{dispatch(bioActions.setCurrentTemplate({templateNumber: ''})); setToggleStatus(false)}}>Change template</a>}
            {!!templateNumber && <a className={classes.expandedNavPrint} onClick={()=>{printHandler(true); setToggleStatus(false)}}>Print</a>}
          </div>}
    </div>

  )
}

export default Navbar