import React, { useEffect, useState } from 'react'
import classes from './navbar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../store/store'

function Navbar(props) {
    const [ toggleStatus, setToggleStatus ] = useState(false)
    const templateNumber = useSelector(state=>state.bioData.selectedTemplate.templateNumber)
    const pagePreviewStatus = useSelector(state=>state.bioData.pagePreviewStatus)
    const dispatch = useDispatch()
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