import './App.css'
import { Link } from 'react-router-dom'
import { useContext, useRef } from 'react';
import { ShowLoginContext } from './components/Context/ShowLogin';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Information from './components/Information'
import Update from './components/Update'


function App() {

  const storageLogin = JSON.parse(localStorage.getItem('login'))
  const showLogin = useContext(ShowLoginContext)
  const loggedRef = useRef(storageLogin ?? {})




  const handleLogout = () => {
    localStorage.removeItem('login')
    window.location.href = "http://localhost:3000"
  }




  return (
    <div className='wrapApp'>
      <div className='wrapHeader'>
        <div className='container d-flex headerHeight'>
          <div className='col-3'>
            LOGO
          </div>
          <div className='d-flex justify-content-between col-9'>
            <div>
              <Link to='/' className='me-5' >Trang chủ</Link>
              <Link to='/information' className='me-5'>Thông tin</Link>
              <Link to='/update' >Cập nhật</Link>
            </div>
            <div className='d-flex'>
              {!loggedRef.current.state && <p className='cursorPointer'>Đăng kí</p>}
              {loggedRef.current.state && <p className='cursorPointer'>{loggedRef.current.account}</p>}
              {loggedRef.current.state && <p className='ms-5 cursorPointer' onClick={handleLogout}>Đăng xuất</p>}
              {!loggedRef.current.state && <p className='ms-5 cursorPointer' onClick={() => showLogin.showLogin()}>Đăng nhập</p>}
              {showLogin.isShowLogin && <Login />}
            </div>
          </div>
        </div>
      </div>

      <Routes>

        <Route exact path='/information' element={<Information />} />
        <Route exact path='/update' element={<Update />} />
        <Route exact path='/' element={<div></div>} />
      </Routes>
    </div>
  );
}


export default App;
