const mongoose = require('../connection')()

const schemaUser =  new mongoose.Schema(
{
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      password: {
        type: String,
        required: true,
      },
      // level: {
      //   type: Number,
      //   required: true,
      // },
      createdAt: {
        type: Date,
        default: Date.now()
      }
})

const UserModel =  mongoose.model("User", schemaUser, "User")

module.exports = UserModel