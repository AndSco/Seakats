import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";
import HighlightUnderline from "../wrapperComponents/HighlightUnderline";
import Highlight from "./Highlight";
import { useSelector } from "react-redux";
import { findMostRecurringItemInArray } from "../../functions/utils";
import {
  getAverageTimeOfDay,
  calculateWindAverage,
  calculateAverageSeason
} from "../../functions/tripsPageFunctions";
import AverageMeasurer from "./AverageMeasurer";

const StatsPage = props => {
  const myTrips = useSelector(store => store.auth.currentUser.trips);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20
      }}
    >
      <HighlightUnderline
        style={{
          borderBottomColor: Colors.secondary,
          alignSelf: "center",
          width: Dimensions.get("window").width * 0.9
        }}
      >
        <Text style={{ ...TextStyles.boldTitle, ...TextStyles.sectionHeader }}>
          stats
        </Text>
      </HighlightUnderline>
      <View style={styles.highlightContainer}>
        <Highlight label="No. of trips" value={myTrips.length} />
        <Highlight
          label="Tot. NM"
          value={
            myTrips && myTrips.length > 1
              ? myTrips
                  .map(trip => trip.distancePaddled)
                  .reduce((acc, curr) => acc + curr)
                  .toFixed(0)
              : myTrips && myTrips.length === 1
              ? myTrips[0].distancePaddled
              : 0
          }
        />
      </View>

      <View style={styles.highlightContainer}>
        <Highlight
          label="Avg. wind force"
          value={
            myTrips && myTrips.length > 1 ? calculateWindAverage(myTrips) : "NA"
          }
        />
        <Highlight
          label="Tot. hours"
          value={
            myTrips && myTrips.length > 1
              ? myTrips
                  .map(trip => trip.hoursPaddled)
                  .reduce((acc, curr) => acc + curr)
                  .toFixed(0)
              : myTrips && myTrips.length === 1
              ? myTrips[0].hoursPaddled
              : 0
          }
        />
      </View>

      <View style={styles.highlightContainer}>
        <Highlight
          label="Main departure"
          textStyle={{ fontSize: 20 }}
          value={
            myTrips && myTrips.length > 1
              ? findMostRecurringItemInArray(
                  myTrips.map(trip => trip.from)
                ).toUpperCase()
              : "NA"
          }
        />
        <Highlight
          label="Main destination"
          textStyle={{ fontSize: 20 }}
          value={
            myTrips && myTrips.length > 1
              ? findMostRecurringItemInArray(
                  myTrips.map(trip => trip.to)
                ).toUpperCase()
              : "NA"
          }
        />
      </View>

      <View style={styles.measurerContainer}>
        <AverageMeasurer
          averageValue={getAverageTimeOfDay(myTrips) * 10}
          label="Average time of the day"
          iconLeftCategory="feather"
          iconLeft="sun"
          iconRightCategory="feather"
          iconRight="moon"
        />

        <AverageMeasurer
          averageValue={calculateAverageSeason(myTrips)}
          label="Average time of the year"
          iconLeftCategory="fontAwesome"
          iconLeft="snowflake-o"
          iconRightCategory="materialIcons"
          iconRight="beach-access"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  highlightContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30
  },
  measurerContainer: {
    marginTop: 40
  }
});

StatsPage.navigationOptions = navData => {
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

export default StatsPage;
