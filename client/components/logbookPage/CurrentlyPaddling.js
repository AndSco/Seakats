import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Platform, FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import Spinner from "../UIComponents/Spinner";
import axios from "axios";
import SessionCard from "../UIComponents/SessionCard";
import SadOrHappyMessage from "../UIComponents/SadOrHappyMessage";
import apiURL from "../../assets/apiUrl";
import NavigationConsciousWrapper from "../wrapperComponents/NavigationConsciousWrapper";
import ScreenView from "../wrapperComponents/ScreenView";

const CurrentlyPaddling = () => {
  const [paddlingNow, setPaddlingNow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getOpenPaddles = useCallback(async () => {
    try {
      console.log("trying to fetch");
      setIsLoading(true);
      const response = await axios.get(`${apiURL}/api/session/currentlyOpen`);
      const openPaddles = await response.data;
      setPaddlingNow(openPaddles);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  }, []);

  const output = isLoading ? (
    <Spinner />
  ) : !paddlingNow || paddlingNow.length === 0 ? (
    <SadOrHappyMessage
      mainMessage="No one is paddling now..."
      restOfMessage="Try again later or organise a paddle yourself"
      sad
    />
  ) : (
    <FlatList
      data={paddlingNow}
      keyExtractor={item => item._id}
      renderItem={paddle => <SessionCard session={paddle.item} />}
      style={styles.flatList}
    />
  );

  console.log("Output ", output);

  return (
    <ScreenView>
      <NavigationConsciousWrapper onFocusFunction={getOpenPaddles}>
        {output}
      </NavigationConsciousWrapper>
    </ScreenView>
  );
};

CurrentlyPaddling.navigationOptions = navData => {
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
  noPaddlers: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 30
  },
  flatList: {
    width: Dimensions.get("window").width,
    marginTop: 30
  }
});

export default CurrentlyPaddling;
