import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

// const {REACT_APP_BASE_URL: URL} = require('@env');

export const authLogin = (phone, pin) => {
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('phone', phone);
    form.append('pin', pin);
    console.log(form);
    try {
      const {data} = await http().post(
        `${REACT_APP_BASE_URL}/auth/login`,
        form.toString(),
      );
      console.log(data);
      dispatch({
        type: 'AUTH_LOGIN',
        payload: data.resultToken,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'AUTH_LOGIN_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'AUTH_RESET'});
      }, 3000);
    }
  };
};

export const authRegister = (name, email, pin, phone) => {
  return async dispatch => {
    const form2 = new URLSearchParams();
    form2.append('name', name);
    form2.append('email', email);
    form2.append('pin', pin);
    form2.append('phone', phone);
    console.log(form2);
    try {
      const {data} = await http().post(
        `${REACT_APP_BASE_URL}/auth/register`,
        form2.toString(),
      );
      dispatch({
        type: 'AUTH_REGISTER',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_REGISTER_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'AUTH_RESET'});
      }, 3000);
    }
  };
};

export const authLogout = () => ({
  type: 'AUTH_LOGOUT',
});
