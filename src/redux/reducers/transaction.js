const initialState = {
  data: [],
  pageInfo2: {},
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
        errMsg: '',
      };
    }
    case 'TRANSFER_TO_FRIEND_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
        sccMsg: '',
      };
    }
    case 'TOPUP': {
      return {
        ...state,
        sccMsg: action.payload,
        errMsg: '',
      };
    }
    case 'TOPUP_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
        sccMsg: '',
      };
    }
    case 'MOBILE_TOPUP': {
      return {
        ...state,
        sccMsg: action.payload,
        errMsg: '',
      };
    }
    case 'MOBILE_TOPUP_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
        sccMsg: '',
      };
    }
    case 'TRANSACTION_HISTORY_DEFAULT': {
      return {
        ...state,
        data: action.payload.results,
        pageInfo2: action.payload.pageInfo,
      };
    }
    case 'TRANSACTION_HISTORY_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
        sccMsg: '',
      };
    }
    case 'TRANSACTION_HISTORY': {
      return {
        ...state,
        search2: action.payload.results,
        pageInfo: action.payload.pageInfo,
      };
    }
    case 'TRANSACTION_RESET': {
      return {
        ...state,
        errMsg: '',
        sccMsg: '',
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
