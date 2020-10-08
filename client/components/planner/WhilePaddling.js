import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, AppState } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HighlightUnderline from "../wrapperComponents/HighlightUnderline";
import TextStyles from "../../constants/textStyles";
import ScreenView from "../wrapperComponents/ScreenView";
import SubmitButton from "../wrapperComponents/SubmitButton";
import Colors from "../../constants/colors";
import axios from "axios";
import { stringifyDate, checkIfTooLate } from "../../functions/timeFormatting";
import CustomModal from "../UIComponents/Modal";
import ModalInput from "../UIComponents/ModalInput";
import { editSession } from "../../store/actions/session";
import LocationPicker from "../locationPicker/LocationPicker";
import apiURL from "../../assets/apiUrl";
import NavigationConsciousWrapper from "../wrapperComponents/NavigationConsciousWrapper";

const WhilePaddling = props => {
  const openSession = useSelector(store => store.session);
  const userId = useSelector(store => store.auth.userId);
  const [isAddingMinutes, setIsAddingMinutes] = useState(false);
  const [extraMinutes, setExtraMinutes] = useState(null);
  const dispatch = useDispatch();

  console.log("OPEN SESSION", openSession);

  // Manage message when coming back from background - if too late, change message
  const [appState, setAppState] = useState(AppState.currentState);

  const [isTooLate, setIsTooLate] = useState(null);

  const handleAppStateChange = useCallback(
    nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        console.log("App has come to the foreground!");
        if (checkIfTooLate(openSession.arrivalTimeStamp)) {
          console.log("TOO LATE");
          setIsTooLate(true);
        } else {
          console.log("there is still time");
          setIsTooLate(false);
        }
      }
      setAppState(nextAppState);
    },
    [appState]
  );

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return function cleanup() {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, [handleAppStateChange]);

  useEffect(() => console.log(appState), [appState]);

  const solveAlert = async sessionId => {
    try {
      const response = await axios.post(
        `${apiURL}/api/session/alerts/${sessionId}`
      );
      const resData = response.data;
      console.log(resData);
    } catch (err) {
      throw err;
    }
  };

  const notifyYouAreBack = async userId => {
    try {
      await solveAlert(openSession._id);
      const response = await axios.post(
        `${apiURL}/api/pushNotifications/${userId}/allIsOk`
      );
      const resData = response.data;
      console.log(resData);
    } catch (err) {
      throw err;
    }
  };

  const killSessionOnServer = async () => {
    try {
      await axios.delete(`${apiURL}/api/session/${openSession._id}`);
      await props.onManageProgress("forward");
    } catch (err) {
      throw err;
    }
  };

  return (
    <ScreenView style={{ justifyContent: "space-around" }}>
      <NavigationConsciousWrapper
        onFocusFunction={() =>
          setIsTooLate(checkIfTooLate(openSession.arrivalTimeStamp))
        }
      >
        <CustomModal
          isVisible={isAddingMinutes}
          isClosable={true}
          closeModalFuntion={() => setIsAddingMinutes(false)}
        >
          <ModalInput
            title="Add extra time in minutes"
            stateFunction={setExtraMinutes}
            buttonTitle="ADD MINUTES"
            placeholder="0"
            modalClosingFunction={() => {
              dispatch(
                editSession(openSession._id, { extraMins: +extraMinutes })
              );
              setIsAddingMinutes(false);
            }}
          />
        </CustomModal>

        <Image
          source={require("../../assets/images/bowl1.png")}
          style={styles.image}
        />
        <View style={styles.content}>
          <HighlightUnderline>
            <Text style={{ ...TextStyles.boldTitle, textAlign: "center" }}>
              {isTooLate
                ? "Time is up!".toUpperCase()
                : "Enjoy the paddle!".toUpperCase()}
            </Text>
          </HighlightUnderline>
          <Text
            style={{
              ...TextStyles.boldTitle,
              textAlign: "center",
              fontSize: 22,
              lineHeight: 26,
              color: Colors.secondary
            }}
          >
            {isTooLate
              ? `An alert has been sent at ${stringifyDate(
                  openSession.arrivalTimeStamp
                ).slice(7)}`
              : `Your ETA is ${stringifyDate(
                  openSession.arrivalTimeStamp
                ).slice(7)}`}
          </Text>
          <View>
            {!isTooLate ? (
              <SubmitButton
                title="I'M LATE, ADD MORE TIME"
                style={{ ...styles.button, backgroundColor: Colors.darkest }}
                function={() => {
                  setIsAddingMinutes(current => !current);
                }}
              />
            ) : (
              <SubmitButton
                title="NOTIFY YOU'RE OK"
                style={{ ...styles.button, backgroundColor: Colors.darkest }}
                function={() => {
                  notifyYouAreBack(userId);
                }}
              />
            )}

            <SubmitButton
              title={
                !isTooLate ? "I'M BACK, CHECK ME OUT" : "SAVE TO YOUR TRIPS"
              }
              style={styles.button}
              function={killSessionOnServer}
            />
          </View>
        </View>
      </NavigationConsciousWrapper>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 120,
    marginTop: 30,
    marginBottom: 15,
    alignSelf: "center"
  },
  button: {
    width: 280,
    height: 50,
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: 80
  },
  minutesInput: {
    fontSize: 50,
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 10,
    borderColor: Colors.secondary,
    backgroundColor: Colors.textLightestGrey,
    color: Colors.textDarkGrey,
    alignSelf: "center",
    textAlign: "center"
  }
});

export default WhilePaddling;
