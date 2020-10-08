import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import apiURL from "../assets/apiUrl";

export const UseGetMyAlerts = userId => {
  const [myAlerts, setMyAlerts] = useState(null);

  const getAlerts = useCallback(async () => {
    try {
      const response = await axios.get(`${apiURL}/api/session/alerts`);
      const allAlerts = response.data;
      const userAlerts = allAlerts.filter(alert => alert.userId._id === userId);
      setMyAlerts(userAlerts);
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    getAlerts();
  }, [getAlerts]);

  return myAlerts;
};
