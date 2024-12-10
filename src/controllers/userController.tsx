import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mailSender from "../utils/mailSender";

export const userSignup = async (req: Request, res: Response) => {
    try {
      const {
        email,
        password,
        confirmPassword,
      }: {
        email: string;
        password: string;
        confirmPassword: string;
      } = req.body;
  
      if (!email || !password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "please add all data",
        });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "password and confirm password are not match",
        });
      }
  
      const existingUser = await userModel.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
  
      let hashedPassword: string;
      try {
        hashedPassword = await bcrypt.hash(password, 12);
      } catch (error: any) {
        return res.status(500).json({
          success: false,
          message: "Error in hashing password",
        });
      }
  
      const user = await userModel.create({
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        profilePhoto: `https://api.dicebear.com/5.x/initials/svg?seed=${email}`,
      });
  
      try {
        await mailSender(
          email,
          "Welcome to CarCareMate",
          `Hi user,\n\nThank you for signing up for Data-analysis! We're excited to have you on board.\n\nBest regards,\nThe Data-anlysis Team`
        );
      } catch (error: any) {
        console.error("Error sending email:", error.message);
      }
  
      return res.status(200).json({
        success: true,
        message: "User created account successfully",
        user,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "User can not be registered, please try again",
      });
    }
  };
  
  export const userSignin = async (req: Request, res: Response) => {
    try {
      const {
        email,
        password,
      }: { email: string; password: string } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please fill all the details carefully",
        });
      }
  
      let user = await userModel.findOne({ email, isActive: true });
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User is not registered",
        });
      }
  
      const payload = {
        email: user.email,
        id: user._id,
      };
  
      const sss = "sunny";
      if (await bcrypt.compare(password, user.password)) {
        let token = jwt.sign(payload, sss, {
          expiresIn: "10h",
        });
  
        const { password: _, ...userWithoutPassword } = user;
  
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
  
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user: userWithoutPassword,
          message: "Login successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Password incorrect",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };