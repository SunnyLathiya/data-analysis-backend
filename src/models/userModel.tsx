import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePhoto: string;
  phoneNumber: string;
  country: string;
  isActive: boolean;
}

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 200,
  },
  confirmPassword: {
    type: String,
    minLength: 8,
    maxLength: 200,
  },
  phoneNumber: {
    type: String,
    trim: true,
    match: /^\d{10}$/,
  },
  status: {
    type: String,
    default: "AVAILABLE",
  },
  country: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 30,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model<User>("User", userSchema);
export { User };