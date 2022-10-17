import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.scss'
import { BrowserRouter, Routes as Router, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Body from './layout/Body'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
function App() {
  return (
    <BrowserRouter>
        <Router>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/product" element={<Products />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Router>
    </BrowserRouter>
  )
}

export default App
