import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import PrimaryLayout from './Layouts/PrimaryLayout'
import Home from './Components/Home'
import Details from './Components/Details'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<PrimaryLayout />}>
                <Route index element={<Home />} />
                <Route path='details' element={<Details />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
