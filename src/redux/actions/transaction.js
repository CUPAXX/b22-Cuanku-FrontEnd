import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

export const transferToFriend = (phoneRecipient, balance, token) => {
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('phoneRecipient', phoneRecipient);
    form.append('balance', balance);
    console.log(form);
    const {data} = await http(token).post(
      `${REACT_APP_BASE_URL}/users/transfer`,
      form,
    );
    dispatch({
      type: 'TRANSFER_TO_FRIEND',
      payload: data.message,
    });
  };
};

export const usersTopup = (balance, token) => {
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('balance', balance);
    const {data} = await http(token).patch(
      `${REACT_APP_BASE_URL}/users/topup`,
      form,
    );
    dispatch({
      type: 'TOPUP',
      payload: data.message,
    });
  };
};

export const mobileTopup = (balance, phone, token) => {
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('balance', balance);
    form.append('phone', phone);
    console.log(form);
    const {data} = await http(token).post(
      `${REACT_APP_BASE_URL}/transaction/mobileTopup`,
      form,
    );
    dispatch({
      type: 'MOBILE_TOPUP',
      payload: data.message,
    });
  };
};

export const historyGet = (search, page, token) => {
  return async dispatch => {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/transaction?page=${page}&sort[description]=2&limit=5&search=${search}`,
    );
    dispatch({
      type: 'TRANSACTION_HISTORY',
      payload: data,
    });
  };
};

export const historyGetDefault = (page, token) => {
  return async dispatch => {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/transaction?page=${page}`,
    );
    dispatch({
      type: 'TRANSACTION_HISTORY_DEFAULT',
      payload: data,
    });
  };
};
