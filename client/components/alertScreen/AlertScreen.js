import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";
import axios from "axios";
import HighlightUnderline from "../wrapperComponents/HighlightUnderline";
import TextStyles from "../../constants/textStyles";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "../UIComponents/Spinner";
import SessionCard from "../UIComponents/SessionCard";
import SadOrHappyMessage from "../UIComponents/SadOrHappyMessage";
import OverlayButton from "../UIComponents/OverlayButton";
import apiURL from "../../assets/apiUrl";
import NavigationConsciousWrapper from "../wrapperComponents/NavigationConsciousWrapper";

const AlertScreen = () => {
  const [sessionToAlert, setSessionToAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSessionToAlert = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiURL}/api/session/alerts`);
      const sessionToAlert = await response.data;
      setSessionToAlert(sessionToAlert);
      setIsLoading(false);
    } catch (err) {
      throw err;
    }
  }, []);

  const solveSession = async sessionId => {
    try {
      const response = await axios.post(
        `${apiURL}/api/session/alerts/${sessionId}`
      );
      console.log("Solved session", response.data);
      await getSessionToAlert();
    } catch (err) {
      throw err;
    }
  };

  const solveAllSessions = async () => {
    try {
      const response = await axios.patch(`${apiURL}/api/session/alerts/`);
      console.log("Solved sessions?", response.data);
      await getSessionToAlert();
    } catch (err) {
      throw err;
    }
  };

  const renderSession = session => {
    return (
      <SessionCard
        session={session}
        isAlert={true}
        solveSession={solveSession}
      />
    );
  };

  if (isLoading) {
    return <Spinner style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.screen}>
      {/* to trigger events on navigation */}
      <NavigationConsciousWrapper onFocusFunction={getSessionToAlert}>
        {sessionToAlert && sessionToAlert.length > 0 ? (
          <View style={{ alignItems: "center" }}>
            <HighlightUnderline style={{ width: "80%" }}>
              <Text style={{ ...TextStyles.boldTitle }}>
                Who didn't check out?
              </Text>
            </HighlightUnderline>
            <View style={{ marginTop: 30 }}>
              <FlatList
                data={sessionToAlert.sort(
                  (a, b) => a.arrivalTimeStamp < b.arrivalTimeStamp
                )}
                renderItem={({ item }) => renderSession(item)}
                keyExtractor={item => item._id}
                style={styles.listContainer}
                onRefresh={getSessionToAlert}
                refreshing={isLoading}
              />
            </View>
            <OverlayButton
              function={solveAllSessions}
              taskDescription={"Clear all the alerts?"}
              containerStyle={{ position: "absolute", bottom: 85, left: 30 }}
            />
          </View>
        ) : (
          <View style={styles.noAlertsContainer}>
            <SadOrHappyMessage
              mainMessage="No alerts."
              restOfMessage="Everyone is safe!"
              happy
            />
          </View>
        )}
      </NavigationConsciousWrapper>
    </View>
  );
};

AlertScreen.navigationOptions = navData => {
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

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    alignItems: "center"
  },
  listContainer: {
    marginBottom: 80,
    width: Dimensions.get("window").width
  },
  noAlertsContainer: {
    marginVertical: 40,
    alignItems: "center"
  },
  refreshButton: {
    // marginBottom: 40,
    color: Colors.primary
  }
});

export default AlertScreen;
