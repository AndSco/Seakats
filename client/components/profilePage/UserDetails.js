import React, { useReducer, useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import CardContent from "../UIComponents/CardContent";
import EditableLine from "../UIComponents/EditableLine";
import {
  FORM_UPDATE,
  FORM_RESET,
  formReducer
} from "../../store/reducers/form";
import SubmitButton from "../wrapperComponents/SubmitButton";
import TextStyles from "../../constants/textStyles";
import Colors from "../../constants/colors";
import { updateUser } from "../../store/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../../store/actions/auth";
import apiURL from "../../assets/apiUrl";

const UserDetails = props => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);
  const { isEditing } = props;
  const [hasEdited, setHasEdited] = useState(false);
  const ElementToOutput = isEditing ? EditableLine : CardContent;

  const initialState = {
    inputValues: {
      username: props.currentUser.username,
      email: props.currentUser.email,
      mobile: props.currentUser.mobile,
      profilePic: props.currentUser.profilePic,
      nextOfKinName: props.currentUser.nextOfKinName,
      nextOfKinNumber: props.currentUser.nextOfKinNumber,
      trips: props.currentUser.trips
    },
    inputValidities: {
      username: true,
      email: true,
      mobile: true,
      profilePic: true,
      nextOfKinName: true,
      nextOfKinNumber: true,
      trips: true
    },
    isFormValid: true
  };

  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const {
    username,
    email,
    mobile,
    profilePic,
    nextOfKinName,
    nextOfKinNumber
  } = formState.inputValues;

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (formState !== initialState && !hasEdited) {
      setHasEdited(true);
    }
  }, [formState]);

  const deleteMyProfile = async userId => {
    try {
      const response = await axios.delete(`${apiURL}/api/user/${userId}`);
      const resData = response.data;
      console.log(resData);
    } catch (err) {
      throw err;
    }
  };

  return (
    <View style={styles.container} behavior="padding" enabled>
      <View style={styles.listContainer}>
        {isEditing && (
          <ElementToOutput
            label="Username"
            value={username}
            inputId="username"
            changeTextFunction={inputChangeHandler}
          />
        )}
        <ElementToOutput
          label="Email address"
          value={email}
          inputId="email"
          changeTextFunction={inputChangeHandler}
        />
        <ElementToOutput
          label="Mobile number"
          value={mobile}
          inputId="mobile"
          changeTextFunction={inputChangeHandler}
          numberPad
        />
        {isEditing && (
          <ElementToOutput
            label="Profile picture URL"
            value={profilePic}
            inputId="profilePic"
            changeTextFunction={inputChangeHandler}
            shorten={isEditing ? true : false}
          />
        )}
        <ElementToOutput
          label="Next of kin name"
          value={nextOfKinName}
          inputId="nextOfKinName"
          changeTextFunction={inputChangeHandler}
        />
        <ElementToOutput
          label="Next of kin mobile"
          value={nextOfKinNumber}
          inputId="nextOfKinNumber"
          changeTextFunction={inputChangeHandler}
          numberPad
        />

        <SubmitButton
          title={isEditing ? "Save changes" : "Edit details"}
          style={{
            ...TextStyles.outlinedButton,
            borderColor:
              isEditing && hasEdited
                ? Colors.greenTouch
                : isEditing
                ? Colors.textLightGrey
                : Colors.primary,
            alignSelf: "center"
          }}
          textStyle={{
            ...TextStyles.outlinedButtonText,
            color:
              isEditing && hasEdited
                ? Colors.greenTouch
                : isEditing
                ? Colors.textLightGrey
                : Colors.primary,
            fontSize: 16
          }}
          function={
            !isEditing
              ? props.toggleEditing
              : () => {
                  if (!hasEdited) {
                    Alert.alert(
                      "Edit a line by clicking on the pencil icon, then save!"
                    );
                    return;
                  }
                  dispatch(updateUser(userId, formState.inputValues));
                  props.toggleEditing();
                }
          }
        />
        {isEditing ? (
          <SubmitButton
            title="Cancel"
            style={{
              ...TextStyles.outlinedButton,
              borderColor: Colors.secondary,
              alignSelf: "center"
            }}
            textStyle={{
              ...TextStyles.outlinedButtonText,
              color: Colors.secondary
            }}
            function={() => {
              props.toggleEditing();
              dispatchFormState({
                type: FORM_RESET,
                initialState: initialState
              });
            }}
          />
        ) : (
          <SubmitButton
            title="Delete my profile"
            style={{
              ...TextStyles.outlinedButton,
              borderColor: Colors.warning,
              alignSelf: "center"
            }}
            textStyle={{
              ...TextStyles.outlinedButtonText,
              color: Colors.warning,
              fontSize: 16
            }}
            function={
              () =>
                Alert.alert(
                  "Are you sure?",
                  "This will delete your profile and all your data!",
                  [
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: async () => {
                        await deleteMyProfile(userId);
                        dispatch(logout());
                      }
                    },
                    {
                      text: "Cancel",
                      onPress: () => console.log("Not deleted!")
                    }
                  ]
                )
              //
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
    marginVertical: 20
  }
});

export default UserDetails;
