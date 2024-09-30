import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import MyLists from './pages/MyLists/MyLists';
import ProtectedRoute from './routes/ProtectedRoute';
//import { UserProvider } from './context/UserContext';

const App = () => {
  

  return (
      <>
      {window.location.pathname !== '/login' && <Header />}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home/:userId' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/my-lists' element={
            <ProtectedRoute>
            <MyLists />
            </ProtectedRoute>
          } />
        </Routes>
      </>
  );
}

export default App;
