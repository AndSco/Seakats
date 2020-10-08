import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/colors";
import TextStyles from "../constants/textStyles";
import { useSelector } from "react-redux";
import RoundImage from "../components/UIComponents/RoundImage";

const TopMenuDrawer = props => {
  const currentUser = useSelector(store => store.auth.currentUser);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation.navigate("Profile")}
    >
      <RoundImage
        source={
          currentUser.profilePic
            ? { uri: currentUser.profilePic }
            : require("../assets/images/defaultUser.jpg")
        }
        style={{
          width: 80,
          height: 80,
          marginRight: 30,
          borderColor: Colors.lightAzure,
          borderWidth: currentUser.profilePic ? 0 : 1
        }}
      />
      <View
        style={{
          borderRightColor: Colors.primary,
          borderRightWidth: 5,
          paddingRight: 10
        }}
      >
        <Text
          style={{
            ...TextStyles.boldTitle,
            fontSize: 22,
            color: Colors.fifthiary
          }}
        >
          {currentUser.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.textLightestGrey
  }
});

export default TopMenuDrawer;
