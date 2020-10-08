const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  profilePic: {
    type: String
  },

  mobile: {
    type: String,
    required: true
  },

  nextOfKinName: {
    type: String,
    default: "NA"
  },

  nextOfKinNumber: {
    type: String,
    default: "NA"
  },

  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip"
    }
  ],

  subscription: {
    type: String,
    default: null
  }
});

// As per above, password would be saved as plain text => need to include a hook that
// immediately converts password to a hash, before it gets saved = HOOK
userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      //if password is not modified, go on and save it
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10); //10 is SALT FACTOR (additional encryption step)
    this.password = hashedPassword; //when encryption is finished (async), we save it as the pword
    return next();
  } catch (err) {
    return next(err); // goes to error handler
  }
});

// function that will be passed to ANY USER CREATED WITH THIS SCHEMA
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch; //returns true or false
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
