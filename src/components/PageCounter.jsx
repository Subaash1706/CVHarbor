import React, { useEffect, useState } from 'react'
import classes from './pagecounter.module.css'
import { useDispatch, useSelector } from 'react-redux'

function PageCounter() {
    const { log: l } = console
    const [ translateDistance, setTranslateDistance ] = useState(0)
    const allPagesArray = useSelector(state=>state.bioData.allSections)
    const currentPage = useSelector(state=>state.bioData.currentForm)
    const totalPagesCount = allPagesArray.length
    const currentPageIndex = allPagesArray.findIndex(page=>page===currentPage)
    useEffect(()=>{
        if(currentPageIndex > 3){
            setTranslateDistance(10.5)
        }
        else if(currentPageIndex < 3){

        }
    }, [ totalPagesCount ])
    // l(translateDistance, translateDistance-(10.5 * (+currentPageIndex)))
    // l(currentPage, currentPageIndex, totalPagesCount)
  return (
    <section className={`${classes.pageSelectorSection} pageCounterSection`}>
        <div className={classes.currentPage} style={{transform: `translate(0px, -${(10.5*(+currentPageIndex))}rem)`}}>
            { Array.from({length: 12}, (item, ind)=>{  
                return(
                    <React.Fragment key={ind}><span className={classes.currentPageSlider}>{ind+1}</span><br/></React.Fragment>
                )
            }) }
        </div>
        
        <div className={classes.pageSelectorTotalPages}>
            { totalPagesCount }
        </div>
    </section>
  )
}

export default PageCounter