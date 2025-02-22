import axios from "axios";
import * as actionTypes from "./ActionTypes";
import api, { API_BASE_URL } from "@/Api/api";

// REGISTER
export const register = (userData) => async (dispatch) => {
  dispatch({ type: actionTypes.REGISTER_REQUEST });
  console.log(`${API_BASE_URL}/api/auth/register`,userData)
  try {
    const obj = {"Mobile":"7391939393","Status":"pendings","Picture":"http://","TwoFactorAuthSendTo":"null",...userData};
    console.log(obj);
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, obj, {
      headers: { "Content-Type": "application/json" },
      //withCredentials: true, // ✅ Important for CORS with credentials
    });
    console.log(response.data);

    const user = response.data;
    if (user.jwt) localStorage.setItem("jwt", user.jwt);
    
    console.log("register:", user);
    
    // Navigate to login page after successful registration
    userData.navigate("/signin");

    dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: user.jwt });
  } catch (error) {
    console.log("error ", error);
    dispatch({
      type: actionTypes.REGISTER_FAILURE,
      payload: error.response?.data ? error.response.data : error,
    });
  }
};

// LOGIN
// export const login = (userData) => async (dispatch) => {
//   dispatch({ type: actionTypes.LOGIN_REQUEST });
//   try {
//     // Use /api/auth/login endpoint
//     const obj = {"Mobile":"7391939393","Status":"pendings","Picture":"http://","TwoFactorAuthSendTo":"null","FullName":"kunal",...userData};
//     console.log(obj);
//     const response = await axios.post(`${API_BASE_URL}/api/auth/login`, obj);
//     const user = response.data;
//     console.log(user);
//     if (user.twoFactorAuthEnabled) {
//       userData.navigate(`/two-factor-auth/${user.session}`);
//     }
//     if (user.jwt) {
//       localStorage.setItem("jwt", user.jwt);
//       console.log("login:", user);
//       userData.navigate("/portfolio");
//     }
//     userData.navigate("/");//home
//     dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: user.jwt });
//   } catch (error) {
//     console.log("catch error", error);
//     dispatch({
//       type: actionTypes.LOGIN_FAILURE,
//       payload: error.response?.data ? error.response.data : error,
//     });
//   }
// };

export const login = (userData) => async (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_REQUEST });
  try {
    const obj = {
      "Mobile": "7391939393",
      "Status": "pending",
      "Picture": "http://",
      "TwoFactorAuthSendTo": "null",
      "FullName": "kunal",
      ...userData
    };
    
    console.log(obj);
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, obj);
    const { token, role } = response.data;
    
    console.log(response.data);
    
    if (token) {
      localStorage.setItem("jwt", token);
      localStorage.setItem("role", role); // Store role in localStorage
      
      console.log("login:", response.data);
      
      if (role === "Admin") {
        userData.navigate("/admindashboard"); // Navigate to Admin Panel
      } else {
        userData.navigate("/portfolio"); // Navigate to User Panel
      }
    }
    
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: token });
  } catch (error) {
    console.log("catch error", error);
    dispatch({
      type: actionTypes.LOGIN_FAILURE,
      payload: error.response?.data ? error.response.data : error,
    });
  }
};


 
// TWO-STEP VERIFICATION
export const twoStepVerification =
  ({ otp, session, navigate }) =>
  async (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_TWO_STEP_REQUEST });
    try {
      // Use /api/auth/two-factor/otp/{otp} endpoint with session as a query param
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/two-factor/otp/${otp}`,
        {},
        {
          params: { id: session },
        }
      );
      const user = response.data;
      if (user.jwt) {
        localStorage.setItem("jwt", user.jwt);
        console.log("two-step login:", user);
        navigate("/");
      }
      dispatch({ type: actionTypes.LOGIN_TWO_STEP_SUCCESS, payload: user.jwt });
    } catch (error) {
      console.log("catch error", error);
      dispatch({
        type: actionTypes.LOGIN_TWO_STEP_FAILURE,
        payload: error.response?.data ? error.response.data : error,
      });
    }
  };

// GET USER PROFILE
// export const getUser = (token) => {
//   console.log(token)
//   return async (dispatch) => {
//     dispatch({ type: actionTypes.GET_USER_REQUEST });
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//       const user = response.data;
//       dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: user });
//       console.log("fetched user:", user);
//     } catch (error) {
//       const errorMessage = error.response?.data || "Error fetching user";
//       dispatch({ type: actionTypes.GET_USER_FAILURE, payload: errorMessage });
//     }
//   };
// };
export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data; // Ensure response includes username, id, fullName, mobile, role

      dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: user });

      console.log("Fetched User:", user);
    } catch (error) {
      const errorMessage = error.response?.data || "Error fetching user";
      dispatch({ type: actionTypes.GET_USER_FAILURE, payload: errorMessage });
    }
  };
};



// SEND VERIFICATION OTP
export const sendVerificationOtp = ({ jwt, verificationType }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SEND_VERIFICATION_OTP_REQUEST });
    try {
      // Send an empty object as data; headers go in the config
      const response = await api.post(
        `/api/users/verification/${verificationType}/send-otp`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const data = response.data;
      dispatch({
        type: actionTypes.SEND_VERIFICATION_OTP_SUCCESS,
        payload: data,
      });
      console.log("OTP sent:", data);
    } catch (error) {
      console.log("error:", error);
      const errorMessage = error.response?.data || error.message;
      dispatch({
        type: actionTypes.SEND_VERIFICATION_OTP_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

// VERIFY OTP
export const verifyOtp = ({ jwt, otp }) => {
  console.log("jwt:", jwt);
  return async (dispatch) => {
    dispatch({ type: actionTypes.VERIFY_OTP_REQUEST });
    try {
      // PATCH request with empty object as body and headers in config
      const response = await api.patch(
        `/api/users/verification/verify-otp/${otp}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const data = response.data;
      dispatch({ type: actionTypes.VERIFY_OTP_SUCCESS, payload: data });
      console.log("OTP verified:", data);
    } catch (error) {
      console.log("error:", error);
      const errorMessage = error.response?.data || error.message;
      dispatch({ type: actionTypes.VERIFY_OTP_FAILURE, payload: errorMessage });
    }
  };
};

