import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Main from './components/Main'
import store from './components/store/store'
import { Provider } from 'react-redux'

function App(props) {
  const [ chosenNavItem, setChosenNavItem ] = useState('');
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: ()=>componentRef.current
  })
  function itemChooseHandler(e){
    setChosenNavItem(e)
  }
  return (
    <Provider store={store}>
      <div>
        <Navbar onItemChoose = { itemChooseHandler }/>
        <Main chosenItem = { chosenNavItem }/>
        {/* <button onClick={handlePrint}>Print</button> */}
        {/* <A4Container>
          <Template1 ref = {componentRef} />
        </A4Container> */}
      </div>
    </Provider>
  )
}

export default App
