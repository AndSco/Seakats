import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";
import Card from "../wrapperComponents/Card";
import ToggleLine from "../UIComponents/ToggleLine";

const NumberItem = props => {
  return (
    <View style={styles.numberItem}>
      <Text
        style={{ ...TextStyles.bodyText, color: Colors.darkest, fontSize: 16 }}
      >
        {props.label}:{" "}
      </Text>
      <Text style={{ ...TextStyles.boldTitle, ...styles.number }}>
        {props.value}
      </Text>
    </View>
  );
};

const NumbersCard = props => {
  return (
    <View style={styles.container}>
      <ToggleLine
        heading={props.heading}
        underlineColor={Colors.darkest}
        setAsSelected={props.setAsSelected}
        whatIsSelected={props.whatIsSelected}
      >
        <Card style={styles.card}>
          {!props.isConverter
            ? props.items.map((item, index) => (
                <NumberItem label={item.label} value={item.value} key={index} />
              ))
            : props.children}
        </Card>
      </ToggleLine>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15
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

export default NumbersCard;
