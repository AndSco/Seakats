import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoundImage from "../UIComponents/RoundImage";
import Shadow from "../wrapperComponents/Shadow";
import TextStyles from "../../constants/textStyles";
import Colors from "../../constants/colors";

const UserDetails = props => {
  return (
    <View style={styles.userDetails}>
      <Shadow>
        <RoundImage
          source={
            props.imageUrl
              ? { uri: props.imageUrl }
              : require("../../assets/images/defaultUser.jpg")
          }
          style={{ ...styles.profilePic, ...props.imageStyles }}
        />
      </Shadow>
      <Text
        style={{
          ...TextStyles.boldTitle,
          fontSize: 16,
          color: Colors.fourthiary
        }}
      >
        {props.username}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userDetails: {
    alignItems: "center",
    marginRight: 20
  },
  profilePic: {
    width: 80,
    height: 80,
    marginBottom: 10
  }
});

export default UserDetails;
