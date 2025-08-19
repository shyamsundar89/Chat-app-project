import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function getDetails(token) {
  try {
    if (!token) {
      throw new Error("Access Denied! valid token not found");
    }

    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return reject(new Error("Invalid token"));
        resolve(payload);
      });
    });

    const user = await User.findById(decoded?.userId).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("getDetails error:", error.message);
    return null;
  }
}
