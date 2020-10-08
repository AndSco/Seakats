import React from "react";
import { Platform, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import NumbersCard from "./NumbersCard";
import DistanceConverter from "./DistanceConverter";
import WindSpeedConverter from "./WindSpeedConverter";
import useSelectionHook from "../../functions/selectionHook";

const ConvertersSection = () => {
  const [whatIsSelected, setWhatIsSelected] = useSelectionHook();

  const setAsSelected = heading => {
    setWhatIsSelected(heading);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 30 }}>
      <NumbersCard
        heading=" Distance Converter"
        isConverter={true}
        whatIsSelected={whatIsSelected}
        setAsSelected={setAsSelected}
      >
        <DistanceConverter />
      </NumbersCard>

      <NumbersCard
        heading=" Wind Speed Converter"
        isConverter={true}
        whatIsSelected={whatIsSelected}
        setAsSelected={setAsSelected}
      >
        <WindSpeedConverter />
      </NumbersCard>
    </ScrollView>
  );
};

ConvertersSection.navigationOptions = navData => {
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

export default ConvertersSection;
