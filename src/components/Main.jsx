import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import { useReactToPrint } from 'react-to-print'
import A4Container from './cv_components/a4/A4Container'
import Template1 from './harvard/template_1/Template1'
import Template2 from './harvard/template_2/Template2'
import Template3 from './harvard/template_3/Template3'
import Form from '../components/form/Form'
import classes from './main.module.css'
import Overlay from './landing/Overlay'
import NextContainer from './form/NextContainer'
import { bioActions } from './store/store'
import Modal from './modal/Modal'
import Template4 from './harvard/template_4/Template4'
import Template5 from './harvard/template_5/Template5'
import Template6 from './harvard/template_6/Template6'
import Template7 from './harvard/template_7/Template7'
import MitTemplate1 from './templates/MIT templates/MitTemplate1/MitTemplate1'
import MitTemplate2 from './templates/MIT templates/MitTemplate2/MitTemplate2'
import MitTemplate3 from './templates/MIT templates/MitTemplate3/MitTemplate3'
import MitTemplate4 from './templates/MIT templates/MitTemplate4/MitTemplate4'
import MitTemplate5 from './templates/MIT templates/MitTemplate5/MitTemplate5'
import ModTemplate1 from './templates/modern/modern1/ModTemplate1'
import ModTemplate2 from './templates/modern/modern2/ModTemplate2'
import SelectorCarousal from './resume_selector_carousal/SelectorCarousal'
import {harvardFileArray, mitFileArray, modernFileArray} from '../components/imageSelector'
import { current } from '@reduxjs/toolkit'

const Main = React.forwardRef((props, ref)=>{
  const [ openModal, setOpenModal ] = useState(false)
  const [ templateSelectionState, setTemplateSelectionState ] = useState(false)
  const [ closeModal, setCloseModal ] = useState(false);
  const [ stayAtCurrentPage, setStayAtCurrentPage ] = useState(false)
  const dispatch = useDispatch();
  const allPagesArray = useSelector(state=>state.bioData.allSections)
  const currentPage = useSelector(state=>state.bioData.currentForm)
  const currentTemplate = useSelector(state=>state.bioData.selectedTemplate.category)
  const templateNumber = useSelector(state=>state.bioData.selectedTemplate.templateNumber)
  const totalPages = allPagesArray.length
  const currentPageIndex = allPagesArray.findIndex(page=>page===currentPage)
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: ()=>componentRef.current,
    })
    if(!!props.onPrintStatus){   //problem
      handlePrint()
    }
      // const classes = { active: props.onNavExpanded ? 'navActive' : 'exit' }
      const toggleClass = []
      if(props.onNavExpanded){
        toggleClass.includes('exit') && toggleClass.remove('exit')
        toggleClass.push('navActive')
        
      }
      else{
        toggleClass.includes('navActive') && toggleClass.remove('navActive')
        toggleClass.push('exit')
      }
      function togglePage(e){
          if(e.target.id === 'previous') dispatch(bioActions.updateCurrentPage({direction: '-1'}))
          // else if(e.target.id === 'next') dispatch(bioActions.updateCurrentPage({direction: '1'}))
    }
  function proceedHandler(data){
    setCloseModal(data)
    setOpenModal(false)
  }
  function modalTriggerHandler(data){
    setOpenModal(data)
  }
  function templateSelectFn(data){
    setTemplateSelectionState(data)
  }

  useEffect(()=>{
    if(!currentTemplate) setTemplateSelectionState(true)
  }, [ currentTemplate ])

  useEffect(()=>{
    setTemplateSelectionState(templateNumber)
  }, [ templateNumber ])
  function renderSelectedTemplate(currentTemplate, templateNumber){
      const render = currentTemplate === 'har' ? `har${templateNumber}` : (currentTemplate === 'mit' ? `mit${templateNumber}` : `mod${templateNumber}` )
      if(!!templateNumber){
        switch(render){
          case 'har1':
            return <Template1 ref={componentRef}/>
          case 'har2':
            return <Template2 ref={componentRef}/>
          case 'har3':
            return <Template3 ref={componentRef}/> 
          case 'har4':
            return <Template4 ref={componentRef}/>
          case 'har5':
            return <Template5 ref={componentRef}/>
          case 'har6':
            return <Template6 ref={componentRef}/>
          case 'har7':
            return <Template7 ref={componentRef}/>
          case 'mit1':
            return <MitTemplate1 ref={componentRef}/>
          case 'mit2':
            return <MitTemplate2 ref={componentRef}/>
          case 'mit3':
            return <MitTemplate3 ref={componentRef}/>
          case 'mit4':
            return <MitTemplate4 ref={componentRef}/>
          case 'mit5':
            return <MitTemplate5 ref={componentRef}/>
          case 'mod1':
            return <ModTemplate1 ref={componentRef}/>
          case 'mod2':
            return <ModTemplate2 ref={componentRef}/>
          default:
            return <></> 
        }
      }
  }

  return (
    <main>
        { props.onNavExpanded && <Overlay content='This is from navbar' /> }
        {
           createPortal(<Overlay content='This is from navbar' className={ toggleClass.join(' ') }/>, document.getElementById('expandedNavPortal'))
        }
        {
           openModal && createPortal(<Modal onProceed={proceedHandler} onCancel={()=>{setOpenModal(false)}}/>, document.getElementById('modalPortal'))
        }
       { templateSelectionState && 
          <><Form onItemChoose = { props.chosenItem }/> 
          <NextContainer onClick={togglePage} back={true} next={true} backDisabled={currentPageIndex+1 === 1} nextDisabled={currentPageIndex+1 === totalPages} onTriggerModal={modalTriggerHandler}/></>
       }
        {/* <button onClick={handlePrint}>print</button> */}
        { !templateSelectionState &&
          <SelectorCarousal imageArray={(currentTemplate==='har' && harvardFileArray)||(currentTemplate==='mit' && mitFileArray)||(currentTemplate==='mod' && modernFileArray)}/>
        }
        {
          <A4Container>
              { renderSelectedTemplate(currentTemplate, templateNumber) }
          </A4Container>
        }
    </main>
  )
})

export default Main