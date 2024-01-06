import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Main from './components/Main'

function App() {
  const [ a4PreviewState, seta4PreviewState ] = useState(false)
  const [ chosenNavItem, setChosenNavItem ] = useState('');
  const [ navExpanded, setNavExpanded ] = useState(false)
  const [ printState, setPrintState ] = useState(false)
  function itemChooseHandler(e){
    setChosenNavItem(e)
  }

  function passPrintStatus(data){
    setPrintState(data);
  }
  return (
      <div>
        <Navbar onItemChoose = { itemChooseHandler } printStatus={passPrintStatus} onPreview={(status)=>{seta4PreviewState(status)}}/>
        { <Main chosenItem = { chosenNavItem } onNavExpanded={navExpanded} onPrintStatus={printState} onA4Preview = {a4PreviewState} onClose={(state)=>seta4PreviewState(state)}/> }
      </div>
  )
}

export default App
