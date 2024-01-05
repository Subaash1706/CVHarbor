import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Main from './components/Main'

function App() {

  const [ chosenNavItem, setChosenNavItem ] = useState('');
  const [ navExpanded, setNavExpanded ] = useState(false)
  const [ printState, setPrintState ] = useState(false)
  function itemChooseHandler(e){
    setChosenNavItem(e)
  }

  function passPrintStatus(data){
    console.log('status', data);
    setPrintState(data);
  }
  return (
      <div>
        <Navbar onItemChoose = { itemChooseHandler } printStatus={passPrintStatus}/>
        { <Main chosenItem = { chosenNavItem } onNavExpanded={navExpanded} onPrintStatus={printState} /> }
      </div>
  )
}

export default App
