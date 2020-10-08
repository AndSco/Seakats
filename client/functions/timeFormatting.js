import moment from "moment";

export const stringifyDate = timeStamp => {
  return moment(timeStamp).format("DD/MM, HH:mm");
};

export const timeFromNow = timeStamp => {
  return moment(timeStamp).fromNow();
};

export const millisecondsToHours = msecs => {
  const duration = moment.duration(msecs, "milliseconds");
  const hours = duration.asHours().toFixed(2);
  return hours;
};

export const createDateFromString = str => {
  const day = +str.slice(0, 2);
  const month = +str.slice(3, 5) - 1;
  const year = str.slice(6);
  return new Date(year, month, day);
};

export const makeShortDate = dateObject => {
  return moment(dateObject).format("DD/MM/YYYY");
};

export const makeShortDateWithTime = dateObject => {
  return moment(dateObject).format("DD/MM/YYYY, hh:mm");
};

export const extractTime = timeStamp => {
  return moment(timeStamp).format("hh:mm");
};

export const getHoursTimeStampBySubtractingBeginningOfDayTimeStamp = timeStamp => {
  return timeStamp - new Date().setHours(0, 0, 0, 0);
};

const takeMonthAndYearOutOfShortDate = shortDate => {
  return shortDate.slice(3);
};

export const groupTripsByDate = tripsArray => {
  const datesArray = [];
  tripsArray.map(async trip => {
    const monthYear = await takeMonthAndYearOutOfShortDate(
      makeShortDate(trip.date)
    );
    const isAlreadyInArray = datesArray.find(obj => obj.date === monthYear);
    if (isAlreadyInArray) {
      await isAlreadyInArray.trips.push(trip);
    } else {
      const newObj = {};
      newObj.date = monthYear;
      newObj.trips = [trip];
      datesArray.push(newObj);
    }
  });
  return datesArray;
};

export const getBeginningOfDay = date => {
  if (date) {
    return new Date(date).setHours(0, 0, 0, 0);
  } else {
    return new Date().setHours(0, 0, 0, 0);
  }
};

export const hoursToMilliseconds = hours => {
  return hours * 60 * 60 * 1000;
};

export const minutesToMilliseconds = minutes => {
  return minutes * 60 * 1000;
};

export const checkIfTooLate = timeStampToCheck => {
  if (timeStampToCheck < new Date().getTime()) {
    return true;
  }
  return false;
};
