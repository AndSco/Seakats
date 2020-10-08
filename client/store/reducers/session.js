import {
  OPEN_SESSION,
  UPDATE_SESSION,
  CLOSE_SESSION
} from "../actions/session";

const initialState = {
  _id: null,
  departurePoint: "",
  destination: "",
  departureTimeStamp: new Date(),
  arrivalTimeStamp: new Date(new Date().getTime() + 60000), // 1 mins from now
  mobile: false,
  vhf: false
};

const SessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SESSION:
      const newSession = action.sessionData;
      return newSession;

    case UPDATE_SESSION:
      const updatedSession = action.updatedSession;
      return updatedSession;

    case CLOSE_SESSION:
      return initialState;

    default:
      return state;
  }
};

export default SessionReducer;
