import mongoose from "mongoose";

export const ANNOUNCEMENT_CONTENT_TYPES = [
  "blog",
  "project",
  "case-study",
  "certification",
  "experience",
] as const;

export type AnnouncementContentType =
  (typeof ANNOUNCEMENT_CONTENT_TYPES)[number];

const announcementSchema = new mongoose.Schema(
  {
    contentType: {
      type: String,
      required: true,
      enum: ANNOUNCEMENT_CONTENT_TYPES,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    recipientCount: {
      type: Number,
      required: true,
      default: 0,
    },
    sentAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { versionKey: false }
);

announcementSchema.index({ contentType: 1, slug: 1 }, { unique: true });

export type AnnouncementDoc = {
  _id: mongoose.Types.ObjectId;
  contentType: AnnouncementContentType;
  slug: string;
  title: string;
  url: string;
  recipientCount: number;
  sentAt: Date;
};

export const Announcement =
  (mongoose.models.Announcement as mongoose.Model<AnnouncementDoc>) ||
  mongoose.model<AnnouncementDoc>("Announcement", announcementSchema);
