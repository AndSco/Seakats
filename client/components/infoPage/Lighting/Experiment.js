import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Light from "./Light";
import useInterval from "./useInterval";

const Experiment = props => {
  const [period, setPeriod] = useState(props.period);
  const [isRunning, setIsRunning] = useState(true);

  const [blinkingTime, setBlinkingTime] = useState(props.blinkingInterval);
  const [isBlinking, setIsBlinking] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const deductTime = (timeStamp, msecsToDeduct) => {
    return timeStamp - msecsToDeduct;
  };

  const countDown = () => {
    setPeriod(deductTime(period, 1000));
  };

  const lightPhaseCountdown = () => {
    setBlinkingTime(deductTime(blinkingTime, 1000));
  };

  const blinkLight = () => {
    setIsVisible(!isVisible);
    // lightPhaseCountdown();
  };

  const startCountdowns = () => {
    useInterval(countDown, isRunning ? 1000 : null);
    useInterval(lightPhaseCountdown, isRunning ? 1000 : null);
  };

  const startBlinking = () => {
    useInterval(blinkLight, isBlinking ? props.blinkingFrequency : null);
  };

  const startNextCycle = () => {
    setIsRunning(true);
    setPeriod(props.period);

    setIsBlinking(true);
    setBlinkingTime(props.blinkingInterval);
  };

  useEffect(() => {
    if (period <= 0) {
      setIsRunning(false);
    }
  }, [period]);

  useEffect(() => {
    if (blinkingTime <= 0) {
      setIsBlinking(false);
    }
  }, [blinkingTime]);

  useEffect(() => {
    if (period === 0) {
      startNextCycle();
    }
  }, [period]);

  const start = () => {
    startCountdowns();
    startBlinking();
  };

  start();

  ///
  const flashLight = timeInterval => {
    useInterval(() => setIsBlinking(false), timeInterval);
  };

  useEffect(() => console.log("BlinkStop", isBlinking), [isBlinking]);

  // flashLight(1500)

  useEffect(() => console.log("countdown", period), [period]);
  useEffect(() => console.log("BlinkingTime", blinkingTime), [blinkingTime]);

  return (
    <View>
      <Light lightName="EXPERIMENT" condition={isVisible} color={props.color} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Experiment;
