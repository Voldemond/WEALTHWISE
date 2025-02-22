import axios from "axios";
import { FETCH_COIN_BY_ID_FAILURE, FETCH_COIN_BY_ID_REQUEST, FETCH_COIN_BY_ID_SUCCESS, FETCH_COIN_DETAILS_FAILURE, FETCH_COIN_DETAILS_REQUEST, FETCH_COIN_DETAILS_SUCCESS, FETCH_COIN_LIST_FAILURE, FETCH_COIN_LIST_REQUEST, FETCH_COIN_LIST_SUCCESS, FETCH_MARKET_CHART_FAILURE, FETCH_MARKET_CHART_REQUEST, FETCH_MARKET_CHART_SUCCESS, FETCH_TOP_50_COINS_FAILURE, FETCH_TOP_50_COINS_REQUEST, FETCH_TOP_50_COINS_SUCCESS, FETCH_TRADING_COINS_FAILURE, FETCH_TRADING_COINS_REQUEST, FETCH_TRADING_COINS_SUCCESS, SEARCH_COIN_FAILURE, SEARCH_COIN_REQUEST, SEARCH_COIN_SUCCESS } from "./ActionTypes";
import api, { API_BASE_URL } from "@/Api/api";
import { ResponsiveContainer } from "recharts";

// export const fetchCoinList = (page) => async (dispatch) => {
//     // dispatch({ type: FETCH_COIN_LIST_REQUEST });
//     try {
//       console.log("inside coin api", `${API_BASE_URL}/api/Coin`);
//       // const response = await axios.get(`${API_BASE_URL}/coins?page=${page}`);
//       const response = await axios.get(`${API_BASE_URL}/api/coins`);
//       console.log("response of coins",response);
//       // dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: response.data });
//       console.log("-------",response.data)
//     } catch (error) {
//         console.log("error",error)
//       dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message });
//     }
//   };
// --------------------------------------------
export const fetchCoinList = (page) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_LIST_REQUEST });  // Dispatch request start

  try {
    console.log("Fetching data from API:", `${API_BASE_URL}/api/Coin`);

    const response = await axios.get(`${API_BASE_URL}/api/Coin`);
    console.log("Fetched Coin Data:", response.data);

    // Dispatching the fetched data to the Redux store
    dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: response.data });

  } catch (error) {
    console.error("Error fetching coin data:", error);
    dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message });
  }
};
// --------------------------------------------

  // export const getTop50CoinList = () => async (dispatch) => {
  //   dispatch({ type: FETCH_TOP_50_COINS_REQUEST });
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/coins/top50`);
  //     dispatch({ type: FETCH_TOP_50_COINS_SUCCESS, payload: response.data });
  //     console.log("top 50",response.data)
  //   } catch (error) {
  //       console.log("error",error)
  //     dispatch({ type: FETCH_TOP_50_COINS_FAILURE, payload: error.message });
  //   }
  // };

  export const fetchTreadingCoinList = () => async (dispatch) => {
    dispatch({ type: FETCH_TRADING_COINS_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/coins/trading`);
      dispatch({ type: FETCH_TRADING_COINS_SUCCESS, payload: response.data });
      console.log("trading coins",response.data)
    } catch (error) {
        console.log("error",error)
      dispatch({ type: FETCH_TRADING_COINS_FAILURE, payload: error.message });
    }
  };
  
  export const fetchMarketChart = ({coinId, days, jwt}) => async (dispatch) => {
    dispatch({ type: FETCH_MARKET_CHART_REQUEST });
    try {
      const response = await api.get(`/coins/${coinId}/chart?days=${days}`,{
        headers:{
          Authorization: `Bearer ${jwt}`
        }
      });
      dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("error",error)
      dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: error.message });
    }
  };
  
  export const fetchCoinById = (coinId) => async (dispatch) => {
    dispatch({ type: FETCH_COIN_BY_ID_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/coins/${coinId}`);
      dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: response.data });
      console.log("coin by id",response.data)
    } catch (error) {
      console.log("error",error)
      dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.message });
    }
  };
  
  export const fetchCoinDetails = ({coinId,jwt}) => async (dispatch) => {
    dispatch({ type: FETCH_COIN_DETAILS_REQUEST });
    try {
      const response = await api.get(`/coins/details/${coinId}`,{
        headers:{
          Authorization: `Bearer ${jwt}`
        }
      });
      dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: response.data });
      console.log("coin details", response.data)
    } catch (error) {
      console.log("error",error)
      dispatch({ type: FETCH_COIN_DETAILS_FAILURE, payload: error.message });
    }
  };

  export const searchCoin = (keyword) => async (dispatch) => {
    dispatch({ type: SEARCH_COIN_REQUEST });
    try {
      const response = await api.get(`/coins/search?q=${keyword}`);
      dispatch({ type: SEARCH_COIN_SUCCESS, payload: response.data });
      console.log("search coin",response.data)
    } catch (error) {
      console.log("error",error)
      dispatch({ type: SEARCH_COIN_FAILURE, payload: error.message });
    }
  };