import axios from 'axios';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

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
      const response = await axios.post('/api/summarize', {
        videoUrl: videoUrl
      });

      setSummary(response.data.summary)
    } catch (err) {
      setError('Could not connect to the backend server.', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a73e8' }}>✨ Gemini Video Summarizer</h1>
        <p style={{ color: '#5f6368' }}>Get an instant Markdown text summary of any YouTube video for free.</p>
      </header>

      <form onSubmit={triggerSummarization} style={{ display: 'flex', gap: '12px', marginBottom: '30px' }}>
        <input
          type="url"
          placeholder="Paste YouTube Link (e.g., https://www.youtube.com/watch?v=...)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          style={{ flex: 1, padding: '14px', borderRadius: '8px', border: '1px solid #dadce0', fontSize: '1rem' }}
          required
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '14px 28px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {loading ? 'Processing...' : 'Summarize'}
        </button>
      </form>

      {error && <div style={{ color: '#d93025', padding: '12px', background: '#fce8e6', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

      {loading && (
        <div style={{ textAlign: 'center', color: '#5f6368', padding: '40px' }}>
          <p>Extracting audio timeline data and streaming via Gemini 3.5 Flash...</p>
        </div>
      )}

      {summary && (
        <div style={{ background: '#f8f9fa', border: '1px solid #6e6e6e', padding: '30px', borderRadius: '12px', lineHeight: '1.6' }}>
          <h2 style={{ marginTop: 0, borderBottom: '1px solid #949697', paddingBottom: '10px', color: "#000" }}>📝 Video Breakdown</h2>
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;