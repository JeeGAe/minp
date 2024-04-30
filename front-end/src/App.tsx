import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Container from './layouts/Container';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import { BOARD_PATH, BOARD_WRITE_PATH, MAIN_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from './constants';
import BoardWrite from './pages/Board/Write';

function App() {
  return (
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} />
          <Route path={SIGN_UP_PATH()} element={<SignUp />}/>
          <Route path={SIGN_IN_PATH()} element={<SignIn />}/>
          <Route path={BOARD_PATH()} >
            <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />}/>
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
