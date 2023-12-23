import React, { useState } from 'react'
import classes from './navitem.module.css'
import checkSvg from '../../assets/svg/check_circle_FILL1_wght400_GRAD0_opsz24.svg'
import unCheckSvg from '../../assets/svg/cancel_FILL1_wght400_GRAD0_opsz24.svg'


function NavItem(props) {

    const [ hoverState, setHoverState ] = useState(false);
  return (
    <li className={classes.navLi} target={props.target}>
        {/* <img src = { props.checked ? checkSvg : unCheckSvg } className={classes.check}/> */}
        {/* <a className={classes.navLink} onMouseEnter={e=>setHoverState(e.target.id)} onMouseLeave={()=>setHoverState(false)} id={ props.id } target={props.target}> */}
        <a className={classes.navLink} id={ props.id } target={props.target} onClick={props.onClick}>
            <img src = {props.name} style={{'verticalAlign': 'middle', 'transition': 'opacity 500ms'}} id={ props.id } target={props.target}/> 
            {/* { !hoverState ? <img src = {props.name} style={{'verticalAlign': 'middle', 'transition': 'opacity 500ms'}} id={ props.id }/> : hoverState} */}
        </a>
    </li>
  )
}

export default NavItem