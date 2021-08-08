import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

export const transferToFriend = (phoneRecipient, balance, token) => {
  console.log('1');
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('phoneRecipient', phoneRecipient);
    form.append('balance', balance);
    try {
      const {data} = await http(token).post(
        `${REACT_APP_BASE_URL}/users/transfer`,
        form,
      );
      dispatch({
        type: 'TRANSFER_TO_FRIEND',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSFER_TO_FRIEND_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'TRANSACTION_RESET'});
      }, 3000);
    }
  };
};

export const usersTopup = (balance, token) => {
  console.log('1');
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('balance', balance);
    try {
      const {data} = await http(token).patch(
        `${REACT_APP_BASE_URL}/users/topup`,
        form,
      );
      dispatch({
        type: 'TOPUP',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'TOPUP_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'TRANSACTION_RESET'});
      }, 3000);
    }
  };
};

export const mobileTopup = (balance, phone, token) => {
  console.log('1');
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('balance', balance);
    form.append('phone', phone);
    try {
      const {data} = await http(token).post(
        `${REACT_APP_BASE_URL}/transaction/mobileTopup`,
        form,
      );
      dispatch({
        type: 'MOBILE_TOPUP',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'MOBILE_TOPUP_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'TRANSACTION_RESET'});
      }, 3000);
    }
  };
};

export const historyGet = (sort, search, page, token) => {
  console.log('1');
  return async dispatch => {
    try {
      const {data} = await http(token).get(
        `${REACT_APP_BASE_URL}/transaction?page=${page}&sort[createdAt]=${sort}&limit=5&search=${search}`,
      );
      dispatch({
        type: 'TRANSACTION_HISTORY',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_HISTORY_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'TRANSACTION_RESET'});
      }, 3000);
    }
  };
};

export const historyGetDefault = (sort, page, token) => {
  console.log('1');
  return async dispatch => {
    try {
      const {data} = await http(token).get(
        `${REACT_APP_BASE_URL}/transaction?page=${page}&sort[createdAt]=${sort}`,
      );
      dispatch({
        type: 'TRANSACTION_HISTORY_DEFAULT',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_HISTORY_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'TRANSACTION_RESET'});
      }, 3000);
    }
  };
};
