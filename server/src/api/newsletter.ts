import { Request, Response } from 'express';
import { Subscriber } from '../models/Subscriber.js';

export const subscribeHandler = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(201).json({ message: 'Successfully subscribed to newsletter!' });
    } catch (error: any) {
        console.error('Newsletter subscription error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
