const initialState = {
  data: {},
  errMsg: '',
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'USERS_GET': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'USERS_UPDATE': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'USERS_UPDATE_PIN': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'USERS_OLD_PIN': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'USERS_UPDATE_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
      };
    }
    case 'USERS_RESET': {
      return {
        ...state,
        errMsg: '',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default users;
