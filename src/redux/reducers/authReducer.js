import { LOGOUT, LOGIN, AUTH_SET_ERROR, AUTH_TOGGLE_LOADING } from "../actions";
import { authApi } from "../api/authApi";

let initialState = {
  token: null,
  userId: null,
  email: null,
  isAuth: false,
  message: null,
  error: null,
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const { token, userId, email, message } = action.payload;
      return { ...state, token, userId, email, message, isAuth: true };
    case LOGOUT:
      return { ...initialState };
    case AUTH_SET_ERROR:
      return { ...state, error: action.payload };
    case AUTH_TOGGLE_LOADING:
      return { ...state, isLoading: !state.isLoading };
    default:
      return state;
  }
};

const toggleIsLoading = () => {
  return {
    type: AUTH_TOGGLE_LOADING,
  };
};
export const setAuth = (email, userId, token, message = "") => {
  return {
    type: LOGIN,
    payload: { email, userId, token, message },
  };
};

export const unsetAuth = () => {
  return {
    type: LOGOUT,
  };
};

export const setError = (err) => {
  return {
    type: AUTH_SET_ERROR,
    payload: err,
  };
};

export const logout = () => {
  return async(dispatch) => {
    try {
     await authApi.logout();
     localStorage.removeItem("jwtToken");
     dispatch(unsetAuth());
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        dispatch(setError(e.response.data.message));
      } else if (e.message) {
        dispatch(setError(e.message));
      } else {
        dispatch(setError(e));
      }
    }
  }
}

export const oAuthLogin = () => {
  return async (dispatch) => {
    dispatch(toggleIsLoading());
    try {
      const data = await authApi.oAuthLogin();
      localStorage.setItem("jwtToken", data.token);
      dispatch(
        setAuth(
          data.email,
          data.userId,
          data.token,
          "Вы успешно вошли в систему"
        )
      );
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        dispatch(setError(e.response.data.message));
      } else if (e.message) {
        dispatch(setError(e.message));
      } else {
        dispatch(setError(e));
      }
    }
    dispatch(toggleIsLoading());
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const data = await authApi.login(email, password);
      localStorage.setItem("jwtToken", data.token);
      dispatch(
        setAuth(email, data.userId, data.token, "Вы успешно вошли в систему")
      );
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        dispatch(setError(e.response.data.message));
      } else if (e.message) {
        dispatch(setError(e.message));
      } else {
        dispatch(setError(e));
      }
    }
  };
};

export const register = (email, password) => {
  return async (dispatch) => {
    dispatch(setError(""));
    try {
      const data = await authApi.register(email, password);
      if (data.status === 201) {
        dispatch(login(email, password));
      }
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        dispatch(setError(e.response.data.message));
      } else {
        dispatch(setError(e.message));
      }
    }
  };
};
