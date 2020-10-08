import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";
import HighlightUnderline from "../wrapperComponents/HighlightUnderline";
import textStyles from "../../constants/textStyles";
import Shadow from "../wrapperComponents/Shadow";
import ButtonContainer from "../wrapperComponents/ButtonContainer";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const ListItem = props => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={{ ...TextStyles.boldTitle, fontSize: 15 }}>
          {props.label.toUpperCase()}:
        </Text>
        <Text style={styles.text}>{props.content}</Text>
      </View>
    </View>
  );
};

const WeatherBox = props => {
  const { dayNumber, dataObject } = props;
  const dayTitle =
    dayNumber === "one"
      ? "Today"
      : dayNumber === "two"
      ? "Tomorrow"
      : dayNumber === "three"
      ? "After-tomorrow"
      : "Error";

  const listContent = (
    <View style={styles.details}>
      <ListItem label="weather" content={dataObject.weather} />
      <ListItem label="wind" content={dataObject.wind} />
      <ListItem label="sea" content={dataObject.sea} />
      <ListItem label="swell" content={dataObject.swell} />
    </View>
  );

  return (
    <ScrollView style={{ flexGrow: 1, marginVertical: 30 }}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <HighlightUnderline>
            <Text style={textStyles.bodyHeading}>{dayTitle}</Text>
          </HighlightUnderline>
          <Shadow>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: dataObject.weatherIconUrl }}
                style={styles.image}
              />
            </View>
          </Shadow>
        </View>

        {listContent}
        <ButtonContainer
          style={styles.buttonContainer}
          moveRight={dayNumber === "one" || dayNumber === "three"}
        >
          {dayNumber !== "one" && (
            <TouchableOpacity>
              <View style={styles.opacity}>
                <Ionicons
                  name="ios-arrow-dropleft"
                  size={70}
                  color={Colors.primary}
                  onPress={props.getPreviousDayForecast}
                />
              </View>
            </TouchableOpacity>
          )}
          {dayNumber !== "three" && (
            <TouchableOpacity style={styles.opacity}>
              <Ionicons
                name="ios-arrow-dropright"
                size={70}
                color={Colors.primary}
                onPress={props.getNextDayForecast}
              />
            </TouchableOpacity>
          )}
        </ButtonContainer>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    marginBottom: 40
  },
  imageContainer: {
    padding: 20,
    backgroundColor: Colors.fourthiary,
    borderRadius: 100
  },
  image: {
    width: 60,
    height: 60
  },
  itemContainer: {
    padding: 20,
    width: Dimensions.get("window").width * 0.8,
    // backgroundColor: "#F8F9F9",
    backgroundColor: Colors.textLightestGrey,
    marginBottom: 2.5
  },
  text: {
    fontFamily: "proxima-nova-regular",
    color: "black",
    fontSize: 15
  },
  opacity: {
    width: 65,
    height: 65,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  buttonContainer: {
    justifyContent: "center",
    marginVertical: 30
  }
});

export default WeatherBox;
