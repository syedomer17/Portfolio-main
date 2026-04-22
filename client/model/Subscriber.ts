import mongoose from "mongoose";
import crypto from "crypto";

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    unsubscribeToken: {
      type: String,
      required: true,
      unique: true,
      default: () => crypto.randomBytes(24).toString("hex"),
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false }
);

export type SubscriberDoc = {
  _id: mongoose.Types.ObjectId;
  email: string;
  unsubscribeToken: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt: Date | null;
};

export const Subscriber =
  (mongoose.models.Subscriber as mongoose.Model<SubscriberDoc>) ||
  mongoose.model<SubscriberDoc>("Subscriber", subscriberSchema);
