import React from "react";
import { Modal, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";

const CustomModal = props => {
  return (
    <Modal animationType="slide" transparent={false} visible={props.isVisible}>
      {props.isClosable && (
        <FontAwesome
          name="close"
          color={Colors.textLightestGrey} //"white"
          size={40}
          onPress={props.closeModalFuntion}
          style={styles.closeModalIcon}
        />
      )}
      {props.children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeModalIcon: {
    position: "absolute",
    top: 30,
    right: 25
  }
});

export default CustomModal;
