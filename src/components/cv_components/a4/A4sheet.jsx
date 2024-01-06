import React, { useEffect, useState } from 'react'
import classes from './sheet.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../../store/store'
import expandSvg from '../../../assets/svg/open_in_full_FILL0_wght400_GRAD0_opsz24.svg'
import collapseSvg from '../../../assets/svg/close_fullscreen_FILL0_wght400_GRAD0_opsz24.svg'

const A4sheet = React.forwardRef((props, ref)=>{
  const dispatch = useDispatch()  
  const [ hoveredState, setHoveredState ] = useState(false)
  const [ previewState, setPreviewState ] = useState(false)
  const pagePreviewStatus = useSelector(state=>state.bioData.pagePreviewStatus)
  const svgImage = (hoveredState && !pagePreviewStatus ) ? expandSvg : collapseSvg
  useEffect(()=>{
    dispatch(bioActions.setPagePreviewStatus(previewState))
  }, [ previewState ])
  useEffect(()=>{
    setPreviewState(pagePreviewStatus)
  }, [ pagePreviewStatus])
  const styles = {}
  return (
    <div className={`printable ${previewState && 'printPreviewView'}`} ref={ref} onMouseEnter={()=>setHoveredState(true)} onMouseLeave={()=>setHoveredState(false)} style={pagePreviewStatus ? styles : {}} >
        { props.children}
        {hoveredState  && <div className='printablePreview'>
          <div onClick={()=>{setPreviewState(prev=>!prev)}}>
              <img src={svgImage} alt="" />
          </div>
        </div>}
    </div>
  )
})

export default A4sheet