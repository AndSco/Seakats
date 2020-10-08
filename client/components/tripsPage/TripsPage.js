import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import TripCard2 from "./TripCard2";
import TextStyles from "../../constants/textStyles";
import HighlightUnderline from "../wrapperComponents/HighlightUnderline";
import { refreshUser } from "../../store/actions/auth";

const TripsPage = () => {
  const myTrips = useSelector(store =>
    store.auth.currentUser.trips.sort((a, b) => b.date > a.date)
  );
  const userId = useSelector(store => store.auth.userId);
  const dispatch = useDispatch();
  const [userTrips, setUserTrips] = useState(myTrips);

  useEffect(() => {
    setUserTrips(myTrips);
  }, [myTrips]);

  const renderTripCard = trip => {
    return <TripCard2 trip={trip} refreshPage={refreshTrips} />;
  };

  const refreshTrips = async () => {
    console.log("REFRESHING");
    await dispatch(refreshUser(userId));
  };

  return (
    <View style={{ alignItems: "center", padding: 30, paddingVertical: 0 }}>
      <View style={{ alignItems: "center" }}>
        <HighlightUnderline
          style={{
            borderBottomColor: Colors.fourthiary,
            alignSelf: "center",
            width: Dimensions.get("window").width * 0.9,
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text
            style={{ ...TextStyles.boldTitle, ...TextStyles.sectionHeader }}
          >
            All my paddles
          </Text>
          <TouchableOpacity
            onPress={() =>
              setUserTrips([...userTrips].sort((a, b) => b.date > a.date))
            }
          >
            <View style={styles.sorter}>
              <Text>DATE</Text>
              <Ionicons
                name="ios-arrow-down"
                size={15}
                style={{ marginLeft: 5 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setUserTrips(
                [...userTrips].sort(
                  (a, b) => b.distancePaddled > a.distancePaddled
                )
              )
            }
          >
            <View style={styles.sorter}>
              <Text>LENGTH</Text>
              <Ionicons
                name="ios-arrow-down"
                size={15}
                style={{ marginLeft: 5 }}
              />
            </View>
          </TouchableOpacity>
        </HighlightUnderline>
        <FlatList
          data={userTrips}
          renderItem={trip => renderTripCard(trip.item)}
          keyExtractor={item => item._id}
          style={styles.flatList}
        />
      </View>
    </View>
  );
};

TripsPage.navigationOptions = navData => {
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
  highlightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 50,
    paddingTop: 30
  },
  flatList: {
    width: Dimensions.get("window").width
  },
  sorter: {
    flexDirection: "row"
  }
});

export default TripsPage;
