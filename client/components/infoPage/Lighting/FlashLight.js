import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Light from "./Light";
import { deductTime } from "./helperFunctions";
import useInterval from "./useInterval";
import useGroupFlashHook from "./useGroupFlashHook";
import useIntervalAndTimeout from "./useIntervalAndTimeout";

const FlashLight = props => {
  const { lightCreated } = props;
  const lightColor = lightCreated.getLightColor();
  const [period, setPeriod] = useState(lightCreated.period);
  const [isRunning, setIsRunning] = useState(true);

  const [isFlashing, setIsFlashing] = useState(false);
  const [isFlashStillRunning, setIsFlashStillRunning] = useState(true);

  const isGroupFlash = lightCreated.isItGrouped();
  const numberOfFlashGroups = lightCreated.getNumberOfFlashGroups();

  // Check if light is any of these "special" ones
  const isFlashingLight = lightCreated.isLightThisType("Flashing");
  const isFixedLight = lightCreated.isLightThisType("Fixed");
  const isOccultingLight = lightCreated.isLightThisType("Occulting");
  const isIsophaseLight = lightCreated.isLightThisType("Isophase");
  const isLongFlashLight = lightCreated.isLightThisType("Long Flash");
  const isAlternatingLight = lightCreated.isLightThisType("Alternating");

  const howManyFlashes = lightCreated.determineNumberOfFlashes();
  const [numberOfFlashes, setNumberOfFlashes] = useState(howManyFlashes);

  const [roundInFlashGroup, setRoundInFlashGroup] = useState(
    isGroupFlash ? 1 : null
  );

  const alternatingColors = lightCreated.getColorsForAlternatingLight();

  const intervalInFlashing = lightCreated.getIntervalInFlashing(
    lightCreated.type
  );
  const flashDuration = lightCreated.getFlashDuration(lightCreated.type);
  const waitBetweenGroupFlash = isGroupFlash
    ? lightCreated.getIntervalForGroupedLights()
    : intervalInFlashing + 300;

  // Time counter management
  const countDown = () => {
    setPeriod(deductTime(period, 1000));
  };

  const startCountdowns = () => {
    useInterval(countDown, isRunning ? 1000 : null);
  };

  const startNextCycle = () => {
    setIsRunning(true);
    setPeriod(lightCreated.period);

    setIsFlashStillRunning(true);
    setNumberOfFlashes(howManyFlashes);

    isGroupFlash && setRoundInFlashGroup(1);
  };

  useEffect(() => {
    if (period <= 0) {
      setIsRunning(false);
    }
  }, [period]);

  useEffect(() => {
    if (period === 0) {
      startNextCycle();
    }
  }, [period]);

  // Flash handling
  const stopFlash = () => {
    setIsFlashing(false);
    if (isFlashStillRunning && numberOfFlashes) {
      setNumberOfFlashes(numberOfFlashes - 1);
    }
  };

  const flash = flashDuration => {
    setIsFlashing(true);
    // console.log("flash")
  };

  const manageFlashing = () => {
    useIntervalAndTimeout(
      flash,
      stopFlash,
      flashDuration,
      isFlashStillRunning ? intervalInFlashing : null
    );
  };

  const manageGroupFlashes = () => {
    setIsFlashStillRunning(true);
    setRoundInFlashGroup(roundInFlashGroup + 1);
    setNumberOfFlashes(lightCreated.numberOfFlashes[roundInFlashGroup]);
  };

  const momentarilyStopFlashing = () => {
    setIsFlashStillRunning(false);
  };

  useEffect(() => {
    if (numberOfFlashes <= 0) {
      momentarilyStopFlashing();
    }
  }, [numberOfFlashes]);

  // special hook for group flashes
  useGroupFlashHook(
    [
      isGroupFlash,
      numberOfFlashes === 0,
      roundInFlashGroup < numberOfFlashGroups
    ],
    manageGroupFlashes,
    waitBetweenGroupFlash,
    [numberOfFlashes]
  );

  // Initialise
  const start = () => {
    startCountdowns();
    manageFlashing();
  };

  start();

  return (
    <View>
      {isFixedLight ? (
        <Light color={lightColor} fixed={true} />
      ) : isAlternatingLight ? (
        <Light
          alternating={isAlternatingLight}
          firstColor={alternatingColors.first}
          secondColor={alternatingColors.second}
          condition={isFlashing}
        />
      ) : (
        <Light
          condition={isFlashing}
          color={lightColor}
          occulting={isOccultingLight}
        />
      )}
    </View>
  );
};

export default FlashLight;
