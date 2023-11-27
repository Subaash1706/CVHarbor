import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Main from './components/Main'

function App() {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: ()=>componentRef.current
  })
  return (
    <div>
      <Navbar />
      <Main />
      {/* <button onClick={handlePrint}>Print</button> */}
      {/* <A4Container>
        <Template1 ref = {componentRef} />
      </A4Container> */}
    </div>
  )
}

export default App
