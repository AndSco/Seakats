import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Alert,
  TouchableOpacity
} from "react-native";
import SubmitButton from "../wrapperComponents/SubmitButton";
import ScreenView from "../wrapperComponents/ScreenView";
import TextStyles from "../../constants/textStyles";
import Colors from "../../constants/colors";
import HighlightUnderline from "../wrapperComponents/HighlightUnderline";
import Input from "./Input";
import Spinner from "../UIComponents/Spinner";
import { login, signup } from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { FORM_UPDATE, formReducer } from "../../store/reducers/form";
import { Ionicons } from "@expo/vector-icons";

const AuthForm = props => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signUpPageShowing, setSignUpPageShowing] = useState(1);
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get("window").height;

  const initialState = {
    inputValues: {
      username: "",
      email: "",
      password: "",
      mobile: "",
      profilePic: "",
      nextOfKinName: "",
      nextOfKinNumber: ""
    },
    inputValidities: {
      username: false,
      email: !isSignUp,
      password: false,
      mobile: !isSignUp,
      profilePic: true,
      nextOfKinName: true,
      nextOfKinNumber: true
    },
    isFormValid: false
  };

  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  useEffect(() => console.log("formState", formState), [formState]);

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

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!isSignUp) {
      try {
        const { username, password } = formState.inputValues;
        await dispatch(login(username, password));
        props.navigation.navigate("Landing");
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    } else {
      try {
        await dispatch(signup(formState.inputValues));
        props.navigation.navigate("Landing");
      } catch (err) {
        setError(err.message);
        console.log(err.message);
        setIsLoading(false);
      }
    }
  };

  //ERROR alert
  useEffect(() => {
    if (error) {
      setIsLoading(false);
      Alert.alert("Something's wrong", error);
    }
  }, [error]);

  return (
    <ScreenView style={{ paddingBottom: !isSignUp ? 100 : 80 }}>
      <View style={styles.form}>
        <View style={styles.titleContainer}>
          <HighlightUnderline>
            <Text style={{ ...TextStyles.boldTitle, paddingLeft: 15 }}>
              {isSignUp ? "SIGN UP" : "LOG IN"}
            </Text>
          </HighlightUnderline>
        </View>
        <View
          style={{
            ...styles.formContainer,
            height:
              isSignUp && signUpPageShowing === 1
                ? windowHeight * 0.4
                : signUpPageShowing === 2
                ? windowHeight * 0.2
                : 100
          }}
        >
          {signUpPageShowing === 1 && (
            <Input
              id="username"
              label="Username"
              onInputChange={inputChangeHandler}
              errorText="Enter a valid username - at least 4 characters"
              required
              autoCapitalize="none"
              minLength={4}
              isThereError={error}
            />
          )}

          {signUpPageShowing === 1 && (
            <Input
              id="password"
              label="Password"
              onInputChange={inputChangeHandler}
              secureTextEntry={true}
              errorText="Enter a valid password - at least 4 characters"
              required
              autoCapitalize="none"
              minLength={4}
              isThereError={error}
            />
          )}

          {isSignUp && signUpPageShowing === 1 && (
            <Input
              id="email"
              label="Email address"
              onInputChange={inputChangeHandler}
              keyboardType="email-address"
              errorText="Enter a valid email address"
              required
              autoCapitalize="none"
              email
              isThereError={error}
            />
          )}

          {isSignUp && signUpPageShowing === 1 && (
            <Input
              id="mobile"
              label="Mobile number"
              onInputChange={inputChangeHandler}
              keyboardType="number-pad"
              errorText="Enter a valid number"
              required
              isThereError={error}
            />
          )}

          {isSignUp && signUpPageShowing === 2 && (
            <Input
              id="profilePic"
              label="Profile pic URL"
              onInputChange={inputChangeHandler}
              // errorText="Enter a valid image URL"
              autoCapitalize="none"
              isThereError={error}
            />
          )}

          {isSignUp && signUpPageShowing === 2 && (
            <Input
              id="nextOfKinName"
              label="Next of kin name"
              onInputChange={inputChangeHandler}
              autoCapitalize="none"
              isThereError={error}
            />
          )}

          {isSignUp && signUpPageShowing === 2 && (
            <Input
              id="nextOfKinNumber"
              label="Next of kin contact number"
              onInputChange={inputChangeHandler}
              keyboardType="number-pad"
              isThereError={error}
            />
          )}
        </View>

        {isLoading ? (
          <Spinner />
        ) : !isSignUp ? (
          <SubmitButton
            title={"ENTER"}
            function={() =>
              formState.isFormValid
                ? handleSubmit()
                : Alert.alert(
                    "Enter the right details!",
                    "Check the errors in the form"
                  )
            }
          />
        ) : isSignUp && signUpPageShowing === 1 ? (
          <SubmitButton
            title={"NEXT >"}
            function={() => setSignUpPageShowing(2)}
          />
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: 250
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => setSignUpPageShowing(1)}
            >
              <Ionicons
                name="ios-arrow-back"
                size={30}
                style={{ color: Colors.textLightestGrey, paddingRight: 10 }}
              />
              <Text style={{ color: Colors.textLightGrey }}>BACK</Text>
            </TouchableOpacity>
            <SubmitButton
              title={"JOIN"}
              function={() =>
                formState.isFormValid
                  ? handleSubmit()
                  : Alert.alert(
                      "Enter the right details!",
                      "Check the errors in the form"
                    )
              }
            />
          </View>
        )}
      </View>

      {isSignUp ? (
        <View style={styles.changeAuth}>
          <Text
            style={{
              ...TextStyles.secondaryDetails,
              color: Colors.textLightGrey
            }}
          >
            ALREADY REGISTERED?
          </Text>
          <Text
            style={{
              ...TextStyles.secondaryDetailsButton,
              color: Colors.textLightGrey
            }}
            onPress={() => {
              setSignUpPageShowing(1);
              setIsSignUp(false);
            }}
          >
            LOG IN!
          </Text>
        </View>
      ) : (
        <View style={styles.changeAuth}>
          <Text
            style={{
              ...TextStyles.secondaryDetails,
              color: Colors.textLightGrey
            }}
          >
            NOT A MEMBER YET?
          </Text>
          <Text
            style={{
              ...TextStyles.secondaryDetailsButton,
              color: Colors.textLightGrey
            }}
            onPress={() => setIsSignUp(true)}
          >
            SIGN UP!
          </Text>
        </View>
      )}
      <ImageBackground
        source={require("../../assets/images/wave2.png")}
        style={styles.image}
        imageStyle={{ resizeMode: "cover", alignSelf: "flex-end" }}
      />
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 30
  },
  form: {
    flex: 2,
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%"
  },
  titleContainer: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-start"
  },

  signupInputs: {
    width: "100%",
    alignItems: "center"
  },
  image: {
    width: Dimensions.get("window").width,
    height: 140,
    padding: 20,
    paddingVertical: 40,
    position: "absolute",
    bottom: -70,
    opacity: 0.6
  },
  changeAuth: {
    alignItems: "center",
    marginTop: 30
  },
  secondaryButton: {
    color: "#00b8ff",
    fontSize: 15
  }
});

export default AuthForm;
