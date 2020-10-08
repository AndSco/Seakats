export const OPEN_SESSION = "OPEN_SESSION";
export const UPDATE_SESSION = "UPDATE_SESSION";
export const CLOSE_SESSION = "CLOSE_SESSION";
import axios from "axios";
import apiURL from "../../assets/apiUrl";

export const openSession = session => {
  return async dispatch => {
    try {
      session.departureTimeStamp = new Date(
        session.departureTimeStamp
      ).getTime();
      session.arrivalTimeStamp = new Date(session.arrivalTimeStamp).getTime();
      const response = await axios.post(`${apiURL}/api/session/open`, session);
      const { _id } = response.data;
      session._id = _id;

      dispatch({
        type: OPEN_SESSION,
        sessionData: session
      });
    } catch (err) {
      throw err;
    }
  };
};

export const editSession = (sessionId, extraMins) => {
  return async dispatch => {
    console.log("EDIT SESSION");
    try {
      const response = await axios.patch(
        `${apiURL}/api/session/alerts/${sessionId}`,
        extraMins
      );
      const updatedSession = response.data;

      dispatch({
        type: UPDATE_SESSION,
        updatedSession
      });
    } catch (err) {
      throw err;
    }
  };
};

export const closeSession = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_SESSION
    });
  };
};

export const getNumberOfOpenSessions = async () => {
  try {
    const response = await axios.get(`${apiURL}/api/session/alerts`);
    const numberOfSessions = await response.data.length;
    console.log("OPEN SESSIONS", numberOfSessions);
    return numberOfSessions;
  } catch (err) {
    throw err;
  }
};

export const resumeSessionInClient = session => {
  return dispatch => {
    try {
      dispatch({
        type: OPEN_SESSION,
        sessionData: session
      });
    } catch (err) {
      throw err;
    }
  };
};
