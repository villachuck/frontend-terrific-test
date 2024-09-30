import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import MyLists from './pages/MyLists/MyLists';
import ProtectedRoute from './routes/ProtectedRoute';
import { UserProvider } from './context/UserContext';

function App() {
  const location = useLocation();

  return (
    <>
    <UserProvider>
      {location.pathname !== '/login' && <Header />}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home/:userId' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/my-lists' element={<MyLists />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
