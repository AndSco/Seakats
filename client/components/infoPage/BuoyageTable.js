import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../../constants/colors";
import LineInList from "../UIComponents/LineInList";

const LabelAndText = props => {
  return (
    <View
      style={{
        marginVertical: 15,
        borderBottomColor: Colors.lightAzure,
        borderBottomWidth: !props.isLast ? 1 : 0,
        paddingBottom: !props.isLast ? 30 : 0
      }}
    >
      <View style={styles.top}>
        <Image source={props.imageUri} />
        <Text style={styles.title}>{props.buoyName}</Text>
      </View>
      <View style={{ marginTop: 15 }}>
        <LineInList label="Top Marks" value={props.topMarks} />
        <LineInList label="Colors" value={props.buoyColors} />
        <LineInList label="Lights" value={props.lights} />
        <LineInList label="Underwater danger" value={props.dangerPosition} />
      </View>
    </View>
  );
};

const BuoyageTable = props => {
  return (
    <View>
      <LabelAndText
        buoyName="North Cardinal Mark"
        imageUri={require("../../assets/images/north.png")}
        buoyColors="Black over yellow"
        lights="Q or VQ"
        topMarks="Two cones pointing up"
        dangerPosition="South of the marker"
      />
      <LabelAndText
        buoyName="East Cardinal Mark"
        imageUri={require("../../assets/images/east.png")}
        buoyColors="Black-Yellow-Black"
        lights="Q(3) 15s or VQ(3) 5s"
        topMarks="Two cones pointing away from each other"
        dangerPosition="West of the marker"
      />
      <LabelAndText
        buoyName="South Cardinal Mark"
        imageUri={require("../../assets/images/south.png")}
        buoyColors="Yellow over Black"
        lights="Q(6) + LFl 15s or VQ(6) + LFl 10s"
        topMarks="Two cones pointing down"
        dangerPosition="North of the marker"
      />
      <LabelAndText
        buoyName="West Cardinal Mark"
        imageUri={require("../../assets/images/west.png")}
        buoyColors="Yellow-Black-Yellow"
        lights="Q(9) 15s or VQ(9) 10s"
        topMarks="Two cones pointing towards each other"
        dangerPosition="East of the marker"
        isLast={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase"
  }
});

export default BuoyageTable;
