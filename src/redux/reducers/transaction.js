const initialState = {
  data: {},
  search: [],
  search2: [],
  pageInfo: {},
  errMsg: '',
  sccMsg: '',
};

const transaction = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSFER_TO_FRIEND': {
      return {
        ...state,
        sccMsg: action.payload,
      };
    }
    case 'TOPUP': {
      return {
        ...state,
        sccMsg: action.payload,
      };
    }
    case 'MOBILE_TOPUP': {
      return {
        ...state,
        sccMsg: action.payload,
      };
    }
    case 'TRANSACTION_HISTORY_DEFAULT': {
      return {
        ...state,
        search: action.payload.results,
        pageInfo: action.payload.pageInfo,
      };
    }
    case 'TRANSACTION_HISTORY': {
      return {
        ...state,
        search2: action.payload.results,
        pageInfo: action.payload.pageInfo,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default transaction;
