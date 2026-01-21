const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  },
  resume: {
  type: String,
  default: null
},


});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: function () {
        return this.provider === "local"; 
      }
    },

    provider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local"
    },

    providerId: {
      type: String
    },

    skills: {
      type: [String],
      default: []
    },

    resume: {
      type: String,
      default: null
    },
    resumePublicId: {
  type: String,
  default: null
},
    resumeOriginalName: {
      type: String,
      default: null
    },

    profileImage: {
      type: String
    },
    profileImagePublicId: {
  type: String,
  default: null
},
      role: {
    type: String,
    default: "user", 
  },
  bio: {
  type: String,
  default: ""
},

    verificationCode: {
      type: String
    },

    verificationExpires: {
      type: Date
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    notifications: [notificationSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
