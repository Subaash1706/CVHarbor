import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import './App.css'
import Navbar from './components/navbar/Navbar'
import NavItem from './components/navbar/NavItem' 
import Main from './components/Main'
import store from './components/store/store'
import { Provider } from 'react-redux'
import Landing from './components/landing/Landing'
import Overlay from './components/landing/Overlay'
import A4Container from './components/cv_components/a4/A4Container'
import Template1 from './components/harvard/template_1/Template1'

function App(props) {
  const [ chosenNavItem, setChosenNavItem ] = useState('');
  const [ overlay, setOverlay ] = useState(false)
  const [ landing, setLanding ] = useState(true)
  const [ navExpanded, setNavExpanded ] = useState(false)
  const [ printState, setPrintState ] = useState(false)
  const componentRef = useRef()
  // const handlePrint = useReactToPrint({
  //   content: ()=>componentRef.current
  // })
  function itemChooseHandler(e){
    setChosenNavItem(e)
  }
  function overlayFunction(status){
    setOverlay(status)
  }
  useEffect(()=>{
    if(overlay){
      setLanding(false)
      setOverlay(false) //animate the exit of the overlay
    }
  }, [ overlay ])
  function passPrintStatus(data){
    console.log('status', data);
    setPrintState(data);
  }
  // console.log('printSTatus', printState)
  // const [ templateChosenState, setTemplateChosenStatus ] = useState(false)
  return (
    <Provider store={store}>
      <div>
        {overlay ? <Overlay content='Fill out the form'/> : <></>}
        <Navbar onItemChoose = { itemChooseHandler } landingPageStatus = {landing} onNavExpanded={(status)=>{setNavExpanded(status)}} printStatus={passPrintStatus}/>
        {/* { landing && <Landing overlayStatus = { overlayFunction }/> } */}
        {/* { ( !landing && !overlay ) && <Main chosenItem = { chosenNavItem } onNavExpanded={navExpanded}/> } */}
        { <Main chosenItem = { chosenNavItem } onNavExpanded={navExpanded} onPrintStatus={printState} /> }
        {/* <button onClick={passPrintStatus}>Print</button> */} 
      </div>
    </Provider>
  )
}

export default App
