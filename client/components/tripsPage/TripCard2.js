import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import CardContent from "../UIComponents/CardContent";
import Colors from "../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import TextStyles from "../../constants/textStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { makeShortDate } from "../../functions/timeFormatting";
import axios from "axios";
import { currentIP } from "../../assets/ipAdrresses";
import { useDispatch } from "react-redux";
import apiURL from "../../assets/apiUrl";

const TripCard2 = props => {
  const { trip } = props;
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(true);

  const ToggleIcon = props => {
    return (
      <TouchableOpacity
        style={{
          ...TextStyles.iconButton,
          backgroundColor: !isVisible ? Colors.lightAzure : Colors.fourthiary
        }}
        onPress={() => setIsVisible(!isVisible)}
      >
        <FontAwesome
          name={isVisible ? "minus" : "plus"}
          size={16}
          color={"white"}
        />
      </TouchableOpacity>
    );
  };

  const deleteTrip = async tripId => {
    try {
      const response = await axios.delete(`${apiURL}/api/trips/${tripId}`);
      console.log("TRIP DELETION", response.data);
      await props.refreshPage();
    } catch (err) {
      throw err;
    }
  };

  return (
    <View
      style={{
        ...styles.card,
        // backgroundColor: isVisible ? Colors.lightAzure : "white",
        borderBottomColor: !isVisible ? Colors.lightAzure : Colors.mediumAzure
      }}
    >
      <View style={styles.topPart}>
        <View style={styles.mainDetails}>
          <Text
            style={
              !isVisible
                ? { ...TextStyles.bodyHeading, ...styles.fromTo }
                : { ...TextStyles.boldTitle, ...styles.fromTo, fontSize: 18 }
            }
          >
            {trip.from} - {trip.to}
          </Text>
          <View style={styles.dateSection}>
            <FontAwesome
              name="calendar-o"
              size={16}
              color={isVisible ? Colors.fourthiary : Colors.lightAzure}
            />
            <Text
              style={{
                ...TextStyles.bodyText,
                color: Colors.secondary,
                marginLeft: 10,
                fontSize: 12
              }}
            >
              {makeShortDate(trip.date)}
            </Text>
          </View>
        </View>
        {!isVisible && <ToggleIcon />}
      </View>

      {isVisible && (
        <View style={styles.bottomPart}>
          <CardContent
            label="Distance"
            value={`${trip.distancePaddled}NM`}
            labelColor={Colors.fourthiary}
            valueColor={Colors.tertiary}
          />
          <CardContent
            label="Duration"
            value={`${trip.hoursPaddled}h`}
            labelColor={Colors.fourthiary}
            valueColor={Colors.tertiary}
          />
        </View>
      )}
      {isVisible && (
        <View>
          <CardContent
            label="Wind"
            value={trip.wind}
            labelColor={Colors.fourthiary}
            valueColor={Colors.tertiary}
          />
          <CardContent
            label="Sea conditions"
            value={trip.sea}
            labelColor={Colors.fourthiary}
            valueColor={Colors.tertiary}
            wide
          />
          <View style={styles.bottomIcons}>
            <TouchableOpacity
              style={{
                ...TextStyles.iconButton,
                backgroundColor: "white",
                borderColor: Colors.fourthiary,
                borderWidth: 1
              }}
              onPress={() => deleteTrip(trip._id)}
            >
              <FontAwesome
                name={"trash-o"}
                size={20}
                color={Colors.fourthiary}
              />
            </TouchableOpacity>
            <ToggleIcon />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6
  },
  topPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    flexDirection: "row"
  },
  bottomPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40
  },
  bottomIcons: {
    flexDirection: "row",
    marginVertical: 20,
    alignSelf: "flex-end",
    width: 80,
    justifyContent: "space-between"
  },
  fromTo: {
    fontSize: 16,
    textTransform: "uppercase",
    color: Colors.secondary
  },
  card: {
    width: Dimensions.get("window").width * 0.9,
    padding: 30,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignSelf: "center",
    borderBottomWidth: 1,
    marginVertical: 5
  }
});

export default TripCard2;
