# AI Video Summarizer

A simple full-stack app that converts YouTube video transcripts into concise AI-generated summaries.

The frontend is built with React and Vite, and the backend uses Express with the Google Gemini AI SDK and a free YouTube transcript extractor.

<img width="1347" height="601" alt="Image" src="https://github.com/user-attachments/assets/f8e79e1f-c33c-4b10-bf11-1b2d9b84c6db" />

---

## Features

- Paste a YouTube video URL and get a summarized breakdown
- Uses `youtube-transcript` to fetch captions from YouTube
- Sends transcript content to Google Gemini 3.5 Flash for summarization
- Displays the result in Markdown format
- Local development setup with Vite proxying API requests to Express

## Project Structure

- `backend/` - Express API server
- `frontend/` - React + Vite UI
- `readme.md` - Project documentation

## Prerequisites

- Node.js 18+ installed
- A valid Google Gemini API key
- Internet access to fetch YouTube transcripts and call the Gemini API

## Environment

Create a `.env` file inside `backend/` with the following:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=5000
```

## Setup

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Running the App

1. Start the backend server:

```bash
cd backend
npm run backend
```

2. In a separate terminal, start the frontend app:

```bash
cd frontend
npm run dev
```

3. Open the local Vite URL shown in the terminal (usually `http://localhost:5173`).

## How It Works

- The frontend sends a POST request to `/api/summarize` with the YouTube video URL.
- The backend fetches the transcript text using `youtube-transcript`.
- The transcript is forwarded to Gemini 3.5 Flash for summarization.
- The server returns the generated Markdown summary to the UI.

## Notes

- The frontend is configured to proxy `/api` requests to `http://localhost:5000` via `frontend/vite.config.js`.
- Make sure the backend is running before submitting a video URL.
- If the YouTube transcript is unavailable, the request may fail.

## Scripts

### Backend

- `npm run backend` - starts the API server with `nodemon`

### Frontend

- `npm run dev` - starts the Vite development server
- `npm run build` - builds the production frontend bundle
- `npm run preview` - previews the built frontend
- `npm run lint` - runs ESLint on the frontend codebase

## License

This project is provided as-is.
