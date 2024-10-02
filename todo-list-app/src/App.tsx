import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Calendar from './components/Calendar/Calendar';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  const location = useLocation();
  

  return (
      <>
      {location.pathname !== '/login' && <Header />}
        <Routes>
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
      </>
  );
}

export default App;
