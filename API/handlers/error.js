function errorHandler(error, request, response, next) {
  console.log("ERROR HANDLER for error", error);
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Ooops, something went wrong!"
    }
  });
}

module.exports = errorHandler;
