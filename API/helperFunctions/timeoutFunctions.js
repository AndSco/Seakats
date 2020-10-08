const getMinutesLeft = function(timeout) {
  console.log(
    Math.ceil((timeout._idleStart + timeout._idleTimeout - Date.now()) / 60000)
  );
};

module.exports = getMinutesLeft;
