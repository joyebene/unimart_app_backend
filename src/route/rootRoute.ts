import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import productRoutes from "./product";
import conversationRoutes from "./conversation";
import messageRoutes from "./message";
import wishlistRoutes from "./wishlist";
import notificationSettingRoutes from "./notification-setting";
import notificationRoutes from "./notification";
import feedbackRoutes from "./feedback";
import supportMessageRoutes from "./support-message";
import userSettingRoutes from "./user-setting";
import reportRoutes from "./report";
import deviceRoutes from "./device";;

const rootRoute = Router();

rootRoute.use("/auth", authRoutes);
rootRoute.use("/user", userRoutes);
rootRoute.use("/product", productRoutes);
rootRoute.use("/wishlist", wishlistRoutes);
rootRoute.use("/conversation", conversationRoutes);
rootRoute.use("/message", messageRoutes);
rootRoute.use("/notification-setting", notificationSettingRoutes);
rootRoute.use("/notification", notificationRoutes)
rootRoute.use("/feedback", feedbackRoutes);
rootRoute.use("/support-message", supportMessageRoutes);
rootRoute.use("/user-setting", userSettingRoutes);
rootRoute.use("/report", reportRoutes);
rootRoute.use("/device", deviceRoutes);


export default rootRoute;