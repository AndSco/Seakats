import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Card from "../wrapperComponents/Card";
import CardContent from "../UIComponents/CardContent";
import Colors from "../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import TextStyles from "../../constants/textStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { makeShortDate } from "../../functions/timeFormatting";
import axios from "axios";
import { useDispatch } from "react-redux";
import apiURL from "../../assets/apiUrl";

const TripCard = props => {
  const { trip } = props;
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

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
    <Card style={styles.card}>
      <View style={styles.dateSection}>
        <FontAwesome name="calendar-o" size={16} color={Colors.tertiary} />
        <Text
          style={{
            ...TextStyles.bodyText,
            color: Colors.tertiary,
            marginLeft: 10,
            fontSize: 14
          }}
        >
          {makeShortDate(trip.date)}
        </Text>
      </View>
      <View style={styles.topPart}>
        <Text style={{ ...TextStyles.bodyHeading, ...styles.fromTo }}>
          {trip.from}
        </Text>
        <FontAwesome
          name="arrow-circle-down"
          size={30}
          color={Colors.lightAzure}
        />
        <Text style={{ ...TextStyles.bodyHeading, ...styles.fromTo }}>
          {trip.to}
        </Text>
      </View>

      {isVisible && (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
            wide
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
        </View>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={{
            ...TextStyles.iconButton,
            backgroundColor: "white",
            borderColor: Colors.lightAzure,
            borderWidth: 1
          }}
          onPress={() => deleteTrip(trip._id)}
        >
          <FontAwesome name={"trash-o"} size={20} color={Colors.lightAzure} />
        </TouchableOpacity>
        <TouchableOpacity
          style={TextStyles.iconButton}
          onPress={() => setIsVisible(!isVisible)}
        >
          <FontAwesome
            name={isVisible ? "minus" : "plus"}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  dateSection: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12
  },
  topPart: {
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
    marginTop: 30,
    height: 120
  },
  fromTo: {
    fontSize: 20,
    textTransform: "uppercase",
    color: Colors.secondary
  },
  card: {
    width: Dimensions.get("window").width * 0.9,
    paddingHorizontal: 30,
    backgroundColor: "white",
    paddingTop: 15,
    justifyContent: "space-between",
    alignSelf: "center"
  }
});

export default TripCard;
