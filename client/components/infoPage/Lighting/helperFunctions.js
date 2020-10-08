export class LightInstance {
  constructor(
    type,
    color,
    period,
    numberOfFlashes,
    isGrouped,
    frequency,
    abbreviation,
    description,
    isAlternating,
    lightHeight,
    visibleFrom
  ) {
    this.type = type;
    this.color = color;
    this.period = period;
    this.numberOfFlashes = numberOfFlashes;
    this.isGrouped = isGrouped;
    this.frequency = frequency;
    this.abbreviation = abbreviation;
    this.description = description;
    this.isAlternating = isAlternating;
    this.lightHeight = lightHeight;
    this.visibleFrom = visibleFrom;
  }
  static lightColors = {
    w: {
      color: "white",
      hexCode: "#FFFFFF"
    },
    g: {
      color: "green",
      hexCode: "#58D68D"
    },
    r: {
      color: "red",
      hexCode: "#E74C3C"
    },
    y: {
      color: "yellow",
      hexCode: "#F4D03F"
    }
  };

  static lightCharacteristics = {
    f: {
      name: "Fixed",
      description:
        "Shines with an unblinking and steady intensity and is always on"
    },
    fl: {
      name: "Flashing",
      flashFrequency: 2200,
      //  duration: 1000,
      description:
        "The duration of the light is always less than the duration of the darkness. The frequency does not exceed 30 times per minute"
    },
    lfl: {
      name: "Long Flash",
      flashFrequency: 2200,
      //  duration: 2000,
      description:
        "This light has one long flash in a period. A long flash is at least 2 seconds long"
    },
    q: {
      name: "Quick Flash",
      flashFrequency: 1000,
      //  duration: 800,
      description: "Flashes at a higher frequency, at least 60 times per minute"
    },
    vq: {
      name: "Very Quick Flashing",
      flashFrequency: 500,
      //  duration: 600,
      description: "Flashing frequency of at least 100 times per minute"
    },
    iq: {
      name: "Interrupted Quick Flashing",
      flashFrequency: 1000,
      //  duration: 800,
      description:
        "Like Quick Flashing with one moment of darkness in one period"
    },
    uq: {
      name: "Ultra Quick Flashing",
      flashFrequency: 360,
      //  duration: 400,
      description:
        "The flashes are repeated at a frequency equal to or greater than 160 flashes per minute"
    },
    iso: {
      name: "Isophase",
      flashFrequency: 1000,
      //  duration: ,
      description:
        "This light has equal duration between light and darkness. A period consists of both a light and a dark interval"
    },
    occ: {
      name: "Occulting",
      flashFrequency: 2200,
      //  duration: 1000,
      description:
        "Occulting is the opposite of flashing, the light is more on than off"
    },
    al: {
      name: "Alternating",
      flashFrequency: 800,
      //  duration: ,
      description: "The light changes between different colours"
    }
  };

  isItGrouped() {
    return this.isGrouped;
  }

  isLightThisType(lightName) {
    return this.type === lightName;
  }

  determineNumberOfFlashes() {
    if (this.isItGrouped()) {
      return this.numberOfFlashes[0];
    } else if (this.isLightThisType("Long Flash")) {
      return 1;
    } else if (
      (!this.numberOfFlashes && this.isLightThisType("Flashing")) ||
      (!this.numberOfFlashes && this.isLightThisType("Occulting"))
    ) {
      return 1;
    } else if (!this.numberOfFlashes) {
      // manages constant flashing
      return undefined;
    }
    return this.numberOfFlashes;
  }

  getNumberOfFlashGroups() {
    if (this.isItGrouped()) {
      return this.numberOfFlashes.length;
    }
    return null;
  }

  getFlashDuration(lightType) {
    switch (lightType) {
      case "Isophase":
        return this.period / 2;

      case "Alternating":
        return this.period / 2;

      case "Long Flash":
        return 2000;

      case "Flashing":
        return 1000;

      default:
        return 200;
    }
  }

  getIntervalInFlashing(lightType) {
    switch (lightType) {
      case "Isophase":
        return this.period;

      case "Alternating":
        return this.period;

      default:
        return this.frequency;
    }
  }

  getLightColor() {
    if (this.isLightThisType("Alternating")) {
      return undefined;
    }
    return this.color.hexCode;
  }

  getColorsForAlternatingLight() {
    if (!this.isLightThisType("Alternating")) {
      return undefined;
    }
    return {
      first: this.color.firstColor.hexCode,
      second: this.color.secondColor.hexCode
    };
  }

  getIntervalForGroupedLights() {
    const totalPeriod = this.period;
    const numberOfFlashesInFirstRound = this.numberOfFlashes[0];
    const firstRoundFlashDuration =
      numberOfFlashesInFirstRound * this.getFlashDuration(this.type);
    const firstRoundIntervalDuration =
      (numberOfFlashesInFirstRound - 1) * this.getFlashDuration(this.type);
    const totalFirstDuration =
      firstRoundFlashDuration + firstRoundIntervalDuration;

    const numberOfFlashesInLastRound = this.numberOfFlashes[1];
    const lastRoundFlashDuration =
      numberOfFlashesInLastRound * this.getFlashDuration(this.type);
    const lastRoundIntervalDuration =
      (numberOfFlashesInLastRound - 1) * this.getIntervalInFlashing(this.type);
    const totalLastRoundDuration =
      lastRoundFlashDuration + lastRoundIntervalDuration;

    const totalDurations = totalFirstDuration + totalLastRoundDuration;
    const intervalToWaitToStartSecondRound =
      totalPeriod - (totalDurations + 2000);
    return intervalToWaitToStartSecondRound;
  }
}

