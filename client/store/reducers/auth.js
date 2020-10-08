import { AUTHENTICATE, LOGOUT, UPDATE_USER } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  currentUser: {
    username: "",
    email: "",
    mobile: "",
    profilePic: "",
    nextOfKinName: "",
    nextOfKinNumber: "",
    trips: []
  }
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        currentUser: {
          username: action.username,
          email: action.email,
          mobile: action.mobile,
          profilePic: action.profilePic,
          nextOfKinName: action.nextOfKinName,
          nextOfKinNumber: action.nextOfKinNumber,
          trips: action.trips
        }
      };

    case UPDATE_USER:
      console.log("UPDATING USER!!");
      return {
        ...state,
        currentUser: { ...action.updatedUser }
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default AuthReducer;
