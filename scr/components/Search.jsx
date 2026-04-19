// ================= FILE: src/components/Search.jsx =================
import { useState } from 'react';
import { searchAnime } from '../api';

export default function Search({ onSearchResults }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const val = e.target.value;
    setQuery(val);
    
    if (val.length < 2) {
      onSearchResults([], null);
      return;
    }

    setLoading(true);
    try {
      const res = await searchAnime(val);
      const results = res.results || [];
      onSearchResults(results, results[0] || null);
    } catch (err) {
      console.error(err);
      onSearchResults([], null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search anime... (Naruto, One Piece, Jujutsu Kaisen)"
        value={query}
        onChange={handleChange}
      />
      {loading && <div style={{ fontSize: '12px', marginTop: '6px', color: '#ff8a5c' }}>searching...</div>}
    </div>
  );
}
