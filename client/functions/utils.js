export const findMostRecurringItemInArray = array => {
  const counts = {};
  let compare = 0;
  let mostFrequent;

  array.map((item, index) => {
    if (!counts[item]) {
      counts[item] = 1;
    } else {
      counts[item] += 1;
    }

    if (counts[item] > compare) {
      compare = counts[item];
      mostFrequent = array[index];
    }
  });
  return mostFrequent;
};
