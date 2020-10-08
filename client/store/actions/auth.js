import { AsyncStorage } from "react-native";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER = "UPDATE_USER";
import registerForPushNotificationsAsync from "./notifications";
import apiURL from "../../assets/apiUrl";

let timer = null;

export const authenticate = (
  userId,
  token,
  expiryTime,
  username,
  email,
  mobile,
  profilePic,
  nextOfKinName,
  nextOfKinNumber,
  trips
) => {
  return async dispatch => {
    try {
      dispatch(setLogoutTimer(expiryTime));
      dispatch({
        type: AUTHENTICATE,
        userId: userId,
        token: token,
        username,
        email,
        mobile,
        profilePic,
        nextOfKinName,
        nextOfKinNumber,
        trips
      });
    } catch (err) {
      throw err;
    }
  };
};

export const login = (username, password) => {
  return async dispatch => {
    try {
      const response = await fetch(`${apiURL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (!response.ok) {
        const errorsMessage = await response.json();
        // This is the structure of the error to throw, coming from the app.js of the server
        throw new Error(errorsMessage.error.message);
      }

      const resData = await response.json();
      console.log("LOGIN RESPONSE", resData);

      const {
        _id: userId,
        token,
        expiryTimeStamp,
        email,
        mobile,
        profilePic,
        nextOfKinName,
        nextOfKinNumber,
        trips
      } = resData;
      saveDataToStorage(
        userId,
        token,
        expiryTimeStamp,
        username,
        email,
        mobile,
        profilePic,
        nextOfKinName,
        nextOfKinNumber,
        trips
      );

      const timeToExpiration = expiryTimeStamp - new Date().getTime();
      dispatch(
        authenticate(
          userId,
          token,
          timeToExpiration,
          username,
          email,
          mobile,
          profilePic,
          nextOfKinName,
          nextOfKinNumber,
          trips
        )
      );
    } catch (err) {
      throw err;
    }
  };
};

export const signup = userData => {
  return async dispatch => {
    try {
      const pushNotificationToken = await registerForPushNotificationsAsync();
      userData.subscription = pushNotificationToken;
      const response = await fetch(`${apiURL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorsMessage = await response.json();
        // This is the structure of the error to throw, coming from the app.js of the server
        throw new Error(errorsMessage.error.message);
      }

      const resData = await response.json();
      const {
        _id: userId,
        token,
        expiryTimeStamp,
        username,
        email,
        mobile,
        profilePic,
        nextOfKinName,
        nextOfKinNumber
      } = resData;

      saveDataToStorage(
        userId,
        token,
        expiryTimeStamp,
        username,
        email,
        mobile,
        profilePic,
        nextOfKinName,
        nextOfKinNumber
      );

      const timeToExpiration = expiryTimeStamp - new Date().getTime();

      dispatch(
        authenticate(
          userId,
          token,
          timeToExpiration,
          username,
          email,
          mobile,
          profilePic,
          nextOfKinName,
          nextOfKinNumber
        )
      );
    } catch (err) {
      throw err;
    }
  };
};

const updateDataInLocalStorage = async updatedData => {
  try {
    const userDataInStorage = await AsyncStorage.getItem("userData");
    const updatedDataForStorage = {
      ...JSON.parse(userDataInStorage),
      ...updatedData
    };
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify(updatedDataForStorage)
    );
  } catch (err) {
    throw err;
  }
};

export const updateUser = (userId, updatedUserData) => {
  return async dispatch => {
    try {
      const response = await fetch(`${apiURL}/api/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUserData)
      });

      if (!response.ok) {
        const errorsMessage = await response.json();
        // This is the structure of the error to throw, coming from the app.js of the server
        throw new Error(errorsMessage.error.message);
      }

      const resData = await response.json();

      // updated info in storage!
      await updateDataInLocalStorage(updatedUserData);
      // updateUserInStore(updatedUserData);

      await dispatch({
        type: UPDATE_USER,
        updatedUser: updatedUserData
      });
    } catch (err) {
      throw err;
    }
  };
};

export const refreshUser = userId => {
  return async dispatch => {
    try {
      const response = await fetch(`${apiURL}/api/user/${userId}`);
      const userData = await response.json();
      // console.log("updatedUser", userData);

      await updateDataInLocalStorage(userData);

      await dispatch({
        type: UPDATE_USER,
        updatedUser: userData
      });
    } catch (err) {
      throw err;
    }
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (
  userId,
  token,
  expiryTimeStamp,
  username,
  email,
  mobile,
  profilePic,
  nextOfKinName,
  nextOfKinNumber,
  trips
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userId: userId,
      token: token,
      expiryTimeStamp: expiryTimeStamp,
      username,
      email,
      mobile,
      profilePic,
      nextOfKinName,
      nextOfKinNumber,
      trips
    })
  );
};
