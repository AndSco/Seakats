import React, { useState, useReducer, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Platform, Alert } from "react-native";
import ScreenView from "../wrapperComponents/ScreenView";
import PlannerInput from "./PlannerInput";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import WhilePaddling from "./WhilePaddling";
import AfterPaddling from "./AfterPaddling";
import axios from "axios";
import NavigationConsciousWrapper from "../wrapperComponents/NavigationConsciousWrapper";
import { resumeSessionInClient } from "../../store/actions/session";
import apiURL from "../../assets/apiUrl";
import { UseGetMyAlerts } from "../../functions/sessionManagement";
import MyAlertsModal from "./MyAlertsModal";

const UPDATE = "UPDATE";
const RESET = "RESET";
const RESET_DEPARTURE = "RESET_DEPARTURE";
const SET_DEPARTURE_TIME = "SET_DEPARTURE_TIME";
const SET_ARRIVAL_TIME = "SET_ARRIVAL_TIME";

const initialState = {
  inputValues: {
    departurePoint: "Club",
    destination: "",
    departureTimeStamp: new Date(),
    arrivalTimeStamp: new Date(new Date().getTime() + 60000), // 1 mins from now
    mobile: false,
    vhf: null
  },
  validities: {
    departurePoint: true,
    destination: false,
    departureTimeStamp: true,
    arrivalTimeStamp: true,
    mobile: true,
    vhf: true
  },
  isFormValid: false
};

const sessionReducer = (state, action) => {
  switch (action.type) {
    case UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      let updatedValidities = state.validities;
      if (action.validity) {
        updatedValidities = {
          ...state.validities,
          [action.input]: action.validity
        };
      }
      let updatedFormValidity = true;
      for (const key in updatedValidities) {
        updatedFormValidity = updatedFormValidity && updatedValidities[key];
      }

      return {
        ...state,
        inputValues: updatedValues,
        validities: updatedValidities,
        isFormValid: updatedFormValidity
      };

    case RESET: {
      return initialState;
    }

    case RESET_DEPARTURE: {
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          departurePoint: ""
        }
      };
    }

    case SET_DEPARTURE_TIME: {
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          departureTimeStamp: new Date()
        }
      };
    }

    case SET_ARRIVAL_TIME: {
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          arrivalTimeStamp: new Date(new Date().getTime() + 60000)
        }
      };
    }

    default:
      return state;
  }
};

