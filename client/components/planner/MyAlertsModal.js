import React, { useCallback, useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import CustomModal from "../UIComponents/Modal";
import Spinner from "../UIComponents/Spinner";
import axios from "axios";
import apiURL from "../../assets/apiUrl";
import { useSelector } from "react-redux";
import SessionCard from "../UIComponents/SessionCard";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";

const MyAlertsModal = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [myOpenAlerts, setMyOpenAlerts] = useState();

  const userId = useSelector(store => store.auth.userId);
  console.log("ID", userId);

  const solveMySession = async sessionId => {
    try {
      const response = await axios.post(
        `${apiURL}/api/session/alerts/${sessionId}`
      );
      console.log("Solved session", response.data);
    } catch (err) {
      throw err;
    }
  };

  const getMyOpenAlerts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiURL}/api/session/alerts`);
      const allSessions = await response.data;
      const mySessions = allSessions.filter(
        session => session.userId._id === userId
      );
      setMyOpenAlerts(mySessions);
      setIsLoading(false);
    } catch (err) {
      throw err;
    }
  }, []);

  const renderSession = session => {
    return (
      <SessionCard
        session={session}
        isAlert={true}
        cardStyle={{ width: Dimensions.get("window").width * 0.8 }}
        solveSession={solveMySession}
        closeMyAlertsModal={props.closeModal}
      />
    );
  };

  useEffect(() => {
    getMyOpenAlerts();
  }, [getMyOpenAlerts]);

  useEffect(() => {
    console.log("Alerts gathered", myOpenAlerts);
  }, [myOpenAlerts]);

  return (
    <CustomModal isClosable={true} closeModalFuntion={props.closeModal}>
      <View style={styles.container}>
        <Text
          style={{
            ...TextStyles.bodyHeading,
            color: "white",
            marginBottom: 30
          }}
        >
          My open alerts
        </Text>
        {isLoading && <Spinner />}

        {myOpenAlerts && (
          <FlatList
            data={myOpenAlerts}
            renderItem={alert => renderSession(alert.item)}
            keyExtractor={item => item._id}
            style={styles.alertsContainer}
          />
        )}
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tertiary,
    zIndex: -1,
    paddingTop: 80
  },
  alertsContainer: {
    zIndex: -1,
    width: Dimensions.get("window").width
  }
});

export default MyAlertsModal;
