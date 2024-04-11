import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import { MAIN_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from './constants';

function App() {
  return (
    <Routes>
      <Route path={MAIN_PATH()} />
      <Route path={SIGN_UP_PATH()} element={<SignUp />}/>
      <Route path={SIGN_IN_PATH()} element={<SignIn />}/>
    </Routes>
    
  );
}

export default App;
