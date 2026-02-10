
import mongoose, { Schema, Document } from 'mongoose';

export interface IIntroCall extends Document {
    name: string;
    email: string;
    location: 'Google Meet' | 'Phone';
    phone?: string;
    phoneCountryCode?: string;
    phoneNumber?: string;
    notes?: string;
    guests?: string[];
    date: Date;
    duration: number; // in minutes
}

const IntroCallSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: {
        type: String,
        enum: ['Google Meet', 'Phone'],
        required: true
    },
    phone: { type: String },
    phoneCountryCode: { type: String },
    phoneNumber: { type: String },
    notes: { type: String },
    guests: [{ type: String }],
    date: { type: Date, required: true },
    duration: { type: Number, default: 15 },
}, { timestamps: true });

export default mongoose.model<IIntroCall>('IntroCall', IntroCallSchema);
