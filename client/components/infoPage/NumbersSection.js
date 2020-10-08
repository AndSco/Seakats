import React, { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import NumbersCard from "./NumbersCard";
import { vhfChannels, phoneNumbers } from "./numbers";
import WindDescriptionTable from "./WindDescriptionTable";
import BuoyageTable from "./BuoyageTable";
import useSelectionHook from "../../functions/selectionHook";

const NumbersSection = () => {
  const [whatIsSelected, setWhatIsSelected] = useSelectionHook();

  const setAsSelected = heading => {
    setWhatIsSelected(heading);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 30 }}>
      <NumbersCard
        heading="Phone Numbers"
        items={phoneNumbers}
        whatIsSelected={whatIsSelected}
        setAsSelected={setAsSelected}
      />

      <NumbersCard
        heading="VHF Channels"
        items={vhfChannels}
        whatIsSelected={whatIsSelected}
        setAsSelected={setAsSelected}
      />

      <NumbersCard
        heading=" Wind Effects Table"
        isConverter={true}
        whatIsSelected={whatIsSelected}
        setAsSelected={setAsSelected}
      >
        <WindDescriptionTable />
      </NumbersCard>

      <NumbersCard
        heading="Buoyage"
        isConverter={true}
        whatIsSelected={whatIsSelected}
        setAsSelected={setAsSelected}
      >
        <BuoyageTable />
      </NumbersCard>
    </ScrollView>
  );
};

NumbersSection.navigationOptions = navData => {
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

export default NumbersSection;
