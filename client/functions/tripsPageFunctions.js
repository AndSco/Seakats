const getHour = string => +string.slice(0, 2);

export const getAverageTimeOfDay = tripsArray => {
  const hoursArr = [];
  tripsArray.map(trip => {
    const averagePaddleHour =
      getHour(trip.arrivalTime) + getHour(trip.departureTime);
    hoursArr.push(averagePaddleHour / 2);
  });
  const hoursArrLength = hoursArr.length;
  const reducedArr = hoursArr.reduce((acc, curr) => acc + curr, 0);
  return reducedArr / hoursArrLength;
};

export const calculateWindAverage = tripsArray => {
  const averages = [];
  tripsArray.map(trip => {
    const extractedForces = trip.wind.match(/\d+/g);
    const arrLength = extractedForces.length;
    const windArr = extractedForces
      .map(num => +num)
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);
    averages.push(windArr / arrLength);
  });
  const totalSum = averages.reduce((acc, curr) => acc + curr, 0);
  const length = averages.length;
  return (totalSum / length).toFixed(2);
};

export const calculateAverageSeason = tripsArray => {
  const averages = [];
  tripsArray.map(trip => {
    const month = +trip.date.slice(5, 7);
    averages.push(calibrateSeasonOnMeasurer(month));
  });
  console.log("AVGES", averages);
  const length = averages.length;
  const totalSum = averages.reduce((acc, curr) => acc + curr, 0);
  const result = totalSum / length;
  return result;
};

export const calibrateSeasonOnMeasurer = month => {
  switch (month) {
    case 1:
      return 0;

    case 2:
      return 20;

    case 12:
      return 40;

    case 11:
      return 60;

    case 10:
      return 80;

    case 9:
      return 100;

    case 3:
      return 120;

    case 4:
      return 140;

    case 5:
      return 160;

    case 6:
      return 180;

    case 7:
      return 200;

    case 8:
      return 240;

    default:
      return;
  }
};
