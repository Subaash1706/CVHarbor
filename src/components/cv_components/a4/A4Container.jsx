import React from 'react'
import classes from './a4container.module.css'
import { useSelector } from 'react-redux'

function A4Container(props) {
  const pagePreviewStatus = useSelector(state=>state.bioData.pagePreviewStatus)
  const styles = {}
  return (
    <div className={`${classes.a4container} a4Container`} style={{...props.style, ...(pagePreviewStatus ? styles : '') }}>
        {props.children}
    </div>
  )
}

export default A4Container