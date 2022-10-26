import mongoose from "mongoose";
import shortid from "shortid";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const User = new Schema(
    {
        id: {
            type: String,
            unique: true,
            default: shortid.generate,
        },
        user_name: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        full_name: {
            type: String,
            // required: true,
        },
        birthday: {
            type: Date,
            // required: true,
        },
        avatar: {
            type: String,
        },
        phone: {
            type: String,
            // required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
        },
        address: String,
        authFacebookID: {
            type: String,
            default: null,
        },
        authType: {
            type: String,
            enum: ["local", "google", "facebook"],
            default: "local",
        },
        userType: {
            type: String,
            enum: ["user", "admin", "moderator"],
            default: "user",
        },
        status: {
            type: Number,
            enum: [0, 1],
            default: 1,
        },
        role: {
            type: String,
            ref: "role",
        },
    },
    {
        timestamps: true,
    }
);

User.pre("save", async function (next) {
    try {
        if (this.authType !== "local") next();

        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a password hash (salt + hash)
        const passwordHashed = await bcrypt.hash(this.password, salt);
        // Re-assign password hashed
        this.password = passwordHashed;

        next();
    } catch (error) {
        next(error);
    }
});

User.methods.isValidPassword = async function (hashPassword) {
    try {
        return await bcrypt.compare(hashPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

export default mongoose.model("user", User);
