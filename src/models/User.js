import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        email: {
            type: String,
            require: true,
            min: 3,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            require: true,
            min: 6,
            max: 50,
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: []
        },
        location: String,
        occupation: String,
        viewdProfile: Number,
        impressions: Number
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema)
export default User;