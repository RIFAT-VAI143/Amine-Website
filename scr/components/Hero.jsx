// ================= FILE: src/components/Hero.jsx =================
export default function Hero({ anime, onWatch }) {
  if (!anime) {
    return (
      <div className="hero-section" style={{ background: '#101218', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', opacity: 0.6 }}>✨ Find your favorite anime ✨</div>
      </div>
    );
  }

  const posterUrl = anime.poster || anime.image || 'https://via.placeholder.com/800x400?text=Anime+X+Hub';
  const title = anime.title || 'Anime';
  const rating = anime.rating || 'N/A';
  const year = anime.releaseDate || '—';
  const synopsis = anime.synopsis || anime.description || 'No synopsis available.';

  return (
    <div className="hero-section">
      <div className="hero-bg" style={{ backgroundImage: `url(${posterUrl})` }}>
        <div className="hero-overlay">
          <h1 className="hero-title">{title}</h1>
          <div className="hero-info">
            <span className="hero-detail">⭐ {rating}</span>
            <span className="hero-detail">📅 {year}</span>
            <span className="hero-detail">🎬 HD</span>
          </div>
          <p className="hero-synopsis">{synopsis}</p>
          <button className="btn-watch" onClick={() => onWatch(anime)}>
            ▶ WATCH NOW
          </button>
        </div>
      </div>
    </div>
  );
}
