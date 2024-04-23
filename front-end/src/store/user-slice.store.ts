import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../types/interface';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

const initialState : UserInfo = {
  email: null,
  nickname: null,
  isLogin: false
}

export const userSlice = createSlice({
  name : 'user',
  initialState,
  reducers : {
    signIn : (state, action : PayloadAction<UserInfo>) => {
      state.isLogin = true;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
    },
    signOut : (state) => {
      state.isLogin = false;
      state.email = null;
      state.nickname = null; 
    }
  }
})

export const { signIn, signOut } = userSlice.actions;

export const selectUser = (state : RootState) => state.user;

export default userSlice.reducer;