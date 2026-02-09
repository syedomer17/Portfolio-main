
import { Request, Response } from 'express';
import IntroCall from '../models/IntroCall.js';

export const createIntroCallHandler = async (req: Request, res: Response) => {
    try {
        const { name, email, location, phone, notes, guests, date, duration } = req.body;

        // Basic validation
        if (!name || !email || !location || !date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (location === 'Phone' && !phone) {
            return res.status(400).json({ message: 'Phone number is required when location is Phone' });
        }

        const newIntroCall = new IntroCall({
            name,
            email,
            location,
            phone,
            notes,
            guests,
            date: new Date(date),
            duration: duration || 15
        });

        const savedCall = await newIntroCall.save();

        res.status(201).json({
            message: 'Intro call scheduled successfully',
            data: savedCall
        });
    } catch (error) {
        console.error('Error creating intro call:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
