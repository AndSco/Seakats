import React, { useEffect, useCallback } from "react";
import { ActivityIndicator, AsyncStorage, StyleSheet } from "react-native";
import ScreenView from "../wrapperComponents/ScreenView";
import Colors from "../../constants/colors";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/actions/auth";
import axios from "axios";
import apiURL from "../../assets/apiUrl";

const StartupScreen = props => {
  const dispatch = useDispatch();

  // Clear up database from stale long overdue sessions
  const killOverDueSessions = useCallback(async () => {
    try {
      const response = await axios.get(`${apiURL}/api/session/killLongOverdue`);
      const resData = response.data;
      console.log(resData);
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    const tryLogin = async () => {
      const userDataInStorage = await AsyncStorage.getItem("userData");

      if (!userDataInStorage) {
        props.navigation.navigate("Login");
        return;
      }

      const parsedData = await JSON.parse(userDataInStorage);
      const {
        token,
        userId,
        expiryTimeStamp,
        username,
        email,
        mobile,
        profilePic,
        nextOfKinName,
        nextOfKinNumber,
        trips
      } = parsedData;

      if (expiryTimeStamp <= new Date().getTime() || !token || !userId) {
        props.navigation.navigate("Login");
        return;
      }

      const timeLeftToExpiration = expiryTimeStamp - new Date().getTime();
      dispatch(
        authenticate(
          userId,
          token,
          timeLeftToExpiration,
          username,
          email,
          mobile,
          profilePic,
          nextOfKinName,
          nextOfKinNumber,
          trips
        )
      );
      props.navigation.navigate("Landing");
    };

    tryLogin();
    killOverDueSessions();
  }, [dispatch]);

  return (
    <ScreenView>
      <ActivityIndicator size="large" color={Colors.primary} />
    </ScreenView>
  );
};

export default StartupScreen;
