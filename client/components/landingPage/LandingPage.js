import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import ScreenView from "../wrapperComponents/ScreenView";
import BoxItem from "./BoxItem";
import TextStyles from "../../constants/textStyles";
import Colors from "../../constants/colors";
import HighlightUnderline from "../wrapperComponents/HighlightUnderline";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { getNumberOfOpenSessions } from "../../store/actions/session";
import NavigationConsciousWrapper from "../wrapperComponents/NavigationConsciousWrapper";

const LandingPage = props => {
  const username = useSelector(state => state.auth.currentUser.username);
  const dispatch = useDispatch();
  const [numberOfOpenSessions, setNumberOfOpenSessions] = useState(0);

  const makeBadge = useCallback(async () => {
    const openSessions = await getNumberOfOpenSessions();
    setNumberOfOpenSessions(openSessions);
  }, [getNumberOfOpenSessions]);

  const user = useSelector(state => state.auth.currentUser);

  return (
    <View style={{ paddingVertical: 30, alignItems: "center" }}>
      <NavigationConsciousWrapper onFocusFunction={makeBadge}>
        <ScrollView>
          <HighlightUnderline style={{ width: "80%", alignSelf: "center" }}>
            <Text style={{ ...TextStyles.bodyHeading }}>Hello {username}!</Text>
          </HighlightUnderline>
          <View style={styles.boxContainer}>
            <BoxItem
              title="PLANNER"
              iconType="materialCommunity"
              iconName="waves"
              bgroundColor={Colors.primary}
              function={() =>
                props.navigation.navigate({ routeName: "PaddlePlanner" })
              }
            />
            <BoxItem
              title="PROFILE"
              iconType="fontAwesome"
              iconName="user"
              bgroundColor={Colors.secondary}
              function={() => props.navigation.navigate("Profile")}
            />
            <BoxItem
              title="TRIPS"
              iconType="fontAwesome"
              iconName="map"
              bgroundColor={Colors.tertiary}
              function={() => props.navigation.navigate("Trips")}
            />
            <BoxItem
              title="INFO & TOOLS"
              iconType="fontAwesome"
              iconName="info-circle"
              bgroundColor={Colors.fourthiary}
              function={() => props.navigation.navigate("Useful Info & Tools")}
            />
            <BoxItem
              title={`ALERTS`}
              iconType="materialCommunity"
              iconName="message-alert-outline"
              bgroundColor={Colors.primary}
              function={() =>
                props.navigation.navigate({ routeName: "Alerts" })
              }
              needsBadge={true}
              badgeNumber={numberOfOpenSessions}
            />
            <BoxItem
              title="LOGBOOK"
              iconType="materialCommunity"
              iconName="book-open"
              bgroundColor={Colors.secondary}
              function={() =>
                props.navigation.navigate({ routeName: "Logbook" })
              }
            />
            <BoxItem
              title="WEATHER"
              iconType="materialCommunity"
              iconName="weather-lightning-rainy"
              bgroundColor={Colors.tertiary}
              function={() =>
                props.navigation.navigate({ routeName: "Weather" })
              }
            />
            <BoxItem
              title="LOG OUT"
              iconType="materialCommunity"
              iconName="exit-to-app"
              bgroundColor={Colors.fifthiary}
              function={() => dispatch(logout())}
            />
          </View>
        </ScrollView>
      </NavigationConsciousWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "center",
    marginTop: 20
  }
});

export default LandingPage;
