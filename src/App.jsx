import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import './App.css'
import Template1 from './components/harvard/template_1/Template1'

function App() {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: ()=>componentRef.current
  })
  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <Template1 ref = {componentRef} />
    </div>
  )
}

export default App