export class LightInputProcessor {
  static isGrouped(string) {
    return string.match(/\bgp\b/gi) !== null;
  }

  static getName(string) {
    const splitArray = string.split(" ");
    if (this.isGrouped(string)) {
      return this.purifyName(splitArray[1]);
    }
    return this.purifyName(splitArray[0]);
  }

  static getMoreDetails(input, parameter) {
    return LightInstance.lightCharacteristics[
      this.getName(input).toLowerCase()
    ][parameter];
  }

  static isThisAGroupedFlash(entry) {
    if (typeof entry === "object" && entry !== null) {
      return true;
    }
    return false;
  }

  static isThisAnAlternatedLight(string) {
    if (string.match(/\bal\b/gi)) {
      return true;
    }
    return false;
  }

  static extractNumberOfFlashes(string) {
    const withBrackets = string.match(/\((.*?)\)/g);
    if (!withBrackets) {
      return null;
    }
    const withoutBrackets = withBrackets[0].replace(/[\(\)']+/g, "");
    const numberOfFlashes = withoutBrackets.split("+").map(num => +num);

    if (numberOfFlashes.length === 1) {
      return numberOfFlashes[0];
    } else {
      return numberOfFlashes;
    }
  }

  static purifyName(string) {
    return string.split("(")[0];
  }

  static getPeriod(string) {
    const thereIsAPeriod = string.match(/[0-9]s|[1-9][0-9]s/gi);
    if (!thereIsAPeriod) {
      return 10000;
    } else {
      return +thereIsAPeriod[0].replace(/[A-Z]/gi, "") * 1000;
    }
  }

  static getColorKey(string) {
    const match = string.match(/\b[w|y|g|r]\b/gi);
    return match ? match[0].toLowerCase() : "w";
  }

  static getColor(string) {
    // if it is alternated light, create primary and secondary colors, different way than other lights
    if (this.isThisAnAlternatedLight(string)) {
      const splitArray = string.split(" ");
      const colors = splitArray[1].split("").map(color => color.toLowerCase());
      return {
        firstColor: LightInstance.lightColors[colors[0]],
        secondColor: LightInstance.lightColors[colors[1]]
      };
    } else {
      const color = this.getColorKey(string); //string.match(/\b[w|y|g|r]\b/gi);
      return color
        ? LightInstance.lightColors[color[0].toLowerCase()]
        : LightInstance.lightColors.w;
    }
  }

  static getFrequency(string) {
    const lightShortName = this.getName(string).toLowerCase();
    const lightFrequency =
      LightInstance.lightCharacteristics[lightShortName].flashFrequency || null;
    return lightFrequency ? lightFrequency : 1000;
  }

  static getLightHeight(string) {
    const isThereHeight = string.match(
      /[1-9][1-9][0-9]m|[1-9][0-9]m|[0-9]m\b/g
    );
    if (isThereHeight) {
      const actualHeight = isThereHeight[0].split("m")[0];
      return actualHeight;
    }
    return undefined;
  }

  static lightVisibleFrom(string) {
    const isThereDistance = string.match(
      /[1-9][1-9][0-9]M|[1-9][0-9]M|[0-9]M\b/g
    );
    if (isThereDistance) {
      const actualDistance = isThereDistance[0].split("M")[0];
      return actualDistance;
    }
    return undefined;
  }

  static generateLight(input) {
    try {
      return new LightInstance(
        this.getMoreDetails(input, "name"),
        this.getColor(input),
        this.getPeriod(input),
        this.extractNumberOfFlashes(input),
        this.isGrouped(input),
        this.getFrequency(input),
        input,
        this.getMoreDetails(input, "description"),
        this.isThisAnAlternatedLight(input),
        this.getLightHeight(input),
        this.lightVisibleFrom(input)
      );
    } catch (err) {
      console.error("There was an error", err);
      // return null;
      throw err;
    }
  }

  static thereAreErrors(input) {
    const lightNamesArray = Object.keys(LightInstance.lightCharacteristics);
    const lightColorsArray = Object.keys(LightInstance.lightColors);
    console.log("color is", this.getColor(input));

    if (
      !lightNamesArray.some(
        entry => entry === this.getName(input).toLowerCase()
      ) ||
      // !lightColorsArray.some(entry => entry === this.getColorKey(input)) ||
      !input
    ) {
      return true;
    }
    return false;
  }
}

export const deductTime = (timeStamp, msecsToDeduct) => {
  return timeStamp - msecsToDeduct;
};
