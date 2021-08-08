import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

export const usersGet = token => {
  console.log('1');
  return async dispatch => {
    const {data} = await http(token).get(`${REACT_APP_BASE_URL}/users/detail`);
    dispatch({
      type: 'USERS_GET',
      payload: data.results,
    });
  };
};

export const usersUpdate = (picture, name, token) => {
  console.log('1');
  return async dispatch => {
    const form = new FormData();

    form.append('picture', {
      uri: picture,
      name: 'test.jpg',
      type: 'image/jpeg',
    });
    form.append('name', name);
    const {data} = await http(token).patch(`${REACT_APP_BASE_URL}/users`, form);
    dispatch({
      type: 'USERS_UPDATE',
      payload: data.results,
    });
  };
};

export const usersOldPin = (pin, token) => {
  console.log('1');
  return async dispatch => {
    console.log('2');
    const form = new URLSearchParams();
    form.append('pin', pin);

    try {
      console.log('3');
      const {data} = await http(token).post(
        `${REACT_APP_BASE_URL}/users/oldPin`,
        form,
      );
      dispatch({
        type: 'USERS_OLD_PIN',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'USERS_OLD_PIN_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'USERS_RESET'});
      }, 3000);
    }
  };
};

export const usersUpdatePin = (pin, token) => {
  console.log('1');
  return async dispatch => {
    const form = new FormData();

    form.append('pin', pin);
    console.log(form);
    const {data} = await http(token).patch(`${REACT_APP_BASE_URL}/users`, form);
    dispatch({
      type: 'USERS_UPDATE',
      payload: data.results,
    });
  };
};