const PaddlePlanner = props => {
  const [progress, setProgress] = useState(0);
  const [sessionState, sessionDispatch] = useReducer(
    sessionReducer,
    initialState
  );
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(store => store.auth.userId);

  const myAlerts = UseGetMyAlerts(userId);

  const hadleOpenAlerts = useCallback(() => {
    const numbersOfAlerts = myAlerts ? myAlerts.length : undefined;
    if (numbersOfAlerts && numbersOfAlerts > 0) {
      Alert.alert(
        `You have ${numbersOfAlerts} open alerts!`,
        "Want to clear them?",
        [
          { text: "OK", onPress: () => setIsAlertModalOpen(true) },
          { text: "Cancel" }
        ]
      );
    }
  }, [myAlerts]);

  useEffect(() => {
    hadleOpenAlerts();
  }, [hadleOpenAlerts]);

  const closeAlertsModal = () => {
    setIsAlertModalOpen(false);
  };

  const getMyOpenSessions = useCallback(async () => {
    try {
      const response = await axios.get(`${apiURL}/api/session/currentlyOpen`);
      const allOpenSessions = await response.data;
      const myOpenSessions = allOpenSessions.filter(
        session => session.userId._id === userId
      );

      if (myOpenSessions.length > 0) {
        const {
          _id,
          departurePoint,
          destination,
          departureTimeStamp,
          arrivalTimeStamp,
          mobile,
          vhf
        } = myOpenSessions[0];

        const openSessionToLoad = {
          _id,
          departurePoint,
          destination,
          departureTimeStamp,
          arrivalTimeStamp,
          mobile,
          vhf
        };

        dispatch(resumeSessionInClient(openSessionToLoad));
        setProgress(5);
      }
    } catch (err) {
      throw err;
    }
  }, []);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      sessionDispatch({
        type: UPDATE,
        input: inputIdentifier,
        value: inputValue,
        validity: inputValidity
      });
    },
    [sessionDispatch]
  );

  const manageProgress = direction => {
    if (direction === "forward") {
      setProgress(currProgress => currProgress + 1);
    } else {
      setProgress(currProgress => currProgress - 1);
    }
  };

  const resetPlanner = () => {
    setProgress(0);
    sessionDispatch({
      type: RESET
    });
  };

  const resetDeparture = () => {
    sessionDispatch({
      type: RESET_DEPARTURE
    });
  };

  const onNavigationFocus = () => {
    getMyOpenSessions();
    sessionDispatch({
      type: SET_DEPARTURE_TIME
    });
    sessionDispatch({
      type: SET_ARRIVAL_TIME
    });
  };

  return (
    <ScreenView style={{ justifyContent: "space-between", flex: 1 }}>
      {isAlertModalOpen && <MyAlertsModal closeModal={closeAlertsModal} />}
      <NavigationConsciousWrapper onFocusFunction={onNavigationFocus}>
        {progress === 0 && (
          <PlannerInput
            title="1. paddling from"
            onManageProgress={manageProgress}
            firstEntry={true}
            placeholder="enter departure point"
            imageNumber={1}
            onChangeHandler={inputChangeHandler}
            inputIdentifier="departurePoint"
            value={sessionState.inputValues.departurePoint}
            isValid={sessionState.validities.departurePoint}
            clubStart
            resetDeparture={resetDeparture}
          />
        )}

        {progress === 1 && (
          <PlannerInput
            title="2. paddling to"
            onManageProgress={manageProgress}
            placeholder="enter your destination"
            imageNumber={2}
            onChangeHandler={inputChangeHandler}
            inputIdentifier="destination"
            value={sessionState.inputValues.destination}
            isValid={sessionState.validities.destination}
          />
        )}

        {progress === 2 && (
          <PlannerInput
            title="3. time of departure"
            inputType="date"
            onManageProgress={manageProgress}
            imageNumber={3}
            onChangeHandler={inputChangeHandler}
            inputIdentifier="departureTimeStamp"
            // using prop value I had problems, hence dateValue
            dateValue={sessionState.inputValues.departureTimeStamp}
            // minimumDate={sessionState.inputValues.departureTimeStamp}
            isValid={sessionState.validities.departureTimeStamp}
          />
        )}

        {progress === 3 && (
          <PlannerInput
            title="4. time of arrival"
            inputType="date"
            onManageProgress={manageProgress}
            // lastEntry={true}
            imageNumber={4}
            onChangeHandler={inputChangeHandler}
            inputIdentifier="arrivalTimeStamp"
            dateValue={sessionState.inputValues.arrivalTimeStamp}
            minimumDate={sessionState.inputValues.arrivalTimeStamp}
            isValid={sessionState.validities.arrivalTimeStamp}
          />
        )}

        {progress === 4 && (
          <PlannerInput
            title="5. communications"
            inputType="communication"
            onManageProgress={manageProgress}
            lastEntry={true}
            imageNumber={1}
            onChangeHandler={inputChangeHandler}
            inputIdentifier={["mobile", "vhf"]}
            hasMobile={sessionState.inputValues.mobile}
            hasVhf={sessionState.inputValues.vhf}
            isValid={true}
            sessionState={sessionState}
          />
        )}

        {progress === 5 && (
          <WhilePaddling
            onManageProgress={manageProgress}
            navigation={props.navigation}
            onResetPlanner={resetPlanner}
          />
        )}
        {progress === 6 && <AfterPaddling onResetPlanner={resetPlanner} />}
      </NavigationConsciousWrapper>
    </ScreenView>
  );
};

PaddlePlanner.navigationOptions = navData => {
  return {
    headerLeft: (
      <Ionicons
        name="ios-menu"
        style={{ paddingHorizontal: 16 }}
        size={30}
        color={Platform.OS === "android" ? "white" : Colors.secondary}
        onPress={() => navData.navigation.toggleDrawer()}
      />
    )
  };
};

export default PaddlePlanner;
