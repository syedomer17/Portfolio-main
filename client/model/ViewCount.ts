import mongoose, { Schema, Document, Model } from "mongoose";

export interface IViewCount extends Document {
  key: string;
  count: number;
}

const ViewCountSchema = new Schema<IViewCount>(
  {
    key: { type: String, required: true, unique: true, trim: true },
    count: { type: Number, required: true },
  },
  { timestamps: true }
);

const ViewCount: Model<IViewCount> =
  mongoose.models.ViewCount || mongoose.model<IViewCount>("ViewCount", ViewCountSchema);

export default ViewCount;
