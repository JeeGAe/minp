import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Container from './layouts/Container';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import BoardWrite from './pages/Board/Write';
import User from './pages/User';

import { BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SIGN_IN_PATH, SIGN_UP_PATH, USER_PATH } from './constants';
import BoardUpdate from './pages/Board/Update';
import BoardDetail from './pages/Board/Detail';


function App() {
  return (
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} />
          <Route path={SIGN_UP_PATH()} element={<SignUp />} />
          <Route path={SIGN_IN_PATH()} element={<SignIn />} />
          <Route path={USER_PATH()} element={<User />}/>
          <Route path={BOARD_PATH()} >
            <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
            <Route path={BOARD_UPDATE_PATH()} element={<BoardUpdate />} />
            <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />}/>
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
