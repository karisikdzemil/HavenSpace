import express from 'express';
import { ai } from '../config/gemini';

const router = express.Router();

router.post('/test', async (req, res, next) => {
    const { message } = req.body;  

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message
    })

    res.json({
        reply: response.text
    });
});

export default router;