import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

// const {REACT_APP_BASE_URL: URL} = require('@env');

export const authLogin = (phone, pin) => {
  console.log('1');
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('phone', phone);
    form.append('pin', pin);
    try {
      const {data} = await http().post(
        `${REACT_APP_BASE_URL}/auth/login`,
        form.toString(),
      );
      dispatch({
        type: 'AUTH_LOGIN',
        payload: data.resultToken,
      });
    } catch (err) {
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
  console.log('1');
  return async dispatch => {
    const form2 = new URLSearchParams();
    form2.append('name', name);
    form2.append('email', email);
    form2.append('pin', pin);
    form2.append('phone', phone);
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

export const authNotifToken = (token, notifToken) => {
  console.log('1');
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('token', notifToken.token);
    if (token) {
      await http(token).post(
        `${REACT_APP_BASE_URL}/auth/registerToken`,
        form.toString(),
      );
      dispatch({
        type: 'AUTH_NOTIF_TOKEN',
        payload: notifToken,
      });
    }
  };
};

export const cobaGet = () => {
  console.log('1');
  return async dispatch => {
    const {data} = await http().get(`${REACT_APP_BASE_URL}/users`);
    dispatch({
      type: 'AUTH_GET',
      payload: data,
    });
  };
};
