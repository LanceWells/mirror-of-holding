import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { useSelector } from "react-redux";

export const USER_COOKIES_KEY = 'user-data';

const getDefaultUserInfo = (): UserState['userInfo'] => {
  const storedInfo = Cookies.get(USER_COOKIES_KEY);
  if (storedInfo) {
    const parsedStoredInfo = JSON.parse(storedInfo);
    if (
      parsedStoredInfo &&
      parsedStoredInfo.type &&
      parsedStoredInfo.type === 'anon' &&
      parsedStoredInfo.id &&
      parsedStoredInfo.name
    ) {
      return {
        type: 'anon',
        id: parsedStoredInfo.id,
        name: parsedStoredInfo.name,
      }
    }
  }

  return {
    type: 'loading',
  };
}

export type StateOptions = {
  type: 'loading'
} | {
  type: 'anon',
  id: string,
  name: string,
} | {
  type: 'user',
  id: string,
  name: string,
  avatarSrc: string,
}

export type UserState = {
  userInfo: StateOptions;
}

const DefaultUserState: UserState = {
  userInfo: getDefaultUserInfo()
}

const UserSlice = createSlice({
  name: 'user',
  initialState: DefaultUserState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserState['userInfo']>) {
      state.userInfo = action.payload;
      Cookies.set(
        USER_COOKIES_KEY,
        JSON.stringify(action.payload),
      );
    }
  }
});

type UserStateStore = {
  userState: UserState
}

const useUserInfo = () =>
  useSelector<UserStateStore, UserState['userInfo']>(
    createSelector(
      (state: UserStateStore) => state.userState.userInfo,
      (userInfo) => userInfo,
    )
  );

export default UserSlice;

export const {
  setUserInfo,
} = UserSlice.actions;

export {
  useUserInfo,
}
