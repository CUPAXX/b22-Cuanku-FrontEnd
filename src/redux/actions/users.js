import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

export const usersGet = token => {
  return async dispatch => {
    const {data} = await http(token).get(`${REACT_APP_BASE_URL}/users/detail`);
    dispatch({
      type: 'USERS_GET',
      payload: data.results,
    });
  };
};

export const usersUpdate = (picture, name, token) => {
  return async dispatch => {
    const form = new FormData();

    form.append('picture', {
      uri: picture,
      name: 'test.jpg',
      type: 'image/jpeg',
    });
    form.append('name', name);
    console.log(form);
    const {data} = await http(token).patch(`${REACT_APP_BASE_URL}/users`, form);
    dispatch({
      type: 'USERS_UPDATE',
      payload: data.results,
    });
  };
};

export const usersOldPin = (pin, token) => {
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('pin', pin);
    const {data} = await http(token).post(
      `${REACT_APP_BASE_URL}/users/oldPin`,
      form,
    );
    dispatch({
      type: 'USERS_OLD_PIN',
      payload: data.message,
    });
  };
};

export const usersUpdatePin = (pin, token) => {
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
