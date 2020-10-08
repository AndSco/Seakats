import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import UserDetails from "../UIComponents/UserDetails";
import EntryDetails from "./EntryDetails";

const LogbookEntry = props => {
  const { entry } = props;

  return (
    <View style={{ paddingTop: 20 }}>
      <View style={!props.noBorder ? styles.container : styles.noBorder}>
        <UserDetails
          username={entry.userId.username}
          imageUrl={entry.userId.profilePic}
          imageStyles={{ width: 65, height: 65 }}
        />
        <EntryDetails entry={entry} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    paddingBottom: 25,
    borderBottomColor: Colors.textLightestGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20
  },
  noBorder: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    paddingBottom: 25,
    paddingHorizontal: 20
  },
  userDetails: {
    alignItems: "center"
  },
  profilePic: {
    width: 80,
    height: 80,
    marginBottom: 10
  },
  details: {
    width: "50%"
  },
  icon: {
    marginRight: 7
  }
});

export default LogbookEntry;
