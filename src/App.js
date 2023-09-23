import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import PersistLogin from './components/persistLogin';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}