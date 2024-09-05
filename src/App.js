import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Xóa 'useNavigate' ở đây
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('loggedIn');
    if (userLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <header className="bg-danger text-white p-2 d-flex justify-content-between align-items-center">
          <div className="logo">
       
          </div>
          <div className="menu d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout} className="btn btn-light mx-2">Đăng xuất</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-light mx-2">Đăng nhập</Link>
                <Link to="/register" className="btn btn-light mx-2">Đăng ký</Link>
              </>
            )}
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
