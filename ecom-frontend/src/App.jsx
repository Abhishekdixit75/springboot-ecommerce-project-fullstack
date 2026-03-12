import './App.css'
import Home from './components/home/Home';
import Products from './components/products/Products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home />}></Route>
        <Route path='/products' element = {<Products />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
