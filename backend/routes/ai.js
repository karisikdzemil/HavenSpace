const express = require("express");
// Uvoziš objekat koji je eksportovan iz gemini.js
const { ai } = require("../config/gemini.js"); 

const router = express.Router();

router.post('/test', async (req, res, next) => {
    try {
        const { message } = req.body;  

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message
        });

        res.json({
            reply: response.text
        });
    } catch (error) {
        next(error); // Dobro je imati error handler da ti ne puca server ako API baci grešku
    }
});

// Stari način eksportovanja:
module.exports = router;