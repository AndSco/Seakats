const User = require("../models/user");

exports.editUser = async (req, res, next) => {
  try {
    const query = { _id: req.params.userId };
    console.log("req.body", req.body);
    const editedUser = await User.findOneAndUpdate(query, req.body);
    return res.status(200).json(editedUser);
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userToReturn = await User.findById(req.params.userId)
      .populate("trips")
      .exec();
    res.status(200).json(userToReturn);
  } catch (err) {
    return next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const IdUserToDelete = req.params.userId;
    await User.deleteOne({ _id: IdUserToDelete });
    res.status(200).json(`Deleted user ${IdUserToDelete}`);
  } catch (err) {
    return next(err);
  }
};
