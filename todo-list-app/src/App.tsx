import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Calendar from './components/Calendar/Calendar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  const location = useLocation();
  
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  return (
      <>
      {!isLoginPage && <Header />}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/my-calendar' element={
            <ProtectedRoute>
            <Calendar />
            </ProtectedRoute>
          } />
        </Routes>
        {!isLoginPage && <Footer />}
      </>
  );
}

export default App;
