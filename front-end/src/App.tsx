import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Routes>
      <Route path='/' />
      <Route path='signup' element={<SignUp />}/>
      <Route path='signin' element={<SignIn />}/>
    </Routes>
    
  );
}

export default App;
