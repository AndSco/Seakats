import React from "react";
import { View, Image, StyleSheet } from "react-native";

const RoundImage = props => {
  return (
    <View style={{ ...styles.imageContainer, ...props.style }}>
      <Image
        style={{ ...styles.image, ...props.imageStyle }}
        resizeMode="cover"
        source={props.source}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default RoundImage;
