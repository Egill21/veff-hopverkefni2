import { post2 } from '../index';
import {
  loginError,
  recieveLogin,
  requestLogin,
  requestLogOut,
  recieveLogout,
  logoutError
} from '../actions/auth';
// Thunk!

export const loginUser = (username: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(requestLogin());

    let login;
    try {
      login = await post2('users/login', { username, password });
      console.log('TCL: loginUser -> login', login);
    } catch (e) {
      return dispatch(loginError(e));
    }

    if (login.error) {
      dispatch(loginError(login.error));
    }

    if (login.status === 200) {
      const { user, token } = login;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      dispatch(recieveLogin(user));
    }
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    dispatch(requestLogOut());

    let bye;
    try {
      const user = localStorage.getItem('user');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      bye = await post2(`/login?logout=${user}`);
    } catch (e) {
      dispatch(logoutError());
    }
    dispatch(recieveLogout(bye));
  };
};
