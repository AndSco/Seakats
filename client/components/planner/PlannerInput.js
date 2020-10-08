import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Platform,
  ImageBackground,
  Dimensions,
  Alert
} from "react-native";
import ScreenView from "../wrapperComponents/ScreenView";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";
import ButtonContainer from "../wrapperComponents/ButtonContainer";
import SubmitButton from "../wrapperComponents/SubmitButton";
import HighlightUnderline from "../wrapperComponents/HighlightUnderline";
import { openSession } from "../../store/actions/session";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../UIComponents/Modal";
import ModalInput from "../UIComponents/ModalInput";
import DatePickerIOS from "../UIComponents/DatePickerIOS";
import DatePickerAndroid from "../UIComponents/AndroidDateTimePicker";

const PlannerInput = props => {
  const currentUserId = useSelector(store => store.auth.userId);
  const [hasMobile, setHasMobile] = useState(props.hasMobile);
  const [hasVhf, setHasVhf] = useState(props.hasVhf);
  const [vhfChannel, setVhfChannel] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isValid, setIsValid] = useState(props.isValid);
  const dispatch = useDispatch();

  let inputType = (
    <TextInput
      {...props}
      style={{ ...TextStyles.loginFormInput, ...styles.input, marginTop: 30 }}
      value={props.value}
      onChangeText={text => {
        if (text.trim().length > 0) {
          setIsValid(true);
        }
        props.onChangeHandler(props.inputIdentifier, text.trim(), isValid);
      }}
      onFocus={() => {
        if (props.clubStart) {
          props.resetDeparture();
        }
        return;
      }}
    />
  );
  if (props.inputType === "date") {
    inputType = Platform.select({
      ios: (
        <DatePickerIOS
          date={props.dateValue}
          onChangeHandler={props.onChangeHandler}
          inputIdentifier={props.inputIdentifier}
        />
      ),
      android: (
        <DatePickerAndroid
          date={props.dateValue}
          onChangeHandler={props.onChangeHandler}
          inputIdentifier={props.inputIdentifier}
        />
      )
    });
  }

  if (props.inputType === "communication") {
    inputType = (
      <View>
        <CheckBox
          title="I'm bringing my mobile"
          checked={!!hasMobile}
          onIconPress={() => {
            setHasMobile(!hasMobile);
            props.onChangeHandler(props.inputIdentifier[0], !hasMobile);
          }}
          onPress={() => {
            setHasMobile(!hasMobile);
            props.onChangeHandler(props.inputIdentifier[0], !hasMobile);
          }}
        />

        <CheckBox
          title={
            hasVhf && vhfChannel
              ? `VHF on channel ${vhfChannel}`
              : "I'm bringing a VHF"
          }
          checked={!!hasVhf}
          onIconPress={() => {
            if (!hasVhf) {
              setVhfChannel(null);
            }
            setHasVhf(!hasVhf);
            setIsModalVisible(true);
          }}
          onPress={() => {
            if (!hasVhf) {
              setVhfChannel(null);
            }
            setHasVhf(!hasVhf);
            setIsModalVisible(true);
          }}
        />
        {hasVhf && (
          <CustomModal
            isVisible={isModalVisible}
            isClosable={true}
            closeModalFuntion={() => setIsModalVisible(false)}
          >
            <ModalInput
              title="What channel will you be on?"
              stateFunction={text => {
                props.onChangeHandler(props.inputIdentifier[1], text);
                setVhfChannel(text);
              }}
              buttonTitle="OK"
              placeholder="_"
              modalClosingFunction={() => setIsModalVisible(false)}
            />
          </CustomModal>
        )}
      </View>
    );
  }

  return (
    <ScreenView style={{ justifyContent: "flex-start" }}>
      <View style={styles.inputContainer}>
        <HighlightUnderline>
          <Text style={styles.title}>{props.title.toUpperCase()}</Text>
        </HighlightUnderline>
        {inputType}
        <ButtonContainer
          moveRight={props.firstEntry}
          moveLeft={props.lastEntry}
        >
          {!props.firstEntry && (
            <SubmitButton
              title="BACK"
              style={{ backgroundColor: Colors.textLightGrey }}
              function={() => {
                if (!isValid) {
                  Alert.alert("Fill in before continuing!");
                  return;
                }
                props.onManageProgress("backward");
              }}
            />
          )}
          {!props.lastEntry && (
            <SubmitButton
              title="NEXT"
              function={() => {
                if (!isValid) {
                  Alert.alert("Fill in before continuing!");
                  return;
                }
                props.onManageProgress("forward");
              }}
              style={{ backgroundColor: Colors.secondary }}
            />
          )}

          {props.lastEntry && (
            <SubmitButton
              title="GO!"
              style={{ backgroundColor: Colors.primary }}
              function={() => {
                if (!!props.sessionState.isFormValid) {
                  const { inputValues } = props.sessionState;
                  // add the userId to create the session on server
                  inputValues.userId = currentUserId;
                  dispatch(openSession(inputValues));
                  props.onManageProgress("forward");
                }
                return;
              }}
            />
          )}
        </ButtonContainer>
      </View>
      <ImageBackground
        source={
          props.imageNumber === 1
            ? require("../../assets/images/wave1.png")
            : props.imageNumber === 2
            ? require("../../assets/images/wave2.png")
            : props.imageNumber === 3
            ? require("../../assets/images/wave3.png")
            : require("../../assets/images/wave4.png")
        }
        style={styles.image}
        imageStyle={{ resizeMode: "cover", alignSelf: "flex-end" }}
      />
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  title: {
    ...TextStyles.bodyHeading
  },
  inputContainer: {
    height: "60%",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.8
  },
  input: {
    borderBottomWidth: 0.4,
    borderBottomColor: Colors.textLightGrey,
    marginBottom: 25,
    textAlign: "center",
    fontSize: 20,
    padding: 5,
    color: Colors.textDarkGrey
  },
  image: {
    width: Dimensions.get("window").width,
    height: 140,
    padding: 20,
    paddingVertical: 40,
    position: "absolute",
    bottom: -50,
    opacity: 0.6
  }
});

export default PlannerInput;
