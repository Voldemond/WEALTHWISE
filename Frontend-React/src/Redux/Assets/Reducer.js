import * as types from './ActionTypes';

const initialState = {
  asset: null,
  userAssets: [],
  loading: false,
  error: null,
  assetDetails: null,
  tradeStatus: null, // This will store the status of the trade (Buy, Sell, Other)
};

const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ASSET_REQUEST:
    case types.GET_USER_ASSETS_REQUEST:
    case types.BUY_ASSET_REQUEST:
    case types.SELL_ASSET_REQUEST:
    case types.OTHER_ASSET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ASSET_SUCCESS:
      return {
        ...state,
        asset: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_ASSET_DETAILS_SUCCESS:
      return {
        ...state,
        assetDetails: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_USER_ASSETS_SUCCESS:
      return {
        ...state,
        userAssets: action.payload,
        loading: false,
        error: null,
      };
    case types.BUY_ASSET_SUCCESS:
      return {
        ...state,
        tradeStatus: "Asset successfully purchased",
        loading: false,
        error: null,
      };
    case types.SELL_ASSET_SUCCESS:
      return {
        ...state,
        tradeStatus: "Asset successfully sold",
        loading: false,
        error: null,
      };
    case types.OTHER_ASSET_SUCCESS:
      return {
        ...state,
        tradeStatus: "Other trade completed",
        loading: false,
        error: null,
      };
    case types.GET_ASSET_FAILURE:
    case types.GET_USER_ASSETS_FAILURE:
    case types.BUY_ASSET_FAILURE:
    case types.SELL_ASSET_FAILURE:
    case types.OTHER_ASSET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default assetReducer;
