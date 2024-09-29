import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  const location = useLocation();

  return (
    <>{location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home/:userId' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
