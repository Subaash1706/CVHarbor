import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import A4Container from './cv_components/a4/A4Container'
import Template1 from './harvard/template_1/Template1'
import Form from '../components/form/Form'
import classes from './main.module.css'

const Main = React.forwardRef((props, ref)=>{
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: ()=>componentRef.current
      })
  return (
    <main>
        <Form onItemChoose = { props.chosenItem }/>
        {/* <button onClick={handlePrint}>print</button> */}
        <A4Container>
            <Template1 ref = { componentRef.current }/>
        </A4Container>
    </main>
  )
})

export default Main