import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { callNumber } from "../../functions/makeCall";
import Card from "../wrapperComponents/Card";
import TextStyles from "../../constants/textStyles";
import Colors from "../../constants/colors";
import SubmitButton from "../wrapperComponents/SubmitButton";
import CardContent from "../UIComponents/CardContent";
import { stringifyDate, timeFromNow } from "../../functions/timeFormatting";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { PositiveIcon, NegativeIcon } from "../UIComponents/CheckIcons";
import UserDetails from "../UIComponents/UserDetails";
import { useSelector } from "react-redux";

const SessionCard = props => {
  const { session, isAlert } = props;
  const [isSelected, setIsSelected] = useState(false);

  const currentUserId = useSelector(store => store.auth.userId);
  const isTheSameUser = session.userId._id === currentUserId;

  return (
    <Card style={{ width: "85%", alignSelf: "center", ...props.cardStyle }}>
      <View style={styles.topPart}>
        <UserDetails
          username={session.userId.username.toUpperCase()}
          imageUrl={session.userId.profilePic}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...styles.timeCountText }}>
            {timeFromNow(session.arrivalTimeStamp)}
          </Text>
          <MaterialCommunityIcons
            name="clock-alert-outline"
            size={20}
            color={Colors.lightAzure}
          />
        </View>
      </View>

      {isSelected && (
        <View style={styles.flexContainer}>
          <CardContent
            label="Departure point"
            value={session.departurePoint}
            centered
          />
          <CardContent
            label="Destination"
            value={session.destination}
            centered
          />
          <CardContent
            label="Departure time"
            value={stringifyDate(session.departureTimeStamp)}
            centered
          />
          <CardContent
            label="E.T.A."
            value={stringifyDate(session.arrivalTimeStamp)}
            centered
          />
          <CardContent
            label="Took mobile"
            value={session.mobile ? PositiveIcon : NegativeIcon}
            centered
            taller
          />
          <CardContent
            label="Took VHF"
            value={session.vhf ? `Channel ${session.vhf}` : NegativeIcon}
            centered
            taller
          />
        </View>
      )}
      {isSelected && isAlert && (
        <View style={styles.actionButtons}>
          {!isTheSameUser && (
            <SubmitButton
              title={`Call ${session.userId.username}`}
              style={{
                ...TextStyles.outlinedButton,
                borderColor: Colors.primary
              }}
              textStyle={{
                ...TextStyles.outlinedButtonText,
                color: Colors.primary
              }}
              function={() => callNumber(session.userId.mobile)}
            />
          )}
          {session.userId.nextOfKinNumber && !isTheSameUser && (
            <SubmitButton
              title={`Call next of kin (${session.userId.nextOfKinName})`}
              style={{
                ...TextStyles.outlinedButton,
                borderColor: Colors.secondary
              }}
              textStyle={{
                ...TextStyles.outlinedButtonText,
                color: Colors.secondary
              }}
              function={() => callNumber(session.userId.nextOfKinNumber)}
            />
          )}
          <SubmitButton
            title={`Solved - ${
              !isTheSameUser ? session.userId.username + " is" : "I am"
            } fine`}
            style={TextStyles.outlinedButton}
            textStyle={TextStyles.outlinedButtonText}
            function={() => {
              props.solveSession(session._id);
              props.closeMyAlertsModal && props.closeMyAlertsModal();
            }}
          />
        </View>
      )}

      <TouchableOpacity
        onPress={() => setIsSelected(!isSelected)}
        style={{
          ...TextStyles.iconButton,
          backgroundColor: isSelected ? Colors.fourthiary : Colors.lightAzure,
          marginTop: isSelected ? 30 : 0
        }}
      >
        <FontAwesome
          name={isSelected ? "minus" : "plus"}
          size={20}
          color="white"
        />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  topPart: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  timeCountText: {
    marginRight: 6,
    fontSize: 14,
    color: Colors.secondary,
    textTransform: "uppercase"
  },
  flexContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "space-around"
  },
  actionButtons: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    // marginTop: 30,
    alignSelf: "center"
  }
});

export default SessionCard;
