import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(
    cors()
);
app.use(express.json());

// Initialize the official Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/summarize', async (req, res) => {
    const { videoUrl } = req.body;

    if (!videoUrl) {
        return res.status(400).json({ error: 'Please provide a valid YouTube URL.' });
    }

    try {
        // 1. Fetch text captions from YouTube completely free
        const transcriptChunks = await YoutubeTranscript.fetchTranscript(videoUrl);
        const fullTranscript = transcriptChunks.map(chunk => chunk.text).join(' ');

        // 2. Direct Gemini 3.5 Flash to summarize the content
        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: `You are an advanced video analyzer. Please summarize the following video transcript. 
      Provide a concise 3-sentence summary introduction, followed by a bulleted list of core takeaways. 
      Use Markdown formatting. Here is the text: ${fullTranscript}`,
        });

        res.json({ summary: response.text });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Failed to extract video transcript or generate AI summary.' });
    }
});

app.get("/", (req, res) => {
    res.send("API Running")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend is running on port ${PORT}`));