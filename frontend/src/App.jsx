import axios from 'axios';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const triggerSummarization = async (e) => {
    e.preventDefault();
    if (!videoUrl) return;

    setLoading(true);
    setError('');
    setSummary('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api/summarize';
      const response = await axios.post(apiUrl, {
        videoUrl: videoUrl
      });

      setSummary(response.data.summary);
    } catch (err) {
      setError('Could not connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <header className="hero-header">
        <h1 className="app-title">✨ Gemini Video Summarizer</h1>
        <p className="subtitle">Get an instant Markdown text summary of any YouTube video for free.</p>
      </header>

      <form className="summarize-form" onSubmit={triggerSummarization}>
        <input
          className="video-input"
          type="url"
          placeholder="Paste YouTube Link (e.g., https://www.youtube.com/watch?v=...)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
        <button className="summarize-button" type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Summarize'}
        </button>
      </form>

      {error && <div className="status-card status-error">{error}</div>}

      {loading && (
        <div className="status-card status-loading">
          <p>Extracting audio timeline data and streaming via Gemini 3.5 Flash...</p>
        </div>
      )}

      {summary && (
        <article className="summary-card">
          <h2 className="summary-title">📝 Video Breakdown</h2>
          <ReactMarkdown>{summary}</ReactMarkdown>
        </article>
      )}
    </main>
  );
}

export default App;