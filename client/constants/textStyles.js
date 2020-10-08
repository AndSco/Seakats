import Colors from "../constants/colors";

export default {
  bodyText: {
    fontFamily: "proxima-nova-regular",
    fontSize: 15
  },
  heading: {
    fontFamily: "roboto-bold",
    fontSize: 16
  },
  navigationHeader: {
    fontFamily: "proxima-nova-condensed-black"
    // fontSize: 28
  },
  boldTitle: {
    fontFamily: "proxima-nova-bold",
    fontSize: 25
  },
  secondaryDetails: {
    fontFamily: "proxima-nova-alt-extra-condensed-light",
    fontSize: 20
  },
  secondaryDetailsButton: {
    fontFamily: "proxima-nova-alt-extra-condensed-semibold",
    fontSize: 24
  },
  loginFormInput: {
    fontFamily: "proxima-nova-light",
    fontSize: 18
  },
  buttonText: {
    fontFamily: "proxima-nova-semibold",
    fontSize: 18
  },
  bodyHeading: {
    fontFamily: "proxima-nova-light",
    fontSize: 25,
    textAlign: "center"
  },
  noticeText: {
    fontFamily: "proxima-nova-semibold",
    fontSize: 22
  },
  outlinedButton: {
    width: 260,
    borderColor: Colors.greenTouch,
    borderWidth: 0.7,
    backgroundColor: "white"
  },
  outlinedButtonText: {
    color: Colors.greenTouch,
    fontSize: 15
  },
  iconButton: {
    backgroundColor: Colors.fourthiary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end"
  },
  sectionHeader: {
    textTransform: "uppercase",
    fontSize: 20,
    paddingLeft: 10
  },
  textInput: {
    width: 100,
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 20,
    borderColor: Colors.lightAzure,
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 5,
    marginBottom: 6
  },
  label: {
    color: Colors.textLightGrey,
    fontSize: 12,
    marginBottom: 4
  }
};
