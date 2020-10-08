import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";
import HighlightUnderline from "../wrapperComponents/HighlightUnderline";
import { FontAwesome } from "@expo/vector-icons";

const ToggleLine = props => {
  const { whatIsSelected } = props;
  const [isVisible, setIsVisible] = useState(whatIsSelected === props.heading);
  const nothingIsSelected = whatIsSelected === "";

  const handleSelection = () => {
    if (!isVisible) {
      setIsVisible(true);
      props.setAsSelected && props.setAsSelected(props.heading);
    } else if (isVisible) {
      setIsVisible(false);
      props.setAsSelected && props.setAsSelected("");
    }
  };

  useEffect(() => {
    if (whatIsSelected !== props.heading) {
      setIsVisible(false);
    }
  }, [whatIsSelected]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelection}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <HighlightUnderline
            style={{
              borderBottomColor: !isVisible
                ? Colors.lightAzure
                : props.underlineColor,
              width: Dimensions.get("window").width * 0.75
            }}
          >
            <Text
              style={{
                ...TextStyles.boldTitle,
                ...TextStyles.sectionHeader,
                color:
                  !isVisible && nothingIsSelected
                    ? Colors.textDarkGrey
                    : !isVisible
                    ? Colors.lightAzure
                    : props.underlineColor
              }}
            >
              {props.heading}
            </Text>
          </HighlightUnderline>
          <FontAwesome
            name={!isVisible ? "caret-down" : "close"}
            size={30}
            style={{ marginLeft: 15 }}
            color={!isVisible ? Colors.textLightGrey : Colors.warning}
          />
        </View>
      </TouchableOpacity>
      {isVisible && props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15
  },
  card: {
    width: "100%",
    marginTop: 15,
    alignSelf: "center"
  },
  numberItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  number: {
    fontSize: 18,
    backgroundColor: Colors.fourthiary,
    color: "white",
    padding: 5
  }
});

export default ToggleLine;
