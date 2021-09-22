import mongoose from "mongoose";
import { roles } from "../utils/customeTypes";

export interface Iuser {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
  deposit: number;
  role: string;
}

export const userSchema = new mongoose.Schema<Iuser>({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  deposit: { type: Number, require: true },
  role: { type: String, enum: roles },
});

const User = mongoose.model<Iuser>("User", userSchema);
export default User;
