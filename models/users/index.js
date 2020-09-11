"use strict";
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const User = new Schema(
    {
        firstName: { type: String, required: [true, "First Name is required"] },
        lastName: { type: String, required: [true, "Last Name is required"] },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true
        },
        password: { type: String, select: false },
        phoneNo: { type: String, },
    },
    { timestamps: true }
);

// Remove all those fields that should not publicly available
User.methods.getPublicProfile = function () {
    const user = this.toObject();

    delete user.password;
    delete user.isDeleted;

    return user;
};

User.plugin(uniqueValidator, { message: "{PATH} already exist." });

module.exports = mongoose.model("user", User);