// ENABLE TWO-FACTOR AUTHENTICATION
export const enableTwoStepAuthentication = ({ jwt, otp }) => {
  console.log("jwt:", jwt);
  return async (dispatch) => {
    dispatch({ type: actionTypes.ENABLE_TWO_STEP_AUTHENTICATION_REQUEST });
    try {
      // PATCH request with empty object as body
      const response = await api.patch(
        `/api/users/enable-two-factor/verify-otp/${otp}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const data = response.data;
      dispatch({
        type: actionTypes.ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS,
        payload: data,
      });
      console.log("Two-step authentication enabled:", data);
    } catch (error) {
      console.log("error:", error);
      const errorMessage = error.response?.data || error.message;
      dispatch({
        type: actionTypes.ENABLE_TWO_STEP_AUTHENTICATION_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

// SEND RESET PASSWORD OTP
export const sendResetPassowrdOTP = ({ sendTo, verificationType, navigate }) => {
  console.log("Sending OTP to:", sendTo);
  return async (dispatch) => {
    dispatch({ type: actionTypes.SEND_RESET_PASSWORD_OTP_REQUEST });
    try {
      // Assuming endpoint is /api/auth/reset-password/send-otp
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/reset-password/send-otp`,
        {
          sendTo,
          verificationType,
        }
      );
      const data = response.data;
      navigate(`/reset-password/${data.session}`);
      dispatch({
        type: actionTypes.SEND_RESET_PASSWORD_OTP_SUCCESS,
        payload: data,
      });
      console.log("OTP for reset sent successfully:", data);
    } catch (error) {
      console.log("error:", error);
      const errorMessage = error.response?.data || error.message;
      dispatch({
        type: actionTypes.SEND_RESET_PASSWORD_OTP_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

// VERIFY RESET PASSWORD OTP
export const verifyResetPassowrdOTP = ({ otp, password, session, navigate }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.VERIFY_RESET_PASSWORD_OTP_REQUEST });
    try {
      // Assuming endpoint is /api/auth/reset-password/verify-otp
      const response = await axios.patch(
        `${API_BASE_URL}/api/auth/reset-password/verify-otp`,
        { otp, password },
        {
          params: { id: session },
        }
      );
      const data = response.data;
      dispatch({
        type: actionTypes.VERIFY_RESET_PASSWORD_OTP_SUCCESS,
        payload: data,
      });
      navigate("/password-update-successfully");
      console.log("Reset OTP verified successfully:", data);
    } catch (error) {
      console.log("error:", error);
      const errorMessage = error.response?.data || error.message;
      dispatch({
        type: actionTypes.VERIFY_RESET_PASSWORD_OTP_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

// LOGOUT
// export const logout = () => {
//   return async (dispatch) => {
//     dispatch({ type: actionTypes.LOGOUT });
//     localStorage.clear();
//   };
// };

export const logout = (navigate) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT });
    localStorage.clear();
    navigate("/signin"); // Redirect to signin page
  };
};