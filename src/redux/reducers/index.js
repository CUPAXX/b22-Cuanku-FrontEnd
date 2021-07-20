import {combineReducers} from 'redux';
import auth from './auth';
import users from './users';
import transaction from './transaction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const persistAuth = {
  key: 'auth',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(persistAuth, auth),
  users,
  transaction,
});

export default reducer;
