import { windConversionTable } from "../assets/windConversionTable";

// Valid for both distance and speed (knots)
export const convertDistance = (dist, originUnit) => {
  switch (originUnit) {
    case "nm":
      return dist * 1.852;

    case "km":
      return dist * 0.539957;

    default:
      return dist;
  }
};

const findRelavantEntryInTableFromBf = val => {
  return windConversionTable.find(entry => entry.bf === val);
};

const findRelevantConversionEntry = (originUnit, value) => {
  return windConversionTable.filter(entry => {
    const vals = entry[originUnit].split("-");
    const [min, max] = vals;
    return +value >= min && +value <= max;
  })[0];
};

export const windSpeedAllUnitConverter = (value, originUnit) => {
  const resultObject = {
    knots: "",
    beaufort: "",
    mSec: "",
    kmH: ""
  };

  if (originUnit === "knots") {
    resultObject.knots = value;
    resultObject.beaufort = Math.round((+value + 5) / 5).toString();
    resultObject.mSec = (+value * 0.514444).toFixed(2).toString();
    resultObject.kmH = (+value * 1.852).toFixed(2).toString();
  }

  if (originUnit === "Km/h") {
    const rightObjEntry = findRelevantConversionEntry("kmH", value);

    resultObject.knots = rightObjEntry.kn;
    resultObject.beaufort = rightObjEntry.bf;
    resultObject.mSec = rightObjEntry.mSec;
    resultObject.kmH = value;
  }

  if (originUnit === "m/s") {
    const rightObjEntry = findRelevantConversionEntry("mSec", value);
    resultObject.knots = rightObjEntry.kn;
    resultObject.beaufort = rightObjEntry.bf;
    resultObject.kmH = rightObjEntry.kmH;
    resultObject.mSec = value;
  }

  if (originUnit === "beaufort") {
    resultObject.knots = findRelavantEntryInTableFromBf(value).kn;
    resultObject.beaufort = value;
    resultObject.mSec = findRelavantEntryInTableFromBf(value).mSec;
    resultObject.kmH = findRelavantEntryInTableFromBf(value).kmH;
  }
  return resultObject;
};

// SCRAPING

// To extract table from https://www.windfinder.com/wind/windspeed.htm
const scrapeWindUnitTable = () => {
  const tableReal = document.querySelectorAll("tbody")[1];
  const rows = tableReal.querySelectorAll("tr");
  const dictionary = [];
  const references = ["bf", "kn", "mSec", "kmH", "mpH", "label"];
  rows.forEach(row => {
    const allCells = row.querySelectorAll("td");
    const obj = {};
    allCells.forEach((cell, index) => {
      const label = references[index];
      obj[label] = cell.innerText;
    });
    dictionary.push(obj);
  });
  return dictionary;
};

// Extract wind description table
const extractWindDescriptionTable = () => {
  const bfTable = document.querySelector(".windspeed-descriptions");
  const realTable = bfTable.querySelector("tbody");
  const rows = realTable.querySelectorAll("tr");
  const tableArray = [];

  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    // cells.forEach(cell => {
    const conditionObj = {};
    conditionObj.windSpeed = cells[0].innerText;
    conditionObj.label = cells[1].innerText;
    conditionObj.effectsSea = cells[2].innerText;
    conditionObj.effectLand = cells[3].innerText;
    tableArray.push(conditionObj);
    // })
  });
  return tableArray;
};
