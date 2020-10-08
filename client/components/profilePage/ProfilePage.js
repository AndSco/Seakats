import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Platform } from "react-native";
import ScreenView from "../wrapperComponents/ScreenView";
import TextStyles from "../../constants/textStyles";
import Colors from "../../constants/colors";
import UserDetails from "./UserDetails";
import HighlightUnderline from "../wrapperComponents/HighlightUnderline";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Shadow from "../wrapperComponents/Shadow";
import { useSelector } from "react-redux";
import RoundImage from "../UIComponents/RoundImage";

const ProfilePage = () => {
  const currentUser = useSelector(state => state.auth.currentUser);
  console.log("currentUser", currentUser);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(current => !current);
  };

  return (
    <ScreenView>
      {isEditing && (
        <HighlightUnderline>
          <Text style={{ ...TextStyles.bodyHeading }}>
            Edit your details & save
          </Text>
        </HighlightUnderline>
      )}
      {!isEditing && (
        <View style={styles.topPart}>
          <Shadow>
            <RoundImage
              source={
                currentUser.profilePic
                  ? { uri: currentUser.profilePic }
                  : require("../../assets/images/defaultUser.jpg")
              }
            />
          </Shadow>
          <HighlightUnderline>
            <Text style={{ ...TextStyles.boldTitle }}>
              {currentUser.username}
            </Text>
          </HighlightUnderline>
        </View>
      )}
      <UserDetails
        currentUser={currentUser}
        isEditing={isEditing}
        toggleEditing={toggleEditing}
      />
    </ScreenView>
  );
};

ProfilePage.navigationOptions = navData => {
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
  page: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    alignItems: "center"
  },
  topPart: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingVertical: 15
  }
});

export default ProfilePage;
