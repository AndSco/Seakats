import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FlashLight from "./FlashLight";
import LightForm from "./LightForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LightDescription from "./LightDescription";
import Colors from "../../../constants/colors";
import CustomModal from "../../UIComponents/Modal";

const LightVisualiser = () => {
  const [lightCreated, setLightCreated] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onReceivingLight = light => {
    setIsModalOpen(true);
    setLightCreated(light);
  };

  const closeModalAndReset = () => {
    setIsModalOpen(false);
    setLightCreated("");
  };

  return (
    <View style={styles.screen}>
      <LightForm onLightSubmit={onReceivingLight} />

      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="lighthouse-on"
          size={120}
          color={Colors.lightAzure}
        />
      </View>

      {isModalOpen && (
        <CustomModal isClosable={true} closeModalFuntion={closeModalAndReset}>
          <View style={styles.lightContainer}>
            <FlashLight lightCreated={lightCreated} />
            <LightDescription lightObject={lightCreated} />
          </View>
        </CustomModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 30,
    flex: 1
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderColor: Colors.lightAzure,
    borderWidth: 12,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30
  },
  lightContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
    zIndex: -1
  }
});

export default LightVisualiser;
